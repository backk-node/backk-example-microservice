import {
  AllowForEveryUserForOwnResources,
  AllowForTests,
  AllowForUserRoles,
  AllowServiceForUserRoles,
  Create,
  CrudEntityService,
  DataStore,
  DefaultPostQueryOperationsImpl,
  Delete,
  EntityPreHook,
  getMicroserviceName,
  HttpStatusCodes,
  NoCaptcha,
  One,
  PromiseErrorOr,
  ResponseHeaders,
  ResponseStatusCode,
  sendToRemoteService,
  SqlEqFilter,
  SqlFilter,
  SqlInFilter,
  Update,
  _Id,
} from 'backk';
import CronJob from 'backk/lib/decorators/service/function/CronJob';
import dayjs from 'dayjs';
import { JSONPath } from 'jsonpath-plus';
import { SalesItemService } from '../salesitem/SalesItemService';
import SalesItem from '../salesitem/types/entities/SalesItem';
import { ShoppingCartService } from '../shoppingcart/ShoppingCartService';
import { orderServiceErrors } from './errors/orderServiceErrors';
import { OrderService } from './OrderService';
import DeleteUnpaidOrdersArg from './types/args/DeleteUnpaidOrdersArg';
import DeliverOrderItemArg from './types/args/DeliverOrderItemArg';
import PayOrderArg from './types/args/PayOrderArg';
import PlaceOrderArg from './types/args/PlaceOrderArg';
import RemoveOrderItemArg from './types/args/RemoveOrderItemArg';
import _IdAndOrderItemId from './types/args/_IdAndOrderItemId';
import Order from './types/entities/Order';
import { OrderItemState } from './types/enum/OrderItemState';
import { PaymentGateway } from './types/enum/PaymentGateway';

@AllowServiceForUserRoles(['vitjaAdmin'])
export default class OrderServiceImpl extends CrudEntityService implements OrderService {
  private readonly isPaidOrderPreHook: EntityPreHook<Order> = {
    shouldSucceedOrBeTrue: ({ transactionId }) => transactionId !== null,
    error: orderServiceErrors.cannotUpdateOrderWhichIsNotPaid,
  };

  constructor(
    dataStore: DataStore,
    private readonly salesItemService: SalesItemService,
    private readonly shoppingCartService: ShoppingCartService
  ) {
    super(orderServiceErrors, dataStore);
  }

  @AllowForTests()
  deleteAllOrders(): PromiseErrorOr<null> {
    return this.dataStore.deleteAllEntities(Order);
  }

  @AllowForEveryUserForOwnResources('userAccountId')
  @NoCaptcha('')
  @Create()
  @ResponseStatusCode(HttpStatusCodes.MOVED_PERMANENTLY)
  @ResponseHeaders<PlaceOrderArg, Order>({
    Location: ({ paymentGateway, uiRedirectUrl }, { _id }) =>
      OrderServiceImpl.getLocationHeaderUrl(paymentGateway, _id, uiRedirectUrl),
  })
  placeOrder({
    userAccountId,
    iAgreeWithTermsAndConditions,
    paymentGateway,
  }: PlaceOrderArg): PromiseErrorOr<One<Order>> {
    return this.dataStore.executeInsideTransaction(async () => {
      const [shoppingCart, error] = await this.shoppingCartService.getShoppingCartOrErrorIfEmpty(
        userAccountId,
        orderServiceErrors.shoppingCartIsEmpty
      );

      return shoppingCart
        ? this.dataStore.createEntity(
            Order,
            {
              userAccountId,
              orderItems: shoppingCart.data.salesItems.map((salesItem, index) => ({
                id: index.toString(),
                state: 'toBeDelivered',
                trackingUrl: null,
                deliveryTimestamp: null,
                salesItems: [salesItem],
              })),
              paymentGateway,
              transactionId: null,
              transactionTimestamp: null,
              paymentAmount: null,
            },
            {
              preHooks: [
                {
                  shouldSucceedOrBeTrue: () => iAgreeWithTermsAndConditions,
                  error: orderServiceErrors.notAgreedWithTermsAndConditions,
                },
                () =>
                  this.salesItemService.updateSalesItemStates(
                    shoppingCart.data.salesItems,
                    'sold',
                    'reserved',
                    userAccountId
                  ),
              ],
            }
          )
        : [null, error];
    });
  }

  @AllowForEveryUserForOwnResources('userAccountId')
  getOrder({ _id }: _Id): PromiseErrorOr<One<Order>> {
    return this.dataStore.getEntityById(Order, _id, new DefaultPostQueryOperationsImpl(), false);
  }

  @AllowForUserRoles(['vitjaPaymentGateway'])
  @Delete()
  discardUnpaidOrder({ _id }: _Id): PromiseErrorOr<null> {
    return this.dataStore.deleteEntityById(Order, _id, {
      entityPreHooks: (order) =>
        this.salesItemService.updateSalesItemStates(
          JSONPath({ json: order, path: 'orderItems[*].salesItems[*]' }),
          'reserved',
          'sold',
          order.userAccountId
        ),
    });
  }

  @AllowForUserRoles(['vitjaPaymentGateway'])
  @Update('update')
  payOrder({ _id, ...restOfEntity }: PayOrderArg): PromiseErrorOr<null> {
    return this.dataStore.updateEntity(
      Order,
      { _id, ...restOfEntity },
      {
        entityPreHooks: [
          ({ userAccountId }) => this.shoppingCartService.deleteShoppingCart({ userAccountId }),
          {
            shouldSucceedOrBeTrue: ({ transactionId }) => transactionId === null,
            error: orderServiceErrors.orderAlreadyPaid,
          },
        ],
        postHook: () =>
          sendToRemoteService(
            'kafka',
            'notification-service',
            'orderNotificationsService.sendOrderCreateNotifications',
            {
              orderId: _id,
            }
          ),
      }
    );
  }

  @AllowForEveryUserForOwnResources('userAccountId')
  @Update('addOrRemove')
  removeUndeliveredOrderItem({ _id, orderItemId }: RemoveOrderItemArg): PromiseErrorOr<null> {
    return this.dataStore.removeSubEntityFromEntityById('orderItems', orderItemId, Order, _id, {
      entityPreHooks: [
        this.isPaidOrderPreHook,
        {
          shouldSucceedOrBeTrue: (order) =>
            JSONPath({ json: order, path: `orderItems[?(@.id == '${orderItemId}')].state` })[0] ===
            'toBeDelivered',
          error: orderServiceErrors.cannotRemoveDeliveredOrderItem,
        },
        (order) => this.updateSalesItemStateToForSale(order, orderItemId),
      ],
      postHook: () => OrderServiceImpl.refundOrderItem(_id, orderItemId),
    });
  }

  @AllowForEveryUserForOwnResources('userAccountId')
  deleteUndeliveredPaidOrder({ _id }: _Id): PromiseErrorOr<null> {
    return this.dataStore.deleteEntityById(Order, _id, {
      entityPreHooks: [
        this.isPaidOrderPreHook,
        {
          shouldSucceedOrBeTrue: (order) =>
            JSONPath({ json: order, path: 'orderItems[?(@.state != "toBeDelivered")]' }).length === 0,
          error: orderServiceErrors.deliveredOrderDeleteNotAllowed,
        },
        (order) =>
          this.salesItemService.updateSalesItemStates(
            JSONPath({ json: order, path: 'orderItems[*].salesItems[*]' }),
            'forSale'
          ),
      ],
      postHook: () =>
        sendToRemoteService('kafka', 'refund-service', `refundService.refundOrder`, {
          orderId: _id,
        }),
    });
  }

  @AllowForUserRoles(['vitjaLogisticsPartner'])
  @Update('update')
  deliverOrderItem({ _id, version, orderItems }: DeliverOrderItemArg): PromiseErrorOr<null> {
    const [orderItem] = orderItems;

    return this.dataStore.updateEntity(
      Order,
      {
        version,
        _id,
        orderItems: [{ ...orderItem, state: 'delivering' }],
      },
      {
        entityPreHooks: [
          this.isPaidOrderPreHook,
          {
            shouldSucceedOrBeTrue: (order) =>
              OrderServiceImpl.hasOrderItemState(order, orderItem.id, 'toBeDelivered'),
            error: orderServiceErrors.orderItemAlreadyDelivered,
          },
        ],
        postHook: () =>
          sendToRemoteService(
            'kafka',
            'notification-service',
            'orderNotificationsService.sendOrderItemDeliveryNotification',
            {
              orderId: _id,
              orderItem,
            }
          ),
      }
    );
  }

  @AllowForUserRoles(['vitjaLogisticsPartner'])
  @Update('update')
  receiveOrderItem({ _id, version, orderItemId }: _IdAndOrderItemId): PromiseErrorOr<null> {
    return this.dataStore.updateEntity(
      Order,
      {
        _id,
        version,
        orderItems: [{ id: orderItemId, state: 'delivered' }],
      },
      {
        entityPreHooks: [
          this.isPaidOrderPreHook,
          {
            shouldSucceedOrBeTrue: (order) =>
              OrderServiceImpl.hasOrderItemState(order, orderItemId, 'delivering'),
            error: orderServiceErrors.invalidOrderItemCurrentState,
          },
        ],
      }
    );
  }

  @AllowForUserRoles(['vitjaLogisticsPartner'])
  @Update('update')
  returnOrderItem({ _id, version, orderItemId }: _IdAndOrderItemId): PromiseErrorOr<null> {
    return this.dataStore.updateEntity(
      Order,
      {
        _id,
        version,
        orderItems: [{ id: orderItemId, state: 'returning' }],
      },
      {
        entityPreHooks: [
          this.isPaidOrderPreHook,
          {
            shouldSucceedOrBeTrue: (order) =>
              OrderServiceImpl.hasOrderItemState(order, orderItemId, 'delivered'),
            error: orderServiceErrors.invalidOrderItemCurrentState,
          },
        ],
      }
    );
  }

  @AllowForUserRoles(['vitjaLogisticsPartner'])
  @Update('update')
  receiveReturnedOrderItem({ _id, version, orderItemId }: _IdAndOrderItemId): PromiseErrorOr<null> {
    return this.dataStore.updateEntity(
      Order,
      {
        _id,
        version,
        orderItems: [{ id: orderItemId, state: 'returned' }],
      },
      {
        entityPreHooks: [
          this.isPaidOrderPreHook,
          (order) => this.updateSalesItemStateToForSale(order, orderItemId),
          {
            shouldSucceedOrBeTrue: (order) =>
              OrderServiceImpl.hasOrderItemState(order, orderItemId, 'returning'),
            error: orderServiceErrors.invalidOrderItemCurrentState,
          },
        ],
        postHook: () => OrderServiceImpl.refundOrderItem(_id, orderItemId),
      }
    );
  }

  @CronJob({ minuteInterval: 5 })
  async deleteUnpaidOrders({ unpaidOrderTimeToLiveInMinutes }: DeleteUnpaidOrdersArg): PromiseErrorOr<null> {
    const unpaidOrderFilters = this.dataStore.getFilters(
      {
        transactionId: null,
        lastModifiedTimestamp: {
          $lte: dayjs().subtract(unpaidOrderTimeToLiveInMinutes, 'minutes').toDate(),
        },
      },
      [
        new SqlEqFilter({ transactionId: null }),
        new SqlFilter(
          `lastmodifiedtimestamp <= current_timestamp - INTERVAL '${unpaidOrderTimeToLiveInMinutes}' minute`
        ),
      ]
    );

    return this.dataStore.executeInsideTransaction(async () => {
      const [, error] = await this.dataStore.getEntitiesByFilters(
        Order,
        unpaidOrderFilters,
        {
          includeResponseFields: ['orderItems.salesItems._id'],
          paginations: [{ subEntityPath: '*', pageSize: 1000, pageNumber: 1 }],
        },
        false,
        {
          postHook: (unpaidOrders) => {
            const salesItemIdsToUpdate = JSONPath({
              json: unpaidOrders ?? null,
              path: '$[*].orderItems[*].salesItems[*]._id',
            });

            const salesItemFilters = this.dataStore.getFilters({ _id: { $in: salesItemIdsToUpdate } }, [
              new SqlInFilter('_id', salesItemIdsToUpdate),
            ]);

            return salesItemIdsToUpdate.length > 0
              ? this.dataStore.updateEntitiesByFilters(SalesItem, salesItemFilters, { state: 'forSale' })
              : true;
          },
        }
      );

      return error ? [null, error] : this.dataStore.deleteEntitiesByFilters(Order, unpaidOrderFilters);
    });
  }

  private static refundOrderItem(orderId: string, orderItemId: string): PromiseErrorOr<null> {
    return sendToRemoteService('kafka', 'refund-service', `refundService.refundOrderItem`, {
      orderId,
      orderItemId,
    });
  }

  private static getLocationHeaderUrl(
    paymentGateway: PaymentGateway,
    orderId: string,
    uiRedirectUrl: string
  ) {
    let paymentGatewayHost;
    let paymentGatewayUrlPath;

    switch (paymentGateway) {
      case 'Paytrail':
        paymentGatewayHost = 'server.paytrail.com';
        paymentGatewayUrlPath = 'pay';
        break;
      case 'PayPal':
        paymentGatewayHost = 'server.paypal.com';
        paymentGatewayUrlPath = 'pay';
        break;
      case 'Klarna':
        paymentGatewayHost = 'server.klarna.com';
        paymentGatewayUrlPath = 'pay';
        break;
    }

    const successUrl = encodeURIComponent(
      `https://${
        process.env.API_GATEWAY_FQDN
      }/${getMicroserviceName()}/ordersService.payOrder?_id=${orderId}&transactionId=transactionId&transactionTimestamp=transactionTimestamp&paymentAmount=paymentAmount`
    );

    const failureUrl = encodeURIComponent(
      `https://${
        process.env.API_GATEWAY_FQDN
      }/${getMicroserviceName()}/ordersService.discardUnpaidOrder?_id=${orderId}`
    );

    const paymentSuccessMessage = `Order with id ${orderId} was successfully registered and paid`;
    const successUiRedirectUrl = encodeURIComponent(`${uiRedirectUrl}?message=${paymentSuccessMessage}`);
    const paymentFailureMessage = `Order payment failed`;
    const failureRedirectUrl = encodeURIComponent(`${uiRedirectUrl}?message=${paymentFailureMessage}`);

    return `https://${paymentGatewayHost}/${paymentGatewayUrlPath}?successUrl=${successUrl}&failureUrl=${failureUrl}&successRedirectUrl=${successUiRedirectUrl}&failureRedirectUrl=${failureRedirectUrl}`;
  }

  private static hasOrderItemState(
    order: Order,
    orderItemId: string,
    requiredState: OrderItemState
  ): boolean {
    return (
      JSONPath({
        json: order,
        path: `orderItems[?(@.id == '${orderItemId}')].state`,
      })[0] === requiredState
    );
  }

  private updateSalesItemStateToForSale(order: Order, orderItemId: string): PromiseErrorOr<null> {
    return this.salesItemService.updateSalesItemState(
      JSONPath({
        json: order,
        path: `orderItems[?(@.id == '${orderItemId}')].salesItems[0]._id`,
      })[0],
      'forSale'
    );
  }
}

import { _Id, _IdAndUserAccountId, CrudEntityService, One, PromiseErrorOr } from 'backk';
import PlaceOrderArg from './types/args/PlaceOrderArg';
import DeliverOrderItemArg from './types/args/DeliverOrderItemArg';
import Order from './types/entities/Order';
import PayOrderArg from './types/args/PayOrderArg';
import RemoveOrderItemArg from './types/args/RemoveOrderItemArg';
import DeleteUnpaidOrdersArg from './types/args/DeleteUnpaidOrdersArg';
import _IdAndOrderItemId from './types/args/_IdAndOrderItemId';

export default abstract class OrderService extends CrudEntityService {
  abstract deleteAllOrders(): PromiseErrorOr<null>;
  abstract placeOrder(arg: PlaceOrderArg): PromiseErrorOr<One<Order>>;
  abstract getOrder(arg: _Id): PromiseErrorOr<One<Order>>;
  abstract discardUnpaidOrder(arg: _Id): PromiseErrorOr<null>;
  abstract payOrder(arg: PayOrderArg): PromiseErrorOr<null>;
  abstract removeUndeliveredOrderItem(arg: RemoveOrderItemArg): PromiseErrorOr<null>;
  abstract deleteUndeliveredPaidOrder(arg: _Id): PromiseErrorOr<null>;
  abstract deliverOrderItem(arg: DeliverOrderItemArg): PromiseErrorOr<null>;
  abstract receiveOrderItem(arg: _IdAndOrderItemId): PromiseErrorOr<null>;
  abstract returnOrderItem(arg: _IdAndOrderItemId): PromiseErrorOr<null>;
  abstract receiveReturnedOrderItem(arg: _IdAndOrderItemId): PromiseErrorOr<null>;
  abstract deleteUnpaidOrders(arg: DeleteUnpaidOrdersArg): PromiseErrorOr<null>;
}

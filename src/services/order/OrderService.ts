import { One, PromiseErrorOr, _Id } from 'backk';
import { Service } from 'backk/lib/services/Service';
import DeleteUnpaidOrdersArg from './types/args/DeleteUnpaidOrdersArg';
import DeliverOrderItemArg from './types/args/DeliverOrderItemArg';
import PayOrderArg from './types/args/PayOrderArg';
import PlaceOrderArg from './types/args/PlaceOrderArg';
import RemoveOrderItemArg from './types/args/RemoveOrderItemArg';
import _IdAndOrderItemId from './types/args/_IdAndOrderItemId';
import Order from './types/entities/Order';

export interface OrderService extends Service {
  deleteAllOrders(): PromiseErrorOr<null>;
  placeOrder(arg: PlaceOrderArg): PromiseErrorOr<One<Order>>;
  getOrder(arg: _Id): PromiseErrorOr<One<Order>>;
  discardUnpaidOrder(arg: _Id): PromiseErrorOr<null>;
  payOrder(arg: PayOrderArg): PromiseErrorOr<null>;
  removeUndeliveredOrderItem(arg: RemoveOrderItemArg): PromiseErrorOr<null>;
  deleteUndeliveredPaidOrder(arg: _Id): PromiseErrorOr<null>;
  deliverOrderItem(arg: DeliverOrderItemArg): PromiseErrorOr<null>;
  receiveOrderItem(arg: _IdAndOrderItemId): PromiseErrorOr<null>;
  returnOrderItem(arg: _IdAndOrderItemId): PromiseErrorOr<null>;
  receiveReturnedOrderItem(arg: _IdAndOrderItemId): PromiseErrorOr<null>;
  deleteUnpaidOrders(arg: DeleteUnpaidOrdersArg): PromiseErrorOr<null>;
}

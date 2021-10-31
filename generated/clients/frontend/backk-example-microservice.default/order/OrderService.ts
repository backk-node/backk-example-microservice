// DO NOT MODIFY THIS FILE! This is an auto-generated file
import { callRemoteService, One, PromiseErrorOr, _Id } from 'backk-frontend-utils';
import DeliverOrderItemArg from './types/args/DeliverOrderItemArg';
import PayOrderArg from './types/args/PayOrderArg';
import PlaceOrderArg from './types/args/PlaceOrderArg';
import RemoveOrderItemArg from './types/args/RemoveOrderItemArg';
import _IdAndOrderItemId from './types/args/_IdAndOrderItemId';
import Order from './types/entities/Order';

export default class OrderService {
  placeOrder(placeOrderArg: PlaceOrderArg): PromiseErrorOr<One<Order>> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.placeOrder',
      placeOrderArg,
      'default'
    );
  }

  getOrder(_id: _Id): PromiseErrorOr<One<Order>> {
    return callRemoteService('backk-example-microservice', 'orderService.getOrder', _id, 'default');
  }

  discardUnpaidOrder(_id: _Id): PromiseErrorOr<null> {
    return callRemoteService('backk-example-microservice', 'orderService.discardUnpaidOrder', _id, 'default');
  }

  payOrder(payOrderArg: PayOrderArg): PromiseErrorOr<null> {
    return callRemoteService('backk-example-microservice', 'orderService.payOrder', payOrderArg, 'default');
  }

  removeUndeliveredOrderItem(removeOrderItemArg: RemoveOrderItemArg): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.removeUndeliveredOrderItem',
      removeOrderItemArg,
      'default'
    );
  }

  deleteUndeliveredPaidOrder(_id: _Id): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.deleteUndeliveredPaidOrder',
      _id,
      'default'
    );
  }

  deliverOrderItem(deliverOrderItemArg: DeliverOrderItemArg): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.deliverOrderItem',
      deliverOrderItemArg,
      'default'
    );
  }

  receiveOrderItem(_idAndOrderItemId: _IdAndOrderItemId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.receiveOrderItem',
      _idAndOrderItemId,
      'default'
    );
  }

  returnOrderItem(_idAndOrderItemId: _IdAndOrderItemId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.returnOrderItem',
      _idAndOrderItemId,
      'default'
    );
  }

  receiveReturnedOrderItem(_idAndOrderItemId: _IdAndOrderItemId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.receiveReturnedOrderItem',
      _idAndOrderItemId,
      'default'
    );
  }
}

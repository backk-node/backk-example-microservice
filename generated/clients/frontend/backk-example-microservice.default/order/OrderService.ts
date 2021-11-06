// DO NOT MODIFY THIS FILE! This is an auto-generated file
import { callRemoteService, One, PromiseErrorOr, _Id } from 'backk-frontend-utils';
import EncryptionKeyManager from '../_backk/EncryptionKeyManager';
import DeliverOrderItemArg from './types/args/DeliverOrderItemArg';
import PayOrderArg from './types/args/PayOrderArg';
import PlaceOrderArg from './types/args/PlaceOrderArg';
import RemoveOrderItemArg from './types/args/RemoveOrderItemArg';
import _IdAndOrderItemId from './types/args/_IdAndOrderItemId';
import Order from './types/entities/Order';

export default class OrderService {
  static placeOrder(placeOrderArg: PlaceOrderArg): PromiseErrorOr<One<Order>> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.placeOrder',
      'create',
      placeOrderArg,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static getOrder(_id: _Id): PromiseErrorOr<One<Order>> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.getOrder',
      'other',
      _id,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static discardUnpaidOrder(_id: _Id): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.discardUnpaidOrder',
      'other',
      _id,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static payOrder(payOrderArg: PayOrderArg): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.payOrder',
      'update',
      payOrderArg,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static removeUndeliveredOrderItem(removeOrderItemArg: RemoveOrderItemArg): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.removeUndeliveredOrderItem',
      'update',
      removeOrderItemArg,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static deleteUndeliveredPaidOrder(_id: _Id): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.deleteUndeliveredPaidOrder',
      'other',
      _id,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static deliverOrderItem(deliverOrderItemArg: DeliverOrderItemArg): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.deliverOrderItem',
      'update',
      deliverOrderItemArg,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static receiveOrderItem(_idAndOrderItemId: _IdAndOrderItemId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.receiveOrderItem',
      'update',
      _idAndOrderItemId,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static returnOrderItem(_idAndOrderItemId: _IdAndOrderItemId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.returnOrderItem',
      'update',
      _idAndOrderItemId,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static receiveReturnedOrderItem(_idAndOrderItemId: _IdAndOrderItemId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'orderService.receiveReturnedOrderItem',
      'update',
      _idAndOrderItemId,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }
}

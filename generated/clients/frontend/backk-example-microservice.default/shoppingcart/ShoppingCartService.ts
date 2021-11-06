// DO NOT MODIFY THIS FILE! This is an auto-generated file
import { callRemoteService, One, PromiseErrorOr, UserAccountId } from 'backk-frontend-utils';
import EncryptionKeyManager from '../_backk/EncryptionKeyManager';
import UserAccountIdAndSalesItemId from './types/args/UserAccountIdAndSalesItemId';
import ShoppingCart from './types/entities/ShoppingCart';

export default class ShoppingCartService {
  static getShoppingCart(userAccountId: UserAccountId): PromiseErrorOr<One<ShoppingCart>> {
    return callRemoteService(
      'backk-example-microservice',
      'shoppingCartService.getShoppingCart',
      'other',
      userAccountId,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static addToShoppingCart(userAccountIdAndSalesItemId: UserAccountIdAndSalesItemId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'shoppingCartService.addToShoppingCart',
      'update',
      userAccountIdAndSalesItemId,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static removeFromShoppingCart(
    userAccountIdAndSalesItemId: UserAccountIdAndSalesItemId
  ): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'shoppingCartService.removeFromShoppingCart',
      'update',
      userAccountIdAndSalesItemId,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static emptyShoppingCart(userAccountId: UserAccountId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'shoppingCartService.emptyShoppingCart',
      'other',
      userAccountId,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }
}

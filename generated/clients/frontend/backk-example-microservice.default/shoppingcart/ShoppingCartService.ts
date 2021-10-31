// DO NOT MODIFY THIS FILE! This is an auto-generated file
import { callRemoteService, One, PromiseErrorOr, UserAccountId } from 'backk-frontend-utils';
import UserAccountIdAndSalesItemId from './types/args/UserAccountIdAndSalesItemId';
import ShoppingCart from './types/entities/ShoppingCart';

export default class ShoppingCartService {
  getShoppingCart(userAccountId: UserAccountId): PromiseErrorOr<One<ShoppingCart>> {
    return callRemoteService(
      'backk-example-microservice',
      'shoppingCartService.getShoppingCart',
      userAccountId,
      'default'
    );
  }

  addToShoppingCart(userAccountIdAndSalesItemId: UserAccountIdAndSalesItemId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'shoppingCartService.addToShoppingCart',
      userAccountIdAndSalesItemId,
      'default'
    );
  }

  removeFromShoppingCart(userAccountIdAndSalesItemId: UserAccountIdAndSalesItemId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'shoppingCartService.removeFromShoppingCart',
      userAccountIdAndSalesItemId,
      'default'
    );
  }

  emptyShoppingCart(userAccountId: UserAccountId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'shoppingCartService.emptyShoppingCart',
      userAccountId,
      'default'
    );
  }
}

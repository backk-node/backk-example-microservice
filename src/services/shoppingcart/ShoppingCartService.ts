import { ErrorDef, One, PromiseErrorOr, UserAccountId } from 'backk';
import UserAccountIdAndSalesItemId from './types/args/UserAccountIdAndSalesItemId';
import ShoppingCart from './types/entities/ShoppingCart';

export interface ShoppingCartService {
  deleteAllShoppingCarts(): PromiseErrorOr<null>;
  getShoppingCart(arg: UserAccountId): PromiseErrorOr<One<ShoppingCart>>;
  addToShoppingCart(arg: UserAccountIdAndSalesItemId): PromiseErrorOr<null>;
  removeFromShoppingCart(arg: UserAccountIdAndSalesItemId): PromiseErrorOr<null>;
  emptyShoppingCart(arg: UserAccountId): PromiseErrorOr<null>;
  deleteShoppingCart(arg: UserAccountId): PromiseErrorOr<null>;

  getShoppingCartOrErrorIfEmpty(userAccountId: string, error: ErrorDef): PromiseErrorOr<One<ShoppingCart>>;
}

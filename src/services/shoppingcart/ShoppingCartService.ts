import { CrudEntityService, ErrorDef, One, PromiseErrorOr, UserAccountId } from 'backk';
import ShoppingCart from './types/entities/ShoppingCart';
import UserAccountIdAndSalesItemId from './types/args/UserAccountIdAndSalesItemId';

export default abstract class ShoppingCartService extends CrudEntityService {
  abstract deleteAllShoppingCarts(): PromiseErrorOr<null>;
  abstract getShoppingCart(arg: UserAccountId): PromiseErrorOr<One<ShoppingCart>>;
  abstract addToShoppingCart(arg: UserAccountIdAndSalesItemId): PromiseErrorOr<null>;
  abstract removeFromShoppingCart(arg: UserAccountIdAndSalesItemId): PromiseErrorOr<null>;
  abstract emptyShoppingCart(arg: UserAccountId): PromiseErrorOr<null>;
  abstract deleteShoppingCart(arg: UserAccountId): PromiseErrorOr<null>;

  abstract getShoppingCartOrErrorIfEmpty(
    userAccountId: string,
    error: ErrorDef
  ): PromiseErrorOr<One<ShoppingCart>>;
}

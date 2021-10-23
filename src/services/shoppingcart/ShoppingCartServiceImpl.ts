import ShoppingCartService from './ShoppingCartService';
import ShoppingCart from './types/entities/ShoppingCart';
import SalesItemService from '../salesitem/SalesItemService';
import UserAccountIdAndSalesItemId from './types/args/UserAccountIdAndSalesItemId';
import { shoppingCartServiceErrors } from './errors/shoppingCartServiceErrors';
import {
  AbstractDataStore,
  AllowForEveryUserForOwnResources,
  AllowForMicroserviceInternalUse,
  AllowForTests,
  AllowServiceForUserRoles,
  DefaultPostQueryOperations,
  Delete,
  ErrorDef,
  One,
  PromiseErrorOr,
  Update,
  UserAccountId
} from 'backk';

@AllowServiceForUserRoles(['vitjaAdmin'])
export default class ShoppingCartServiceImpl extends ShoppingCartService {
  constructor(dataStore: AbstractDataStore, private readonly salesItemService: SalesItemService) {
    super(shoppingCartServiceErrors, dataStore);
  }

  @AllowForTests()
  deleteAllShoppingCarts(): PromiseErrorOr<null> {
    return this.dataStore.deleteAllEntities(ShoppingCart);
  }

  @AllowForEveryUserForOwnResources('userAccountId')
  getShoppingCart({ userAccountId }: UserAccountId): PromiseErrorOr<One<ShoppingCart>> {
    return this.dataStore.getEntityByFilters(
      ShoppingCart,
      { userAccountId },
      new DefaultPostQueryOperations(),
      false,
      {
        preHooks: () => this.removeExpiredSalesItemsFromShoppingCart(userAccountId),
        ifEntityNotFoundReturn: () =>
          this.dataStore.createEntity(ShoppingCart, { userAccountId, salesItems: [] })
      }
    );
  }

  @AllowForEveryUserForOwnResources('userAccountId')
  @Update('addOrRemove')
  addToShoppingCart({ userAccountId, salesItemId }: UserAccountIdAndSalesItemId): PromiseErrorOr<null> {
    return this.dataStore.addSubEntitiesToEntityByFilters(
      'salesItems',
      [{ _id: salesItemId }],
      ShoppingCart,
      { userAccountId },
      {
        ifEntityNotFoundUse: () =>
          this.dataStore.createEntity(ShoppingCart, { userAccountId, salesItems: [] }),
        entityPreHooks: {
          shouldSucceedOrBeTrue: () =>
            this.salesItemService.updateSalesItemState(salesItemId, 'reserved', 'forSale', userAccountId),
          error: shoppingCartServiceErrors.salesItemReservedOrSold
        }
      }
    );
  }

  @AllowForEveryUserForOwnResources('userAccountId')
  @Update('addOrRemove')
  removeFromShoppingCart({ userAccountId, salesItemId }: UserAccountIdAndSalesItemId): PromiseErrorOr<null> {
    return this.dataStore.removeSubEntityFromEntityByFilters(
      'salesItems',
      salesItemId,
      ShoppingCart,
      { userAccountId },
      {
        entityPreHooks: () =>
          this.salesItemService.updateSalesItemStatesByFilters(
            [salesItemId],
            'forSale',
            'reserved',
            userAccountId
          )
      }
    );
  }

  @AllowForEveryUserForOwnResources('userAccountId')
  @Delete()
  emptyShoppingCart({ userAccountId }: UserAccountId): PromiseErrorOr<null> {
    return this.dataStore.deleteEntityByFilters(
      ShoppingCart,
      { userAccountId },
      {
        entityPreHooks: ({ salesItems }) =>
          this.salesItemService.updateSalesItemStatesByFilters(
            salesItems.map(({ _id }) => _id),
            'forSale',
            'reserved',
            userAccountId
          )
      }
    );
  }

  @AllowForMicroserviceInternalUse()
  deleteShoppingCart({ userAccountId }: UserAccountId): PromiseErrorOr<null> {
    return this.dataStore.deleteEntitiesByFilters(ShoppingCart, { userAccountId });
  }

  @AllowForMicroserviceInternalUse()
  getShoppingCartOrErrorIfEmpty(userAccountId: string, error: ErrorDef): PromiseErrorOr<One<ShoppingCart>> {
    return this.dataStore.getEntityByFilters(
      ShoppingCart,
      { userAccountId },
      new DefaultPostQueryOperations(),
      false,
      {
        preHooks: () => this.removeExpiredSalesItemsFromShoppingCart(userAccountId),
        postHook: {
          shouldSucceedOrBeTrue: (shoppingCart) => (shoppingCart?.salesItems.length ?? 0) > 0,
          error
        }
      }
    );
  }

  private removeExpiredSalesItemsFromShoppingCart(userAccountId: string): PromiseErrorOr<null> {
    return this.dataStore.removeSubEntitiesFromEntityByFilters(
      `salesItems[?(@.state !== 'reserved' || @.buyerUserAccountId !== '${userAccountId}' )]`,
      ShoppingCart,
      { userAccountId }
    );
  }
}

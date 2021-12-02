import { Many, One, PromiseErrorOr, Service, UserAccountId, _Id, _IdAndUserAccountId } from 'backk';
import ShoppingCartOrOrderSalesItem from '../shoppingcart/types/entities/ShoppingCartOrOrderSalesItem';
import ChangeExpiredReservedSalesItemStatesToForSaleArg from './types/args/ChangeExpiredReservedSalesItemStatesToForSaleArg';
import DeleteOldUnsoldSalesItemsArg from './types/args/DeleteOldUnsoldSalesItemsArg';
import GetSalesItemsArg from './types/args/GetSalesItemsArg';
import GetSalesItemsByUserDefinedFiltersArg from './types/args/GetSalesItemsByUserDefinedFiltersArg';
import SalesItem from './types/entities/SalesItem';
import { SalesItemState } from './types/enums/SalesItemState';
import FollowedUserSalesItem from './types/responses/FollowedUserSalesItem';

export interface SalesItemService extends Service {
  deleteAllSalesItems(): PromiseErrorOr<null>;
  createSalesItem(arg: SalesItem): PromiseErrorOr<One<SalesItem>>;
  subscribeToCreatedSalesItem(): PromiseErrorOr<null>;
  getSalesItems(arg: GetSalesItemsArg): PromiseErrorOr<Many<SalesItem>>;

  getSalesItemsByUserDefinedFilters(
    arg: GetSalesItemsByUserDefinedFiltersArg
  ): PromiseErrorOr<Many<SalesItem>>;

  getFollowedUsersSalesItems(arg: UserAccountId): PromiseErrorOr<Many<FollowedUserSalesItem>>;
  getSalesItem(arg: _Id): PromiseErrorOr<One<SalesItem>>;
  followSalesItemPriceChange(arg: _IdAndUserAccountId): PromiseErrorOr<null>;
  unfollowSalesItemPriceChange(arg: _IdAndUserAccountId): PromiseErrorOr<null>;
  toggleLikeSalesItem(arg: _IdAndUserAccountId): PromiseErrorOr<null>;
  updateSalesItem(arg: SalesItem): PromiseErrorOr<null>;

  changeExpiredReservedSalesItemStatesToForSale(
    arg: ChangeExpiredReservedSalesItemStatesToForSaleArg
  ): PromiseErrorOr<null>;

  deleteOldUnsoldSalesItemsDaily(arg: DeleteOldUnsoldSalesItemsArg): PromiseErrorOr<null>;
  deleteSalesItem(arg: _Id): PromiseErrorOr<null>;

  updateSalesItemStates(
    salesItems: ShoppingCartOrOrderSalesItem[],
    newState: SalesItemState,
    requiredCurrentState?: SalesItemState,
    buyerUserAccountId?: string
  ): PromiseErrorOr<null>;

  updateSalesItemState(
    _id: string,
    newState: SalesItemState,
    requiredCurrentState?: SalesItemState,
    buyerUserAccountId?: string | null
  ): PromiseErrorOr<null>;

  updateSalesItemStatesByFilters(
    salesItemIds: string[],
    newState: SalesItemState,
    currentStateFilter: SalesItemState,
    buyerUserAccountIdFilter: string
  ): PromiseErrorOr<null>;
}

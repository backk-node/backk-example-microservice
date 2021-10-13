import { _Id, _IdAndUserAccountId, CrudEntityService, Many, One, PromiseErrorOr, UserAccountId } from 'backk';
import GetSalesItemsArg from './types/args/GetSalesItemsArg';
import SalesItem from './types/entities/SalesItem';
import GetSalesItemsByUserDefinedFiltersArg from './types/args/GetSalesItemsByUserDefinedFiltersArg';
import { SalesItemState } from './types/enums/SalesItemState';
import DeleteOldUnsoldSalesItemsArg from './types/args/DeleteOldUnsoldSalesItemsArg';
import FollowedUserSalesItem from './types/responses/FollowedUserSalesItem';
import ShoppingCartOrOrderSalesItem from '../shoppingcart/types/entities/ShoppingCartOrOrderSalesItem';
import ChangeExpiredReservedSalesItemStatesToForSaleArg from './types/args/ChangeExpiredReservedSalesItemStatesToForSaleArg';

export default abstract class SalesItemService extends CrudEntityService {
  abstract deleteAllSalesItems(): PromiseErrorOr<null>;
  abstract createSalesItem(arg: SalesItem): PromiseErrorOr<One<SalesItem>>;
  abstract getSalesItems(arg: GetSalesItemsArg): PromiseErrorOr<Many<SalesItem>>;

  abstract getSalesItemsByUserDefinedFilters(
    arg: GetSalesItemsByUserDefinedFiltersArg
  ): PromiseErrorOr<Many<SalesItem>>;

  abstract getFollowedUsersSalesItems(arg: UserAccountId): PromiseErrorOr<Many<FollowedUserSalesItem>>;
  abstract getSalesItem(arg: _Id): PromiseErrorOr<One<SalesItem>>;
  abstract followSalesItemPriceChange(arg: _IdAndUserAccountId): PromiseErrorOr<null>;
  abstract unfollowSalesItemPriceChange(arg: _IdAndUserAccountId): PromiseErrorOr<null>;
  abstract toggleLikeSalesItem(arg: _IdAndUserAccountId): PromiseErrorOr<null>;
  abstract updateSalesItem(arg: SalesItem): PromiseErrorOr<null>;

  abstract changeExpiredReservedSalesItemStatesToForSale(
    arg: ChangeExpiredReservedSalesItemStatesToForSaleArg
  ): PromiseErrorOr<null>;

  abstract deleteOldUnsoldSalesItemsDaily(arg: DeleteOldUnsoldSalesItemsArg): PromiseErrorOr<null>;
  abstract deleteSalesItem(arg: _Id): PromiseErrorOr<null>;

  abstract updateSalesItemStates(
    salesItems: ShoppingCartOrOrderSalesItem[],
    newState: SalesItemState,
    requiredCurrentState?: SalesItemState,
    buyerUserAccountId?: string
  ): PromiseErrorOr<null>;

  abstract updateSalesItemState(
    _id: string,
    newState: SalesItemState,
    requiredCurrentState?: SalesItemState,
    buyerUserAccountId?: string | null
  ): PromiseErrorOr<null>;

  abstract updateSalesItemStatesByFilters(
    salesItemIds: string[],
    newState: SalesItemState,
    currentStateFilter: SalesItemState,
    buyerUserAccountIdFilter: string
  ): PromiseErrorOr<null>;
}

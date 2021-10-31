// DO NOT MODIFY THIS FILE! This is an auto-generated file
import {
  callRemoteService,
  Many,
  One,
  PromiseErrorOr,
  UserAccountId,
  _Id,
  _IdAndUserAccountId,
} from 'backk-frontend-utils';
import GetSalesItemsArg from './types/args/GetSalesItemsArg';
import GetSalesItemsByUserDefinedFiltersArg from './types/args/GetSalesItemsByUserDefinedFiltersArg';
import SalesItem from './types/entities/SalesItem';
import FollowedUserSalesItem from './types/responses/FollowedUserSalesItem';

export default class SalesItemService {
  createSalesItem(salesItem: SalesItem): PromiseErrorOr<One<SalesItem>> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.createSalesItem',
      salesItem,
      'default'
    );
  }

  getSalesItems(getSalesItemsArg: GetSalesItemsArg): PromiseErrorOr<Many<SalesItem>> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.getSalesItems',
      getSalesItemsArg,
      'default'
    );
  }

  getSalesItemsByUserDefinedFilters(
    getSalesItemsByUserDefinedFiltersArg: GetSalesItemsByUserDefinedFiltersArg
  ): PromiseErrorOr<Many<SalesItem>> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.getSalesItemsByUserDefinedFilters',
      getSalesItemsByUserDefinedFiltersArg,
      'default'
    );
  }

  getFollowedUsersSalesItems(userAccountId: UserAccountId): PromiseErrorOr<Many<FollowedUserSalesItem>> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.getFollowedUsersSalesItems',
      userAccountId,
      'default'
    );
  }

  getSalesItem(_id: _Id): PromiseErrorOr<One<SalesItem>> {
    return callRemoteService('backk-example-microservice', 'salesItemService.getSalesItem', _id, 'default');
  }

  followSalesItemPriceChange(_idAndUserAccountId: _IdAndUserAccountId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.followSalesItemPriceChange',
      _idAndUserAccountId,
      'default'
    );
  }

  unfollowSalesItemPriceChange(_idAndUserAccountId: _IdAndUserAccountId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.unfollowSalesItemPriceChange',
      _idAndUserAccountId,
      'default'
    );
  }

  toggleLikeSalesItem(_idAndUserAccountId: _IdAndUserAccountId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.toggleLikeSalesItem',
      _idAndUserAccountId,
      'default'
    );
  }

  updateSalesItem(salesItem: SalesItem): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.updateSalesItem',
      salesItem,
      'default'
    );
  }

  deleteSalesItem(_id: _Id): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.deleteSalesItem',
      _id,
      'default'
    );
  }
}

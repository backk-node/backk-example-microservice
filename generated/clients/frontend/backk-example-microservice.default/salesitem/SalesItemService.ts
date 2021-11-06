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
import EncryptionKeyManager from '../_backk/EncryptionKeyManager';
import GetSalesItemsArg from './types/args/GetSalesItemsArg';
import GetSalesItemsByUserDefinedFiltersArg from './types/args/GetSalesItemsByUserDefinedFiltersArg';
import SalesItem from './types/entities/SalesItem';
import FollowedUserSalesItem from './types/responses/FollowedUserSalesItem';

export default class SalesItemService {
  static createSalesItem(salesItem: SalesItem): PromiseErrorOr<One<SalesItem>> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.createSalesItem',
      'create',
      salesItem,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static getSalesItems(getSalesItemsArg: GetSalesItemsArg): PromiseErrorOr<Many<SalesItem>> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.getSalesItems',
      'other',
      getSalesItemsArg,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static getSalesItemsByUserDefinedFilters(
    getSalesItemsByUserDefinedFiltersArg: GetSalesItemsByUserDefinedFiltersArg
  ): PromiseErrorOr<Many<SalesItem>> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.getSalesItemsByUserDefinedFilters',
      'other',
      getSalesItemsByUserDefinedFiltersArg,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static getFollowedUsersSalesItems(
    userAccountId: UserAccountId
  ): PromiseErrorOr<Many<FollowedUserSalesItem>> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.getFollowedUsersSalesItems',
      'other',
      userAccountId,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static getSalesItem(_id: _Id): PromiseErrorOr<One<SalesItem>> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.getSalesItem',
      'other',
      _id,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static followSalesItemPriceChange(_idAndUserAccountId: _IdAndUserAccountId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.followSalesItemPriceChange',
      'update',
      _idAndUserAccountId,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static unfollowSalesItemPriceChange(_idAndUserAccountId: _IdAndUserAccountId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.unfollowSalesItemPriceChange',
      'update',
      _idAndUserAccountId,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static toggleLikeSalesItem(_idAndUserAccountId: _IdAndUserAccountId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.toggleLikeSalesItem',
      'update',
      _idAndUserAccountId,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static updateSalesItem(salesItem: SalesItem): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.updateSalesItem',
      'update',
      salesItem,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static deleteSalesItem(_id: _Id): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'salesItemService.deleteSalesItem',
      'other',
      _id,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }
}

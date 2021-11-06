// DO NOT MODIFY THIS FILE! This is an auto-generated file
import { callRemoteService, Many, One, PromiseErrorOr, Subject, Value, _Id } from 'backk-frontend-utils';
import EncryptionKeyManager from '../_backk/EncryptionKeyManager';
import GetUserAccountArg from './types/args/GetUserAccountArg';
import _IdAndFollowedUserAccountId from './types/args/_IdAndFollowedUserAccountId';
import _IdAndSalesItemId from './types/args/_IdAndSalesItemId';
import UserAccount from './types/entities/UserAccount';

export default class UserAccountService {
  static createUserAccount(userAccount: UserAccount): PromiseErrorOr<One<UserAccount>> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.createUserAccount',
      'create',
      userAccount,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static getIdBySubject(subject: Subject): PromiseErrorOr<One<_Id>> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.getIdBySubject',
      'other',
      subject,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static getUserAccount(getUserAccountArg: GetUserAccountArg): PromiseErrorOr<One<UserAccount>> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.getUserAccount',
      'other',
      getUserAccountArg,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static followUser(_idAndFollowedUserAccountId: _IdAndFollowedUserAccountId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.followUser',
      'update',
      _idAndFollowedUserAccountId,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static unfollowUser(_idAndFollowedUserAccountId: _IdAndFollowedUserAccountId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.unfollowUser',
      'update',
      _idAndFollowedUserAccountId,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static addToFavoriteSalesItems(_idAndSalesItemId: _IdAndSalesItemId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.addToFavoriteSalesItems',
      'update',
      _idAndSalesItemId,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static removeFromFavoriteSalesItems(_idAndSalesItemId: _IdAndSalesItemId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.removeFromFavoriteSalesItems',
      'update',
      _idAndSalesItemId,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static updateUserAccount(userAccount: UserAccount): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.updateUserAccount',
      'update',
      userAccount,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static deleteUserAccount(_id: _Id): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.deleteUserAccount',
      'other',
      _id,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static getCities(): PromiseErrorOr<Many<Value>> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.getCities',
      'other',
      undefined,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }
}

// DO NOT MODIFY THIS FILE! This is an auto-generated file
import { callRemoteService, Many, One, PromiseErrorOr, Subject, Value, _Id } from 'backk-frontend-utils';
import GetUserAccountArg from './types/args/GetUserAccountArg';
import _IdAndFollowedUserAccountId from './types/args/_IdAndFollowedUserAccountId';
import _IdAndSalesItemId from './types/args/_IdAndSalesItemId';
import UserAccount from './types/entities/UserAccount';

export default class UserAccountService {
  createUserAccount(userAccount: UserAccount): PromiseErrorOr<One<UserAccount>> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.createUserAccount',
      userAccount,
      'default'
    );
  }

  getIdBySubject(subject: Subject): PromiseErrorOr<One<_Id>> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.getIdBySubject',
      subject,
      'default'
    );
  }

  getUserAccount(getUserAccountArg: GetUserAccountArg): PromiseErrorOr<One<UserAccount>> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.getUserAccount',
      getUserAccountArg,
      'default'
    );
  }

  followUser(_idAndFollowedUserAccountId: _IdAndFollowedUserAccountId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.followUser',
      _idAndFollowedUserAccountId,
      'default'
    );
  }

  unfollowUser(_idAndFollowedUserAccountId: _IdAndFollowedUserAccountId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.unfollowUser',
      _idAndFollowedUserAccountId,
      'default'
    );
  }

  addToFavoriteSalesItems(_idAndSalesItemId: _IdAndSalesItemId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.addToFavoriteSalesItems',
      _idAndSalesItemId,
      'default'
    );
  }

  removeFromFavoriteSalesItems(_idAndSalesItemId: _IdAndSalesItemId): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.removeFromFavoriteSalesItems',
      _idAndSalesItemId,
      'default'
    );
  }

  updateUserAccount(userAccount: UserAccount): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.updateUserAccount',
      userAccount,
      'default'
    );
  }

  deleteUserAccount(_id: _Id): PromiseErrorOr<null> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.deleteUserAccount',
      _id,
      'default'
    );
  }

  getCities(): PromiseErrorOr<Many<Value>> {
    return callRemoteService(
      'backk-example-microservice',
      'userAccountService.getCities',
      undefined,
      'default'
    );
  }
}

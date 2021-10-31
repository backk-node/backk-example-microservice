import { Many, One, PromiseErrorOr, Subject, UserService, Value, _Id } from 'backk';
import GetUserAccountArg from './types/args/GetUserAccountArg';
import _IdAndFollowedUserAccountId from './types/args/_IdAndFollowedUserAccountId';
import _IdAndSalesItemId from './types/args/_IdAndSalesItemId';
import UserAccount from './types/entities/UserAccount';

/** Users service doc goes here
 * - jee
 * - jaa
 * **/
export interface UserAccountService extends UserService {
  deleteAllUserAccounts(): PromiseErrorOr<null>;

  // createUserAccount documentation goes here..
  createUserAccount(arg: UserAccount): PromiseErrorOr<One<UserAccount>>;

  getIdBySubject(arg: Subject): PromiseErrorOr<One<_Id>>;
  getUserAccount(arg: GetUserAccountArg): PromiseErrorOr<One<UserAccount>>;
  followUser(arg: _IdAndFollowedUserAccountId): PromiseErrorOr<null>;
  unfollowUser(arg: _IdAndFollowedUserAccountId): PromiseErrorOr<null>;
  addToFavoriteSalesItems(arg: _IdAndSalesItemId): PromiseErrorOr<null>;
  removeFromFavoriteSalesItems(arg: _IdAndSalesItemId): PromiseErrorOr<null>;
  updateUserAccount(arg: UserAccount): PromiseErrorOr<null>;
  deleteUserAccount(arg: _Id): PromiseErrorOr<null>;

  getCities(): PromiseErrorOr<Many<Value>>;
}

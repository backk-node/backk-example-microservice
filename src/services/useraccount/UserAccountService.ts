import { _Id, Many, One, PromiseErrorOr, Subject, UserAccountBaseService, Value } from 'backk';
import UserAccount from './types/entities/UserAccount';
import _IdAndSalesItemId from './types/args/_IdAndSalesItemId';
import GetUserAccountArg from './types/args/GetUserAccountArg';
import _IdAndFollowedUserAccountId from './types/args/_IdAndFollowedUserAccountId';

/** Users service doc goes here
 * - jee
 * - jaa
 * **/
export default abstract class UserAccountService extends UserAccountBaseService {
  abstract deleteAllUserAccounts(): PromiseErrorOr<null>;

  // createUserAccount documentation goes here..
  abstract createUserAccount(arg: UserAccount): PromiseErrorOr<One<UserAccount>>;

  abstract getIdBySubject(arg: Subject): PromiseErrorOr<One<_Id>>;
  abstract getUserAccount(arg: GetUserAccountArg): PromiseErrorOr<One<UserAccount>>;
  abstract followUser(arg: _IdAndFollowedUserAccountId): PromiseErrorOr<null>;
  abstract unfollowUser(arg: _IdAndFollowedUserAccountId): PromiseErrorOr<null>;
  abstract addToFavoriteSalesItems(arg: _IdAndSalesItemId): PromiseErrorOr<null>;
  abstract removeFromFavoriteSalesItems(arg: _IdAndSalesItemId): PromiseErrorOr<null>;
  abstract updateUserAccount(arg: UserAccount): PromiseErrorOr<null>;
  abstract deleteUserAccount(arg: _Id): PromiseErrorOr<null>;

  abstract getCities(): PromiseErrorOr<Many<Value>>;
}

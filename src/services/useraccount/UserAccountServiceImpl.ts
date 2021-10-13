import {
  _Id,
  AbstractDataStore,
  AllowForEveryUser,
  AllowForEveryUserForOwnResources,
  AllowForTests,
  AllowServiceForUserRoles,
  ExecuteOnStartUp,
  Many,
  NoAutoTests,
  One,
  PromiseErrorOr,
  Subject,
  Update,
  Value
} from 'backk';
import UserAccount from './types/entities/UserAccount';
import getCities from './validation/getCities';
import UserAccountService from './UserAccountService';
import GetUserAccountArg from './types/args/GetUserAccountArg';
import _IdAndSalesItemId from './types/args/_IdAndSalesItemId';
import _IdAndFollowedUserAccountId from './types/args/_IdAndFollowedUserAccountId';

@AllowServiceForUserRoles(['vitjaAdmin'])
export default class UserAccountServiceImpl extends UserAccountService {
  constructor(dataStore: AbstractDataStore) {
    super({}, dataStore);
  }

  @ExecuteOnStartUp()
  preloadCities(): PromiseErrorOr<Many<Value>> {
    return getCities();
  }

  @AllowForTests()
  deleteAllUserAccounts(): PromiseErrorOr<null> {
    return this.dataStore.deleteAllEntities(UserAccount);
  }

  @AllowForEveryUserForOwnResources('subject')
  createUserAccount(userAccount: UserAccount): PromiseErrorOr<One<UserAccount>> {
    return this.dataStore.createEntity(
      UserAccount,
      {
        ...userAccount,
        commissionDiscountPercentage: 0,
        isLocked: false
      },
      {
        postQueryOperations: {
          includeResponseFields: ['_id', 'commissionDiscountPercentage']
        }
      }
    );
  }

  getIdBySubject({ subject }: Subject): PromiseErrorOr<One<_Id>> {
    return this.dataStore.getEntityByFilters(
      UserAccount,
      { subject },
      { includeResponseFields: ['_id'] },
      false
    );
  }

  @AllowForEveryUserForOwnResources('subject')
  getUserAccount(getUserAccountArg: GetUserAccountArg): PromiseErrorOr<One<UserAccount>> {
    return this.dataStore.getEntityByFilters(
      UserAccount,
      {
        'favoriteSalesItems.state': 'forSale'
      },
      getUserAccountArg,
      false
    );
  }

  @AllowForEveryUserForOwnResources('_id')
  @Update('addOrRemove')
  followUser({ _id, followedUserAccountId }: _IdAndFollowedUserAccountId): PromiseErrorOr<null> {
    return this.dataStore.addSubEntitiesToEntityById(
      'followedUserAccounts',
      [{ _id: followedUserAccountId }],
      UserAccount,
      _id,
      {
        entityPreHooks: () =>
          this.dataStore.addSubEntitiesToEntityById(
            'followingUserAccounts',
            [{ _id }],
            UserAccount,
            followedUserAccountId
          )
      }
    );
  }

  @AllowForEveryUserForOwnResources('_id')
  @Update('addOrRemove')
  unfollowUser({ _id, followedUserAccountId }: _IdAndFollowedUserAccountId): PromiseErrorOr<null> {
    return this.dataStore.removeSubEntityFromEntityById(
      'followedUserAccounts',
      followedUserAccountId,
      UserAccount,
      _id,
      {
        entityPreHooks: () =>
          this.dataStore.removeSubEntityFromEntityById(
            'followingUserAccounts',
            _id,
            UserAccount,
            followedUserAccountId
          )
      }
    );
  }

  @AllowForEveryUserForOwnResources('_id')
  @Update('addOrRemove')
  addToFavoriteSalesItems({ _id, salesItemId }: _IdAndSalesItemId): PromiseErrorOr<null> {
    return this.dataStore.addSubEntitiesToEntityById(
      'favoriteSalesItems',
      [{ _id: salesItemId }],
      UserAccount,
      _id
    );
  }

  @AllowForEveryUserForOwnResources('_id')
  @Update('addOrRemove')
  removeFromFavoriteSalesItems({ _id, salesItemId }: _IdAndSalesItemId): PromiseErrorOr<null> {
    return this.dataStore.removeSubEntityFromEntityById('favoriteSalesItems', salesItemId, UserAccount, _id);
  }

  @AllowForEveryUserForOwnResources('_id')
  updateUserAccount(userAccount: UserAccount): PromiseErrorOr<null> {
    return this.dataStore.updateEntity(UserAccount, userAccount);
  }

  @AllowForEveryUserForOwnResources('_id')
  deleteUserAccount({ _id }: _Id): PromiseErrorOr<null> {
    return this.dataStore.deleteEntityById(UserAccount, _id);
  }

  @AllowForEveryUser()
  @NoAutoTests()
  getCities(): PromiseErrorOr<Many<Value>> {
    return getCities();
  }
}

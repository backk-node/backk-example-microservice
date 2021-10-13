import {
  _Id,
  AbstractDataStore,
  AllowForEveryUser,
  AllowServiceForUserRoles,
  DefaultPostQueryOperations,
  Many,
  One,
  PromiseErrorOr,
  SqlExpression
} from 'backk';
import GetUsersArg from './/types/args/GetUsersArg';
import User from './types/entities/User';
import UserService from './UserService';

@AllowServiceForUserRoles(['vitjaAdmin'])
export default class UserServiceImpl extends UserService {
  constructor(dataStore: AbstractDataStore) {
    super({}, dataStore);
  }

  @AllowForEveryUser()
  getUsers({ displayNameFilter, ...postQueryOperations }: GetUsersArg): PromiseErrorOr<Many<User>> {
    const filters = this.dataStore.getFilters<User>(
      {
        displayName: new RegExp(displayNameFilter)
      },
      [
        new SqlExpression('displayName LIKE :displayNameFilter', {
          displayNameFilter: `%${displayNameFilter}%`
        })
      ]
    );

    return this.dataStore.getEntitiesByFilters(
      User,
      filters,
      {
        ...postQueryOperations,
        includeResponseFields: ['_id', 'displayName', 'city', 'imageDataUri']
      },
      false
    );
  }

  @AllowForEveryUser()
  getUser({ _id }: _Id): PromiseErrorOr<One<User>> {
    return this.dataStore.getEntityById(User, _id, new DefaultPostQueryOperations(), false);
  }
}

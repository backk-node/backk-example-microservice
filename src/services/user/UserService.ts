import { Many, One, PromiseErrorOr, Service, _Id } from 'backk';
import GetUsersArg from './types/args/GetUsersArg';
import User from './types/entities/User';

export interface UserService extends Service {
  getUsers(arg: GetUsersArg): PromiseErrorOr<Many<User>>;
  getUser(arg: _Id): PromiseErrorOr<One<User>>;
}

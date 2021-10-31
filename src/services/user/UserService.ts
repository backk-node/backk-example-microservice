import { Many, One, PromiseErrorOr, _Id } from 'backk';
import GetUsersArg from './types/args/GetUsersArg';
import User from './types/entities/User';

export interface UserService {
  getUsers(arg: GetUsersArg): PromiseErrorOr<Many<User>>;
  getUser(arg: _Id): PromiseErrorOr<One<User>>;
}

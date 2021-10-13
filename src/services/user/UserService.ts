import { _Id, CrudEntityService, Many, One, PromiseErrorOr } from 'backk';
import GetUsersArg from './types/args/GetUsersArg';
import User from './types/entities/User';

export default abstract class UserService extends CrudEntityService {
  abstract getUsers(arg: GetUsersArg): PromiseErrorOr<Many<User>>;
  abstract getUser(arg: _Id): PromiseErrorOr<One<User>>;
}

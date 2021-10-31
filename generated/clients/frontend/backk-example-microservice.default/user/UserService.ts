// DO NOT MODIFY THIS FILE! This is an auto-generated file
import { callRemoteService, Many, One, PromiseErrorOr, _Id } from 'backk-frontend-utils';
import GetUsersArg from './/types/args/GetUsersArg';
import User from './types/entities/User';

export default class UserService {
  getUsers(getUsersArg: GetUsersArg): PromiseErrorOr<Many<User>> {
    return callRemoteService('backk-example-microservice', 'userService.getUsers', getUsersArg, 'default');
  }

  getUser(_id: _Id): PromiseErrorOr<One<User>> {
    return callRemoteService('backk-example-microservice', 'userService.getUser', _id, 'default');
  }
}

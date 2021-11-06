// DO NOT MODIFY THIS FILE! This is an auto-generated file
import { callRemoteService, Many, One, PromiseErrorOr, _Id } from 'backk-frontend-utils';
import EncryptionKeyManager from '../_backk/EncryptionKeyManager';
import GetUsersArg from './/types/args/GetUsersArg';
import User from './types/entities/User';

export default class UserService {
  static getUsers(getUsersArg: GetUsersArg): PromiseErrorOr<Many<User>> {
    return callRemoteService(
      'backk-example-microservice',
      'userService.getUsers',
      'other',
      getUsersArg,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static getUser(_id: _Id): PromiseErrorOr<One<User>> {
    return callRemoteService(
      'backk-example-microservice',
      'userService.getUser',
      'other',
      _id,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }
}

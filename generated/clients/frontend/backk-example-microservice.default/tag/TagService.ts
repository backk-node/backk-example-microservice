// DO NOT MODIFY THIS FILE! This is an auto-generated file
import { callRemoteService, Many, One, PromiseErrorOr } from 'backk-frontend-utils';
import EncryptionKeyManager from '../_backk/EncryptionKeyManager';
import TagName from './args/TagName';
import Tag from './entities/Tag';

export default class TagService {
  static createTag(tag: Tag): PromiseErrorOr<One<Tag>> {
    return callRemoteService(
      'backk-example-microservice',
      'tagService.createTag',
      'create',
      tag,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }

  static getTagsByName(tagName: TagName): PromiseErrorOr<Many<Tag>> {
    return callRemoteService(
      'backk-example-microservice',
      'tagService.getTagsByName',
      'other',
      tagName,
      'default',
      EncryptionKeyManager.accessTokenStorageEncryptionKey
    );
  }
}

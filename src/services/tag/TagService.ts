import { DbTableVersion, Many, One, PromiseErrorOr } from 'backk';
import TagName from './args/TagName';
import Tag from './entities/Tag';

export interface TagService {
  initializeDbVersion1(): PromiseErrorOr<One<DbTableVersion>>;
  migrateDbFromVersion1To2(): PromiseErrorOr<One<DbTableVersion>>;
  deleteAllTags(): PromiseErrorOr<null>;
  createTag(arg: Tag): PromiseErrorOr<One<Tag>>;
  getTagsByName(arg: TagName): PromiseErrorOr<Many<Tag>>;
}

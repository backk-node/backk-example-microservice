import { CrudEntityService, DbTableVersion, Many, One, PromiseErrorOr } from 'backk';
import Tag from './entities/Tag';
import TagName from './args/TagName';

export default abstract class TagService extends CrudEntityService {
  abstract initializeDbVersion1(): PromiseErrorOr<One<DbTableVersion>>;
  abstract migrateDbFromVersion1To2(): PromiseErrorOr<One<DbTableVersion>>;

  abstract deleteAllTags(): PromiseErrorOr<null>;
  abstract createTag(arg: Tag): PromiseErrorOr<One<Tag>>;
  abstract getTagsByName(arg: TagName): PromiseErrorOr<Many<Tag>>;
}

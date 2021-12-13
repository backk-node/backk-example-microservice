import {
  AllowForEveryUser,
  AllowForTests,
  CrudEntityService,
  DataStore,
  DbTableVersion,
  DefaultPostQueryOperationsImpl,
  ExecuteOnStartUp,
  Many,
  NoCaptcha,
  One,
  PromiseErrorOr,
  SqlFilter,
  tryGetSeparatedValuesFromTextFile,
} from 'backk';
import TagName from './args/TagName';
import Tag from './entities/Tag';
import { TagService } from './TagService';

export default class TagServiceImpl extends CrudEntityService implements TagService {
  constructor(dataStore: DataStore) {
    super({}, dataStore);
  }

  @ExecuteOnStartUp()
  initializeDbVersion1(): PromiseErrorOr<One<DbTableVersion>> {
    return this.dataStore.getEntityByFilters(
      DbTableVersion,
      { entityName: 'Tag' },
      new DefaultPostQueryOperationsImpl(),
      false,
      {
        ifEntityNotFoundReturn: () =>
          this.dataStore.createEntity(
            DbTableVersion,
            { entityName: 'Tag' },
            {
              preHooks: () =>
                this.dataStore.createEntities(
                  Tag,
                  tryGetSeparatedValuesFromTextFile('resources/tags1.txt').map((tagName) => ({
                    name: tagName,
                  }))
                ),
            }
          ),
      }
    );
  }

  @ExecuteOnStartUp()
  migrateDbFromVersion1To2(): PromiseErrorOr<One<DbTableVersion>> {
    return this.dataStore.getEntityByFilters(
      DbTableVersion,
      { entityName: 'Tag', version: 1 },
      new DefaultPostQueryOperationsImpl(),
      false,
      {
        ifEntityNotFoundReturn: () => Promise.resolve([null, null]),
        postHook: (tagDbTableVersion1) =>
          tagDbTableVersion1
            ? this.dataStore.updateEntity(DbTableVersion, tagDbTableVersion1, {
                preHooks: () =>
                  this.dataStore.createEntities(
                    Tag,
                    tryGetSeparatedValuesFromTextFile('resources/tags2.txt').map((tag) => ({
                      name: tag,
                    }))
                  ),
              })
            : true,
      }
    );
  }

  @AllowForTests()
  deleteAllTags(): PromiseErrorOr<null> {
    return this.dataStore.deleteAllEntities(Tag);
  }

  @AllowForEveryUser()
  @NoCaptcha('')
  createTag(tag: Tag): PromiseErrorOr<One<Tag>> {
    return this.dataStore.createEntity(Tag, tag);
  }

  @AllowForEveryUser()
  getTagsByName({ name }: TagName): PromiseErrorOr<Many<Tag>> {
    const filters = this.dataStore.getFilters<Tag>({ name: new RegExp(name) }, [
      new SqlFilter('name LIKE :name', { name: `%${name}%` }),
    ]);

    return this.dataStore.getEntitiesByFilters(Tag, filters, new DefaultPostQueryOperationsImpl(), false);
  }
}

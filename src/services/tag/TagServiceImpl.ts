import {
  AllowForEveryUser,
  AllowForTests,
  CrudEntityService,
  DataStore,
  DbTableVersion,
  DefaultPostQueryOperationsImpl,
  ExecuteOnStartUp,
  getSeparatedValuesFromTextFileOrThrow,
  Many,
  NoCaptcha,
  One,
  PromiseErrorOr,
  SqlFilter,
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
                  getSeparatedValuesFromTextFileOrThrow('tags1.txt').map((tagName: string) => ({
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
                    getSeparatedValuesFromTextFileOrThrow('tags2.txt').map((tagName: string) => ({
                      name: tagName,
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

  @AllowForEveryUser(false)
  @NoCaptcha('')
  createTag(tag: Tag): PromiseErrorOr<One<Tag>> {
    return this.dataStore.createEntity(Tag, tag);
  }

  @AllowForEveryUser(false)
  getTagsByName({ name }: TagName): PromiseErrorOr<Many<Tag>> {
    const filters = this.dataStore.getFilters<Tag>({ name: new RegExp(name) }, [
      new SqlFilter('name LIKE :name', { name: `%${name}%` }),
    ]);

    return this.dataStore.getEntitiesByFilters(Tag, filters, new DefaultPostQueryOperationsImpl(), false);
  }
}

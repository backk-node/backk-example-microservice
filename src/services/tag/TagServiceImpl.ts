import {
  AbstractDataStore,
  AllowForEveryUser,
  AllowForTests,
  DbTableVersion,
  DefaultPostQueryOperations,
  ExecuteOnStartUp,
  Many,
  NoCaptcha,
  One,
  PromiseErrorOr,
  SqlExpression,
  tryGetSeparatedValuesFromTextFile
} from 'backk';
import TagService from './TagService';
import Tag from './entities/Tag';
import TagName from './args/TagName';

export default class TagServiceImpl extends TagService {
  constructor(dataStore: AbstractDataStore) {
    super({}, dataStore);
  }

  @ExecuteOnStartUp()
  initializeDbVersion1(): PromiseErrorOr<One<DbTableVersion>> {
    return this.dataStore.getEntityByFilters(
      DbTableVersion,
      { entityName: 'Tag' },
      new DefaultPostQueryOperations(),
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
                    name: tagName
                  }))
                )
            }
          )
      }
    );
  }

  @ExecuteOnStartUp()
  migrateDbFromVersion1To2(): PromiseErrorOr<One<DbTableVersion>> {
    return this.dataStore.getEntityByFilters(
      DbTableVersion,
      { entityName: 'Tag', version: 1 },
      new DefaultPostQueryOperations(),
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
                      name: tag
                    }))
                  )
              })
            : true
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
      new SqlExpression('name LIKE :name', { name: `%${name}%` })
    ]);

    return this.dataStore.getEntitiesByFilters(Tag, filters, new DefaultPostQueryOperations(), false);
  }
}

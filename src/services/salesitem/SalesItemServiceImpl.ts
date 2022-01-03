import {
  AllowForEveryUser,
  AllowForEveryUserForOwnResources,
  AllowForMicroserviceInternalUse,
  AllowForTests,
  AllowServiceForUserRoles,
  CronJob,
  CrudEntityService,
  DataStore,
  DefaultPostQueryOperationsImpl,
  EntityCountRequest,
  executeForAll,
  Many,
  MongoDbFilter,
  NoCaptcha,
  One,
  PromiseErrorOr,
  sendToRemoteService,
  SqlEqFilter,
  SqlFilter,
  SqlInFilter,
  Subscription,
  subscriptionManager,
  Update,
  UserAccountId,
  _Id,
  _IdAndUserAccountId,
} from 'backk';
import dayjs from 'dayjs';
import getThumbnailImageDataUri from '../common/utils/getThumbnailImageDataUri';
import ShoppingCartOrOrderSalesItem from '../shoppingcart/types/entities/ShoppingCartOrOrderSalesItem';
import User from '../user/types/entities/User';
import { salesItemServiceErrors } from './errors/salesItemServiceErrors';
import { SalesItemService } from './SalesItemService';
import ChangeExpiredReservedSalesItemStatesToForSaleArg from './types/args/ChangeExpiredReservedSalesItemStatesToForSaleArg';
import DeleteOldUnsoldSalesItemsArg from './types/args/DeleteOldUnsoldSalesItemsArg';
import GetSalesItemsArg from './types/args/GetSalesItemsArg';
import GetSalesItemsByUserDefinedFiltersArg from './types/args/GetSalesItemsByUserDefinedFiltersArg';
import SalesItem from './types/entities/SalesItem';
import { SalesItemState } from './types/enums/SalesItemState';
import FollowedUserSalesItem from './types/responses/FollowedUserSalesItem';

@AllowServiceForUserRoles(['vitjaAdmin'])
export default class SalesItemServiceImpl extends CrudEntityService implements SalesItemService {
  private static readonly DEFAULT_SALES_ITEM_FIELDS = [
    '_id',
    'title',
    'price',
    'previousPrice',
    'primaryImageDataUri',
  ];

  constructor(dataStore: DataStore) {
    super(salesItemServiceErrors, dataStore);
  }

  @AllowForTests()
  deleteAllSalesItems(): PromiseErrorOr<null> {
    return this.dataStore.deleteAllEntities(SalesItem);
  }

  @AllowForEveryUserForOwnResources('userAccountId')
  @NoCaptcha('')
  async createSalesItem(salesItem: SalesItem): PromiseErrorOr<One<SalesItem>> {
    const [createdSalesItem, errorInCreate] = await this.dataStore.createEntity(
      SalesItem,
      {
        ...salesItem,
        state: 'forSale',
        previousPrice: null,
        primaryImageThumbnailDataUri: getThumbnailImageDataUri(salesItem.primaryImageDataUri),
        likeCount: 0,
      },
      {
        preHooks: {
          shouldSucceedOrBeTrue: async () => {
            const [usersSellableSalesItemCount, errorInGet] = await this.dataStore.getEntityCount(SalesItem, {
              userAccountId: salesItem.userAccountId,
              state: 'forSale',
            });

            return typeof usersSellableSalesItemCount === 'number'
              ? usersSellableSalesItemCount < 100
              : errorInGet;
          },
          error: salesItemServiceErrors.maximumSalesItemCountPerUserExceeded,
        },
      }
    );

    if (createdSalesItem) {
      subscriptionManager.publishToSubscribers(
        'salesItemService.subscribeToCreatedSalesItem',
        createdSalesItem.data
      );
    }

    return [createdSalesItem, errorInCreate];
  }

  @Subscription()
  @AllowForEveryUser()
  subscribeToCreatedSalesItem(): PromiseErrorOr<null> {
    return Promise.resolve([null, null]);
  }

  @AllowForEveryUser()
  getSalesItems({
    textFilter,
    areas,
    productDepartments,
    productCategories,
    productSubCategories,
    minPrice,
    maxPrice,
    ...sortingAndPagination
  }: GetSalesItemsArg): PromiseErrorOr<Many<SalesItem>> {
    const filters = this.dataStore.getFilters<SalesItem>(
      {
        state: 'forSale' as SalesItemState,
        ...(textFilter
          ? { $or: [{ title: new RegExp(textFilter) }, { description: new RegExp(textFilter) }] }
          : {}),
        ...(areas ? { area: { $in: areas } } : {}),
        ...(productDepartments ? { productDepartment: { $in: productDepartments } } : {}),
        ...(productCategories ? { productCategory: { $in: productCategories } } : {}),
        ...(productSubCategories ? { productSubCategory: { $in: productSubCategories } } : {}),
        ...(minPrice !== undefined || maxPrice
          ? {
              $and: [
                { price: { $gte: minPrice || 0 } },
                { price: { $lte: maxPrice || Number.MAX_SAFE_INTEGER } },
              ],
            }
          : {}),
      },
      [
        new SqlEqFilter({ state: 'forSale' }),
        new SqlFilter('title LIKE :textFilter OR description LIKE :textFilter', {
          textFilter: textFilter ? `%${textFilter}%` : undefined,
        }),
        new SqlInFilter('area', areas),
        new SqlInFilter('productDepartment', productDepartments),
        new SqlInFilter('productCategory', productCategories),
        new SqlInFilter('productSubCategory', productSubCategories),
        new SqlFilter('price >= :minPrice', { minPrice }),
        new SqlFilter('price <= :maxPrice', { maxPrice }),
      ]
    );

    return this.dataStore.getEntitiesByFilters(
      SalesItem,
      filters,
      {
        ...sortingAndPagination,
        includeResponseFields: SalesItemServiceImpl.DEFAULT_SALES_ITEM_FIELDS,
      },
      false,
      { entityCountRequests: [new EntityCountRequest('')] }
    );
  }

  @AllowForEveryUser()
  getSalesItemsByUserDefinedFilters({
    filters,
  }: GetSalesItemsByUserDefinedFiltersArg): PromiseErrorOr<Many<SalesItem>> {
    return this.dataStore.getEntitiesByFilters(
      SalesItem,
      filters,
      new DefaultPostQueryOperationsImpl(),
      false
    );
  }

  @AllowForEveryUserForOwnResources('_id')
  async getFollowedUsersSalesItems({
    userAccountId,
  }: UserAccountId): PromiseErrorOr<Many<FollowedUserSalesItem>> {
    const [user, error] = await this.dataStore.getEntityByFilters(
      User,
      {
        _id: userAccountId,
        'followedUserAccounts.ownSalesItems.state': 'forSale',
      },
      {
        sortBys: [
          {
            subEntityPath: 'followedUserAccounts.ownSalesItems',
            fieldName: 'lastModifiedTimestamp',
            sortDirection: 'DESC',
          },
        ],
        includeResponseFields: [
          'followedUserAccounts._id',
          'followedUserAccounts.displayName',
          ...SalesItemServiceImpl.DEFAULT_SALES_ITEM_FIELDS.map(
            (defaultSalesItemField) => `followedUserAccounts.ownSalesItems.${defaultSalesItemField}`
          ),
        ],
      },
      false
    );

    const followedUserSalesItems = user?.data.followedUserAccounts.flatMap((followedUserAccount) =>
      followedUserAccount.ownSalesItems.map((ownSalesItem) => ({
        ...ownSalesItem,
        userAccountId: followedUserAccount._id,
        displayName: followedUserAccount.displayName,
      }))
    );

    return [
      {
        metadata: { currentPageTokens: undefined },
        data: followedUserSalesItems ?? [],
      },
      error,
    ];
  }

  @AllowForEveryUser()
  getSalesItem({ _id }: _Id): PromiseErrorOr<One<SalesItem>> {
    return this.dataStore.getEntityById(SalesItem, _id, new DefaultPostQueryOperationsImpl(), false);
  }

  @AllowForEveryUserForOwnResources('userAccountId')
  @Update('addOrRemove')
  followSalesItemPriceChange({ _id, userAccountId }: _IdAndUserAccountId): PromiseErrorOr<null> {
    return this.dataStore.addArrayFieldValuesToEntityById(
      'priceChangeFollowingUserAccountIds',
      [userAccountId],
      SalesItem,
      _id
    );
  }

  @AllowForEveryUserForOwnResources('userAccountId')
  @Update('addOrRemove')
  unfollowSalesItemPriceChange({ _id, userAccountId }: _IdAndUserAccountId): PromiseErrorOr<null> {
    return this.dataStore.removeArrayFieldValuesFromEntityById(
      'priceChangeFollowingUserAccountIds',
      [userAccountId],
      SalesItem,
      _id
    );
  }

  @AllowForEveryUserForOwnResources('userAccountId')
  @Update('addOrRemove')
  toggleLikeSalesItem({ _id, userAccountId }: _IdAndUserAccountId): PromiseErrorOr<null> {
    return this.dataStore.executeInsideTransaction(async () => {
      const [isLiked, error] = await this.dataStore.doesArrayFieldContainValueInEntityById(
        'likedUserAccountIds',
        userAccountId,
        SalesItem,
        _id
      );

      if (isLiked === true) {
        return this.dataStore.removeArrayFieldValuesFromEntityById(
          'likedUserAccountIds',
          [userAccountId],
          SalesItem,
          _id,
          {
            entityPreHooks: ({ likeCount, version }) =>
              this.dataStore.updateEntity(SalesItem, { _id, version, likeCount: likeCount - 1 }),
          }
        );
      } else if (isLiked === false) {
        return this.dataStore.addArrayFieldValuesToEntityById(
          'likedUserAccountIds',
          [userAccountId],
          SalesItem,
          _id,
          {
            entityPreHooks: ({ likeCount, version }) =>
              this.dataStore.updateEntity(SalesItem, { _id, version, likeCount: likeCount + 1 }),
          }
        );
      }

      return [null, error];
    });
  }

  @AllowForEveryUserForOwnResources('userAccountId')
  updateSalesItem(salesItem: SalesItem): PromiseErrorOr<null> {
    let isPriceUpdated: boolean;

    return this.dataStore.updateEntity(SalesItem, salesItem, {
      entityPreHooks: [
        {
          shouldSucceedOrBeTrue: ({ state }) => state === 'forSale',
          error: salesItemServiceErrors.salesItemStateIsNotForSale,
        },
        ({ _id, price }) => {
          if (salesItem.price !== price) {
            isPriceUpdated = true;
            return this.dataStore.updateEntity(SalesItem, { _id, previousPrice: price });
          }
          return true;
        },
      ],
      postHook: {
        executePostHookIf: () => isPriceUpdated,
        shouldSucceedOrBeTrue: () =>
          sendToRemoteService(
            'kafka',
            'notification-service',
            'salesItemNotificationService.sendPriceChangeNotifications',
            {
              salesItemId: salesItem._id,
              salesItemTitle: salesItem.title,
              salesItemNewPrice: salesItem.price,
              userAccountIdsToNotify: salesItem.priceChangeFollowingUserAccountIds,
            }
          ),
      },
    });
  }

  @CronJob({ minuteInterval: 1 })
  changeExpiredReservedSalesItemStatesToForSale({
    maxSalesItemReservationDurationInMinutes,
  }: ChangeExpiredReservedSalesItemStatesToForSaleArg): PromiseErrorOr<null> {
    const filters = this.dataStore.getFilters(
      {
        state: 'reserved',
        lastModifiedTimestamp: {
          $lte: dayjs().subtract(maxSalesItemReservationDurationInMinutes, 'minutes').toDate(),
        },
      },
      [
        new SqlEqFilter({ state: 'reserved' }),
        new SqlFilter(
          `lastmodifiedtimestamp <= current_timestamp - INTERVAL '${maxSalesItemReservationDurationInMinutes}' minute`
        ),
      ]
    );

    return this.dataStore.updateEntitiesByFilters<SalesItem>(SalesItem, filters, {
      state: 'forSale',
      buyerUserAccountId: null,
    });
  }

  @CronJob({ minutes: 0, hours: 2 })
  deleteOldUnsoldSalesItemsDaily({
    deletableUnsoldSalesItemMinAgeInMonths,
  }: DeleteOldUnsoldSalesItemsArg): PromiseErrorOr<null> {
    const filters = this.dataStore.getFilters(
      {
        state: 'forSale',
        createdAtTimestamp: {
          $lte: dayjs().subtract(deletableUnsoldSalesItemMinAgeInMonths, 'months').toDate(),
        },
      },
      [
        new SqlEqFilter({ state: 'forSale' }),
        new SqlFilter(
          `createdattimestamp <= current_timestamp - INTERVAL '${deletableUnsoldSalesItemMinAgeInMonths}' month`
        ),
      ]
    );

    return this.dataStore.deleteEntitiesByFilters(SalesItem, filters);
  }

  @AllowForEveryUserForOwnResources('userAccountId')
  deleteSalesItem({ _id }: _Id): PromiseErrorOr<null> {
    return this.dataStore.deleteEntityById(SalesItem, _id);
  }

  @AllowForMicroserviceInternalUse()
  updateSalesItemStates(
    salesItems: ShoppingCartOrOrderSalesItem[],
    newState: SalesItemState,
    requiredCurrentState?: SalesItemState,
    buyerUserAccountId?: string
  ): PromiseErrorOr<null> {
    return executeForAll(salesItems, ({ _id }) =>
      this.updateSalesItemState(_id, newState, requiredCurrentState, buyerUserAccountId)
    );
  }

  @AllowForMicroserviceInternalUse()
  updateSalesItemState(
    _id: string,
    newState: SalesItemState,
    requiredCurrentState?: SalesItemState,
    buyerUserAccountId?: string
  ): PromiseErrorOr<null> {
    return this.dataStore.updateEntity(
      SalesItem,
      {
        _id,
        state: newState,
        buyerUserAccountId: newState === 'forSale' ? null : buyerUserAccountId,
      },
      {
        entityPreHooks: [
          {
            executePreHookIf: () => !!requiredCurrentState,
            shouldSucceedOrBeTrue: ({ state }) => requiredCurrentState === state,
            error: salesItemServiceErrors.invalidSalesItemState,
          },
          {
            executePreHookIf: () => newState === 'sold',
            shouldSucceedOrBeTrue: ({ buyerUserAccountId: currentBuyerUserAccountId }) =>
              buyerUserAccountId === currentBuyerUserAccountId,
            error: salesItemServiceErrors.invalidSalesItemState,
          },
        ],
      }
    );
  }

  @AllowForMicroserviceInternalUse()
  updateSalesItemStatesByFilters(
    salesItemIds: string[],
    newState: SalesItemState,
    currentStateFilter: SalesItemState,
    buyerUserAccountIdFilter: string
  ): PromiseErrorOr<null> {
    const finalFilters = this.dataStore.getFilters(
      [
        new MongoDbFilter({
          _id: { $in: salesItemIds },
          state: currentStateFilter,
          buyerUserAccountId: buyerUserAccountIdFilter,
        }),
      ],
      [
        new SqlInFilter('_id', salesItemIds),
        new SqlEqFilter({ state: currentStateFilter, buyerUserAccountId: buyerUserAccountIdFilter }),
      ]
    );

    return this.dataStore.updateEntitiesByFilters<SalesItem>(SalesItem, finalFilters, { state: newState });
  }
}

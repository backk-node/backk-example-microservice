# Vitja - Backk Example Microservice

This version of Vitja Microservice contains multiple services which could be divided into multiple microservices.
There will later this same example divided into multiple microservices once support for distributed transactions is available in Backk.
Backk does not really care if your microservice is really a microservice or more like a mini-service, macro-service or monolith.

Vitja is an example Backk microservice. It offers a full-featured digital second hand marketplace for users to sell their
second hand items. Users can add their own sales items and browse others' sales items. Users can follow other users, like their sales items and
follow sales items for price changes. Users can add/remove sales item to/from shopping cart and place orders.
Vitja will also track the order delivery and possible order return process.

Vitja is written to work with a SQL database (PostgreSQL, MySQL, MariaDB and any other databases compatible with those) and MongoDB.
You can just change the data store in the src/microservice.ts file to use a different database.
By default, Vitja uses MySql.

## Running the Microservice
1. Complete the [Prerequisites](https://github.com/backk-node/backk/blob/main/docs/PREREQUISITES.MD)
2. Clone this repository to a local directory
3. Run `npm install`
4. Generate the [OpenAPI 3](https://swagger.io/specification/) API specs for your API implementation with following command:
   ```bash
   npm run generateApiSpecs
   ```
5. Run `npm start:dev`
6. You can use the microservice API using [Postman](https://www.postman.com/downloads/) or [SwaggerHub](https://app.swaggerhub.com/home)  
   For Postman:
    1. Launch Postman
    2. Choose `Import` and then choose file `generated/openapi/openApiPublicSpec.yaml`

   For SwaggerHub:
    1. Navigate to [SwaggerHub](https://app.swaggerhub.com/home)
    2. Choose `Create New` and then `Import and Document API` and then choose file `generated/openapi/openApiPublicSpec.yaml`
7. Backk automatically generates some integration tests, and they can be run with following command:
   ```bash
   # NOTE! You need to have the microservice running before executing the integration tests,
   # so ensure you have run 'npm run start:dev' before running the below command
   
   npm run integrationtest:dev
   ```
   You can also import the integration tests to Postman from file `generated/integrationtests/integrationTestsPostmanCollection.json`

## Service of the Vitja Microservice

### UserAccountService

```ts
interface UserAccountService extends UserService {
  deleteAllUserAccounts(): PromiseErrorOr<null>;
  createUserAccount(arg: UserAccount): PromiseErrorOr<One<UserAccount>>;
  getIdBySubject(arg: Subject): PromiseErrorOr<One<_Id>>;
  getUserAccount(arg: GetUserAccountArg): PromiseErrorOr<One<UserAccount>>;
  followUser(arg: _IdAndFollowedUserAccountId): PromiseErrorOr<null>;
  unfollowUser(arg: _IdAndFollowedUserAccountId): PromiseErrorOr<null>;
  addToFavoriteSalesItems(arg: _IdAndSalesItemId): PromiseErrorOr<null>;
  removeFromFavoriteSalesItems(arg: _IdAndSalesItemId): PromiseErrorOr<null>;
  updateUserAccount(arg: UserAccount): PromiseErrorOr<null>;
  deleteUserAccount(arg: _Id): PromiseErrorOr<null>;

  getCities(): PromiseErrorOr<Many<Value>>;
}
```

### UserService

```ts
interface UserService extends Service {
  getUsers(arg: GetUsersArg): PromiseErrorOr<Many<User>>;
  getUser(arg: _Id): PromiseErrorOr<One<User>>;
}
```

### TagService

```ts
interface TagService extends Service {
  initializeDbVersion1(): PromiseErrorOr<One<DbTableVersion>>;
  migrateDbFromVersion1To2(): PromiseErrorOr<One<DbTableVersion>>;
  deleteAllTags(): PromiseErrorOr<null>;
  createTag(arg: Tag): PromiseErrorOr<One<Tag>>;
  getTagsByName(arg: TagName): PromiseErrorOr<Many<Tag>>;
}
```

### SalesItemService

```ts
interface SalesItemService extends Service {
  deleteAllSalesItems(): PromiseErrorOr<null>;
  createSalesItem(arg: SalesItem): PromiseErrorOr<One<SalesItem>>;
  subscribeToCreatedSalesItem(): PromiseErrorOr<null>;
  getSalesItems(arg: GetSalesItemsArg): PromiseErrorOr<Many<SalesItem>>;

  getSalesItemsByUserDefinedFilters(
    arg: GetSalesItemsByUserDefinedFiltersArg
  ): PromiseErrorOr<Many<SalesItem>>;

  getFollowedUsersSalesItems(arg: UserAccountId): PromiseErrorOr<Many<FollowedUserSalesItem>>;
  getSalesItem(arg: _Id): PromiseErrorOr<One<SalesItem>>;
  followSalesItemPriceChange(arg: _IdAndUserAccountId): PromiseErrorOr<null>;
  unfollowSalesItemPriceChange(arg: _IdAndUserAccountId): PromiseErrorOr<null>;
  toggleLikeSalesItem(arg: _IdAndUserAccountId): PromiseErrorOr<null>;
  updateSalesItem(arg: SalesItem): PromiseErrorOr<null>;

  changeExpiredReservedSalesItemStatesToForSale(
    arg: ChangeExpiredReservedSalesItemStatesToForSaleArg
  ): PromiseErrorOr<null>;

  deleteOldUnsoldSalesItemsDaily(arg: DeleteOldUnsoldSalesItemsArg): PromiseErrorOr<null>;
  deleteSalesItem(arg: _Id): PromiseErrorOr<null>;

  updateSalesItemStates(
    salesItems: ShoppingCartOrOrderSalesItem[],
    newState: SalesItemState,
    requiredCurrentState?: SalesItemState,
    buyerUserAccountId?: string
  ): PromiseErrorOr<null>;

  updateSalesItemState(
    _id: string,
    newState: SalesItemState,
    requiredCurrentState?: SalesItemState,
    buyerUserAccountId?: string | null
  ): PromiseErrorOr<null>;

  updateSalesItemStatesByFilters(
    salesItemIds: string[],
    newState: SalesItemState,
    currentStateFilter: SalesItemState,
    buyerUserAccountIdFilter: string
  ): PromiseErrorOr<null>;
}
```

### ShoppingCartService

```ts
interface ShoppingCartService extends Service {
  deleteAllShoppingCarts(): PromiseErrorOr<null>;
  getShoppingCart(arg: UserAccountId): PromiseErrorOr<One<ShoppingCart>>;
  addToShoppingCart(arg: UserAccountIdAndSalesItemId): PromiseErrorOr<null>;
  removeFromShoppingCart(arg: UserAccountIdAndSalesItemId): PromiseErrorOr<null>;
  emptyShoppingCart(arg: UserAccountId): PromiseErrorOr<null>;
  deleteShoppingCart(arg: UserAccountId): PromiseErrorOr<null>;

  getShoppingCartOrErrorIfEmpty(
    userAccountId: string,
    error: ErrorDefinition
  ): PromiseErrorOr<One<ShoppingCart>>;
}
```

### OrderService

```ts
interface OrderService extends Service {
  deleteAllOrders(): PromiseErrorOr<null>;
  placeOrder(arg: PlaceOrderArg): PromiseErrorOr<One<Order>>;
  getOrder(arg: _Id): PromiseErrorOr<One<Order>>;
  discardUnpaidOrder(arg: _Id): PromiseErrorOr<null>;
  payOrder(arg: PayOrderArg): PromiseErrorOr<null>;
  removeUndeliveredOrderItem(arg: RemoveOrderItemArg): PromiseErrorOr<null>;
  deleteUndeliveredPaidOrder(arg: _Id): PromiseErrorOr<null>;
  deliverOrderItem(arg: DeliverOrderItemArg): PromiseErrorOr<null>;
  receiveOrderItem(arg: _IdAndOrderItemId): PromiseErrorOr<null>;
  returnOrderItem(arg: _IdAndOrderItemId): PromiseErrorOr<null>;
  receiveReturnedOrderItem(arg: _IdAndOrderItemId): PromiseErrorOr<null>;
  deleteUnpaidOrders(arg: DeleteUnpaidOrdersArg): PromiseErrorOr<null>;
}
```

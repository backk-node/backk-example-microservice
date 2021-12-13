import { DefaultPostQueryOperationsImpl, SortBy } from 'backk';

export default class GetUserAccountArg extends DefaultPostQueryOperationsImpl {
  excludeResponseFields: string[] = [
    'ownSalesItems.primaryImageDataUri',
    'followedUserAccounts.ownSalesItems',
  ];

  sortBys: SortBy[] = [
    ...new DefaultPostQueryOperationsImpl().sortBys,
    new SortBy('paymentMethods', 'isDefault', 'DESC'),
    new SortBy('ownSalesItems', 'state', 'ASC'),
  ];
}

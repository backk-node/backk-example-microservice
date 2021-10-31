// DO NOT MODIFY THIS FILE! This is an auto-generated file
import { DefaultPostQueryOperations, SortBy } from 'backk-frontend-utils';

export default class GetUserAccountArg extends DefaultPostQueryOperations {
  excludeResponseFields: string[] = [
    'ownSalesItems.primaryImageDataUri',
    'followedUserAccounts.ownSalesItems',
  ];

  sortBys: SortBy[] = [
    ...new DefaultPostQueryOperations().sortBys,
    new SortBy('paymentMethods', 'isDefault', 'DESC'),
    new SortBy('ownSalesItems', 'state', 'ASC'),
  ];
}

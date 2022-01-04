// DO NOT MODIFY THIS FILE! This is an auto-generated file
import {
  DefaultPostQueryOperationsImpl,
  IsInstance,
  IsString,
  SortBy,
  Type,
  ValidateNested,
} from 'backk-frontend-utils';

export default class GetUserAccountArg extends DefaultPostQueryOperationsImpl {
  @IsString({
    each: true,
  })
  excludeResponseFields: string[] = [
    'ownSalesItems.primaryImageDataUri',
    'followedUserAccounts.ownSalesItems',
  ];

  @IsInstance(SortBy, {
    each: true,
  })
  @ValidateNested({
    each: true,
  })
  @Type(() => SortBy)
  sortBys: SortBy[] = [
    ...new DefaultPostQueryOperationsImpl().sortBys,
    new SortBy('paymentMethods', 'isDefault', 'DESC'),
    new SortBy('ownSalesItems', 'state', 'ASC'),
  ];
}

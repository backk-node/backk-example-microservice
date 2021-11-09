// DO NOT MODIFY THIS FILE! This is an auto-generated file
import { ArrayMaxSize, ArrayMinSize, IsInstance, UserDefinedFilter } from 'backk-frontend-utils';

export default class GetSalesItemsByUserDefinedFiltersArg {
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsInstance(UserDefinedFilter, {
    each: true,
    argument: '__backk_argument__',
  })
  filters!: UserDefinedFilter[];
}

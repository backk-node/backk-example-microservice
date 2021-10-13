import { ArrayMaxSize, ArrayMinSize, TestValue, UserDefinedFilter } from 'backk';

export default class GetSalesItemsByUserDefinedFiltersArg {
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @TestValue([
    {
      fieldName: 'title',
      operator: '=',
      value: 'abc'
    }
  ])
  filters!: UserDefinedFilter[];
}

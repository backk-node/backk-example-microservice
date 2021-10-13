import { IsInt, MinMax, TestValue } from 'backk';

export default class DeleteOldUnsoldSalesItemsArg {
  @IsInt()
  @MinMax(-1, 12)
  @TestValue(-1)
  deletableUnsoldSalesItemMinAgeInMonths: number = 4;
}

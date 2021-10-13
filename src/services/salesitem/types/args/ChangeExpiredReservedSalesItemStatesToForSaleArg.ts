import { IsInt, MinMax, TestValue } from 'backk';

export default class ChangeExpiredReservedSalesItemStatesToForSaleArg {
  @IsInt()
  @MinMax(-1, 15)
  @TestValue(-1)
  maxSalesItemReservationDurationInMinutes: number = 15;
}

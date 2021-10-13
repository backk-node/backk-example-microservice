import { IsInt, MinMax, TestValue } from 'backk';

export default class DeleteUnpaidOrdersArg {
  @IsInt()
  @MinMax(-1, 10)
  @TestValue(-1)
  unpaidOrderTimeToLiveInMinutes: number = 10;
}

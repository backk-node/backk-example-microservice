// DO NOT MODIFY THIS FILE! This is an auto-generated file
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsAlphanumeric,
  IsExternalId,
  IsFloat,
  Lengths,
  MaxLength,
  MinMax,
  ReadWrite,
  Values,
  _IdAndVersionAndCreatedAtTimestampAndLastModifiedTimestampAndUserAccountId,
} from 'backk-frontend-utils';
import { PaymentGateway } from '../enum/PaymentGateway';
import OrderItem from './OrderItem';

export default class Order extends _IdAndVersionAndCreatedAtTimestampAndLastModifiedTimestampAndUserAccountId {
  @ArrayMinSize(1)
  @ArrayMaxSize(Values._50)
  @ReadWrite()
  orderItems!: OrderItem[];

  @ReadWrite()
  paymentGateway: PaymentGateway = 'Paytrail';

  @MaxLength(Lengths._256)
  @IsAlphanumeric()
  @IsExternalId()
  @ReadWrite()
  transactionId!: string | null;

  @ReadWrite()
  transactionTimestamp!: Date | null;

  @IsFloat(2)
  @MinMax(0, Values._1B)
  @ReadWrite()
  paymentAmount!: number | null;
}

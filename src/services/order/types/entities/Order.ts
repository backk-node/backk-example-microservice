import {
  _IdAndVersionAndCreatedAtTimestampAndLastModifiedTimestampAndUserAccountId,
  ArrayMaxSize,
  ArrayMinSize,
  IsAlphanumeric,
  MaxLength,
  Entity,
  IsExternalId,
  IsFloat,
  Lengths,
  MinMax,
  OneToMany,
  Values,
  ReadWrite
} from 'backk';
import OrderItem from './OrderItem';
import { PaymentGateway } from '../enum/PaymentGateway';

@Entity()
export default class Order extends _IdAndVersionAndCreatedAtTimestampAndLastModifiedTimestampAndUserAccountId {
  @ArrayMinSize(1)
  @ArrayMaxSize(Values._50)
  @OneToMany()
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

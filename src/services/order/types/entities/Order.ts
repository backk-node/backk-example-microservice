import {
  ArrayMaxSize,
  ArrayMinSize,
  Entity,
  IsAlphanumeric,
  IsExternalId,
  IsFloat,
  Lengths,
  MaxLength,
  MinMax,
  OneToMany,
  ReadWrite,
  Values,
  _IdAndVersionAndCreatedAtTimestampAndLastModifiedTimestampAndUserAccountId,
} from 'backk';
import { PaymentGateway } from '../enum/PaymentGateway';
import OrderItem from './OrderItem';

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

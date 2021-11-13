// DO NOT MODIFY THIS FILE! This is an auto-generated file
import {
  IsAlphanumeric,
  IsFloat,
  IsIn,
  IsStringOrObjectId,
  IsUndefined,
  Lengths,
  MaxLength,
  MaxLengthAndMatches,
  MinMax,
  Type,
  Values,
} from 'backk-frontend-utils';
import { PaymentGateway } from '../enum/PaymentGateway';

export default class PayOrderArg {
  constructor() {
    this._id = '';
    this.paymentGateway = 'Paytrail';
    this.transactionId = '';
    this.transactionTimestamp = new Date();
    this.paymentAmount = 0;
  }

  @IsUndefined({
    groups: ['__backk_create__'],
  })
  @IsStringOrObjectId({
    groups: ['__backk_update__'],
  })
  @MaxLengthAndMatches(24, /^[a-f\d]{1,24}$/, {
    groups: ['__backk_update__'],
  })
  _id!: string | undefined;

  @IsIn(['Paytrail', 'PayPal', 'Klarna'])
  paymentGateway: PaymentGateway = 'Paytrail';

  @MaxLength(Lengths._256)
  @IsAlphanumeric()
  transactionId!: string;

  @Type(() => Date)
  transactionTimestamp!: Date;

  @IsFloat(2)
  @MinMax(0, Values._1B)
  paymentAmount!: number;
}

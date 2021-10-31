// DO NOT MODIFY THIS FILE! This is an auto-generated file
// This is an auto-generated file from the respective .type file
// DO NOT MODIFY THIS FILE! Updates should be made to the respective .type file only
// This file can be generated from the respective .type file by running npm script 'generateTypes'
import {
  IsAlphanumeric,
  IsExternalId,
  IsFloat,
  IsStringOrObjectId,
  IsUndefined,
  Lengths,
  MaxLength,
  MaxLengthAndMatches,
  MinMax,
  ReadUpdate,
  ReadWrite,
  Values,
} from 'backk-frontend-utils';
import { PaymentGateway } from '../enum/PaymentGateway';

export default class PayOrderArg {
  @IsUndefined({
    groups: ['__backk_create__'],
  })
  @IsStringOrObjectId({
    groups: ['__backk_update__'],
  })
  @MaxLengthAndMatches(24, /^[a-f\d]{1,24}$/, {
    groups: ['__backk_update__'],
  })
  @ReadUpdate()
  _id!: string;

  @ReadWrite()
  paymentGateway: PaymentGateway = 'Paytrail';

  @MaxLength(Lengths._256)
  @IsAlphanumeric()
  @IsExternalId()
  @ReadWrite()
  transactionId!: string;

  @ReadWrite()
  transactionTimestamp!: Date;

  @IsFloat(2)
  @MinMax(0, Values._1B)
  @ReadWrite()
  paymentAmount!: number;
}

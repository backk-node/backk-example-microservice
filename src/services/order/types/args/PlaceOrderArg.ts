// This is an auto-generated file from the respective .type file
// DO NOT MODIFY THIS FILE! Updates should be made to the respective .type file only
// This file can be generated from the respective .type file by running npm script 'generateTypes'

import {
  IsStringOrObjectId,
  IsUrl,
  Lengths,
  MaxLength,
  MaxLengthAndMatches,
  NotUnique,
  ReadWrite,
} from 'backk';
import { PaymentGateway } from '../enum/PaymentGateway';

export default class PlaceOrderArg {
  @IsStringOrObjectId()
  @MaxLengthAndMatches(24, /^[a-f\d]{1,24}$/)
  @NotUnique()
  @ReadWrite()
  userAccountId!: string;

  @ReadWrite()
  paymentGateway: PaymentGateway = 'Paytrail';

  shoppingCartId!: string;

  iAgreeWithTermsAndConditions!: boolean;

  @MaxLength(Lengths._4K)
  @IsUrl()
  uiRedirectUrl!: string;
}

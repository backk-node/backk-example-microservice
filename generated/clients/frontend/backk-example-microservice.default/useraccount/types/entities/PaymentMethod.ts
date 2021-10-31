// DO NOT MODIFY THIS FILE! This is an auto-generated file
import {
  Id,
  IsCreditCard,
  IsCreditCardExpiration,
  IsCreditCardVerificationCode,
  ReadWrite,
} from 'backk-frontend-utils';

export default class PaymentMethod extends Id {
  @ReadWrite()
  isDefault!: boolean;

  @ReadWrite()
  paymentMethodType!: 'creditCard';

  @IsCreditCard()
  @ReadWrite()
  creditCardNumber!: string;

  @IsCreditCardExpiration()
  @ReadWrite()
  creditCardExpiration!: string;

  @IsCreditCardVerificationCode()
  @ReadWrite()
  cardVerificationCode!: string;
}

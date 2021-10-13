import {
  Entity,
  Id,
  IsCreditCard,
  IsCreditCardExpiration,
  IsCreditCardVerificationCode,
  NotUnique,
  ReadWrite,
  TestValue
} from 'backk';

@Entity()
export default class PaymentMethod extends Id {
  @TestValue(true)
  @ReadWrite()
  isDefault!: boolean;

  @ReadWrite()
  paymentMethodType!: 'creditCard';

  @IsCreditCard()
  @NotUnique()
  @ReadWrite()
  creditCardNumber!: string;

  @IsCreditCardExpiration()
  @NotUnique()
  @ReadWrite()
  creditCardExpiration!: string;

  @IsCreditCardVerificationCode()
  @NotUnique()
  @ReadWrite()
  cardVerificationCode!: string;
}

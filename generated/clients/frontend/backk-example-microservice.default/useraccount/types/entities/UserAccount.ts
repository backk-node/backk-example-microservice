// DO NOT MODIFY THIS FILE! This is an auto-generated file
import {
  ArrayMaxSize,
  ArrayMinSize,
  BaseUserAccount,
  IsAnyString,
  IsDataUri,
  IsEmail,
  IsOneOf,
  IsPhoneNumber,
  IsPostalCode,
  Lengths,
  MaxLength,
  ReadOnly,
  ReadWrite,
  ShouldBeTrueForObject,
} from 'backk-frontend-utils';
import _ from 'lodash';
import Order from '../../../order/types/entities/Order';
import FavoriteSalesItem from '../../../salesitem/types/entities/FavoriteSalesItem';
import OwnSalesItem from '../../../salesitem/types/entities/OwnSalesItem';
import getCities from '../../validation/getCities';
import FollowedUserAccount from './FollowedUserAccount';
import FollowingUserAccount from './FollowingUserAccount';
import PaymentMethod from './PaymentMethod';

export default class UserAccount extends BaseUserAccount {
  @MaxLength(Lengths._128)
  @IsAnyString()
  @ReadWrite()
  displayName!: string;

  @MaxLength(Lengths._64)
  @IsAnyString()
  @ReadWrite()
  firstName!: string;

  @MaxLength(Lengths._64)
  @IsAnyString()
  @ReadWrite()
  lastName!: string;

  @IsEmail()
  @ReadWrite()
  email!: string;

  /* this is an example of property documentation */

  @MaxLength(Lengths._512)
  @IsAnyString()
  @ReadWrite()
  streetAddress!: string;

  @IsPostalCode('FI')
  @ReadWrite()
  postalCode!: string;

  @MaxLength(Lengths._256)
  @IsOneOf(getCities, 'userAccountsService.getCities', 'Tampere')
  @ReadWrite()
  city!: string;

  @IsPhoneNumber('FI')
  @ReadWrite()
  phoneNumber!: string;

  @ReadOnly()
  commissionDiscountPercentage!: 0 | 25 | 50;

  @MaxLength(Lengths._10M)
  @IsDataUri()
  @ReadWrite()
  imageDataUri!: string;

  @ArrayMinSize(0)
  @ArrayMaxSize(10)
  @ShouldBeTrueForObject<UserAccount>(
    ({ paymentMethods }) => paymentMethods.filter(({ isDefault }) => isDefault).length === 1,
    'There should be exactly one default payment method'
  )
  @ShouldBeTrueForObject<UserAccount>(
    ({ paymentMethods }) =>
      _.uniqBy(paymentMethods, ({ creditCardNumber }) => creditCardNumber).length === paymentMethods.length,
    'Credit card numbers in payment methods must be unique'
  )
  @ReadWrite()
  paymentMethods!: PaymentMethod[];

  @ReadOnly()
  favoriteSalesItems!: FavoriteSalesItem[];

  @ReadOnly()
  ownSalesItems!: OwnSalesItem[];

  @ReadOnly()
  orders!: Order[];

  @ReadOnly()
  followedUserAccounts!: FollowedUserAccount[];

  @ReadOnly()
  followingUserAccounts!: FollowingUserAccount[];
}

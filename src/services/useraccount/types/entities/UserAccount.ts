import {
  ArrayMaxSize,
  ArrayMinSize,
  BaseUserAccount,
  Entity,
  IsAnyString,
  IsDataUri,
  IsEmail,
  IsOneOf,
  IsPhoneNumber,
  IsPostalCode,
  Lengths,
  ManyToMany,
  MaxLength,
  NotEncrypted,
  NotUnique,
  OneToMany,
  Private,
  ReadOnly,
  ReadWrite,
  ShouldBeTrueForObject,
} from 'backk';
import uniqBy from 'lodash/uniqBy';
import Order from '../../../order/types/entities/Order';
import FavoriteSalesItem from '../../../salesitem/types/entities/FavoriteSalesItem';
import OwnSalesItem from '../../../salesitem/types/entities/OwnSalesItem';
import getCities from '../../validation/getCities';
import FollowedUserAccount from './FollowedUserAccount';
import FollowingUserAccount from './FollowingUserAccount';
import PaymentMethod from './PaymentMethod';

@Entity()
export default class UserAccount extends BaseUserAccount {
  @MaxLength(Lengths._128)
  @IsAnyString()
  @ReadWrite()
  @NotUnique()
  @NotEncrypted('Display name is queried with wild cards')
  displayName!: string;

  @MaxLength(Lengths._64)
  @IsAnyString()
  @ReadWrite()
  @NotUnique()
  firstName!: string;

  @MaxLength(Lengths._64)
  @IsAnyString()
  @ReadWrite()
  @NotUnique()
  lastName!: string;

  @IsEmail()
  @ReadWrite()
  @NotUnique()
  email!: string;

  /* this is an example of property documentation */
  @MaxLength(Lengths._512)
  @IsAnyString()
  @NotUnique()
  @ReadWrite()
  streetAddress!: string;

  @IsPostalCode('FI')
  @NotUnique()
  @ReadWrite()
  postalCode!: string;

  @MaxLength(Lengths._256)
  @IsOneOf(getCities, 'userAccountsService.getCities', 'Tampere')
  @NotUnique()
  @ReadWrite()
  city!: string;

  @IsPhoneNumber('FI')
  @NotUnique()
  @ReadWrite()
  phoneNumber!: string;

  @ReadOnly()
  commissionDiscountPercentage!: 0 | 25 | 50;

  @MaxLength(Lengths._10M)
  @IsDataUri()
  @NotUnique()
  @ReadWrite()
  imageDataUri!: string;

  @Private()
  isLocked!: boolean;

  @ArrayMinSize(0)
  @ArrayMaxSize(10)
  @OneToMany()
  @ShouldBeTrueForObject<UserAccount>(
    ({ paymentMethods }) => paymentMethods.filter(({ isDefault }) => isDefault).length === 1,
    'There should be exactly one default payment method'
  )
  @ShouldBeTrueForObject<UserAccount>(
    ({ paymentMethods }) =>
      uniqBy(paymentMethods, ({ creditCardNumber }) => creditCardNumber).length === paymentMethods.length,
    'Credit card numbers in payment methods must be unique'
  )
  @ReadWrite()
  paymentMethods!: PaymentMethod[];

  @ManyToMany()
  @ReadOnly()
  favoriteSalesItems!: FavoriteSalesItem[];

  @OneToMany(true)
  @ReadOnly()
  ownSalesItems!: OwnSalesItem[];

  @OneToMany(true)
  @ReadOnly()
  orders!: Order[];

  @ManyToMany()
  @ReadOnly()
  followedUserAccounts!: FollowedUserAccount[];

  @ManyToMany()
  @ReadOnly()
  followingUserAccounts!: FollowingUserAccount[];
}

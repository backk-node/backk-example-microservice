// DO NOT MODIFY THIS FILE! This is an auto-generated file
import {
  AcceptFileTypes,
  IsAnyString,
  IsDataUri,
  IsOneOf,
  IsString,
  IsStringOrObjectId,
  IsUndefined,
  Lengths,
  MaxLength,
  MaxLengthAndMatches,
  ValidateIf,
} from 'backk-frontend-utils';
import OwnSalesItem from '../../../salesitem/types/entities/OwnSalesItem';
import FollowedUserAccount from '../../../useraccount/types/entities/FollowedUserAccount';
import FollowingUserAccount from '../../../useraccount/types/entities/FollowingUserAccount';
import MicroserviceOptions from '../../../_backk/MicroserviceOptions'; // This is an auto-generated file from the respective .type file

export default class User {
  @IsUndefined({
    groups: ['__backk_create__'],
  })
  @IsStringOrObjectId({
    groups: ['__backk_update__'],
  })
  @MaxLengthAndMatches(24, /^[a-f\d]{1,24}$/, {
    groups: ['__backk_update__'],
  })
  @IsString()
  _id: string | undefined = '';

  @MaxLength(Lengths._128)
  @IsAnyString()
  @IsString()
  @ValidateIf((o: any) => o.displayName !== undefined, {
    groups: ['__backk_update__'],
  })
  displayName: string | undefined = '';

  @MaxLength(Lengths._256)
  @IsOneOf(
    'backk-example-microservice',
    'default',
    MicroserviceOptions.fqdn,
    MicroserviceOptions.accessTokenStorageEncryptionKey,
    'userAccountsService.getCities',
    'Tampere'
  )
  @IsString()
  @ValidateIf((o: any) => o.city !== undefined, {
    groups: ['__backk_update__'],
  })
  city: string | undefined = '';

  @MaxLength(Lengths._10M)
  @IsDataUri()
  @AcceptFileTypes(['image/*'])
  @IsString()
  @ValidateIf((o: any) => o.imageDataUri !== undefined, {
    groups: ['__backk_update__'],
  })
  imageDataUri: string | undefined = '';

  @IsUndefined({
    groups: ['__backk_create__', '__backk_update__'],
  })
  @ValidateIf((o: any) => o.ownSalesItems !== undefined, {
    groups: ['__backk_update__'],
  })
  ownSalesItems: OwnSalesItem[] | undefined = [];

  @IsUndefined({
    groups: ['__backk_create__', '__backk_update__'],
  })
  @ValidateIf((o: any) => o.followedUserAccounts !== undefined, {
    groups: ['__backk_update__'],
  })
  followedUserAccounts: FollowedUserAccount[] | undefined = [];

  @IsUndefined({
    groups: ['__backk_create__', '__backk_update__'],
  })
  @ValidateIf((o: any) => o.followingUserAccounts !== undefined, {
    groups: ['__backk_update__'],
  })
  followingUserAccounts: FollowingUserAccount[] | undefined = [];
}

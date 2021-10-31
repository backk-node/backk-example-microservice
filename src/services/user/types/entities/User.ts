// This is an auto-generated file from the respective .type file
// DO NOT MODIFY THIS FILE! Updates should be made to the respective .type file only
// This file can be generated from the respective .type file by running npm script 'generateTypes'

import {
  Entity,
  IsAnyString,
  IsDataUri,
  IsOneOf,
  IsStringOrObjectId,
  IsUndefined,
  Lengths,
  ManyToMany,
  MaxLength,
  MaxLengthAndMatches,
  NotEncrypted,
  NotUnique,
  OneToMany,
  ReadOnly,
  ReadUpdate,
  ReadWrite,
} from 'backk';
import OwnSalesItem from '../../../salesitem/types/entities/OwnSalesItem';
import FollowedUserAccount from '../../../useraccount/types/entities/FollowedUserAccount';
import FollowingUserAccount from '../../../useraccount/types/entities/FollowingUserAccount';
import getCities from '../../../useraccount/validation/getCities';

@Entity('UserAccount')
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
  @ReadUpdate()
  _id!: string;

  @MaxLength(Lengths._128)
  @IsAnyString()
  @ReadWrite()
  @NotUnique()
  @NotEncrypted('Display name is queried with wild cards')
  displayName!: string;

  @MaxLength(Lengths._256)
  @IsOneOf(getCities, 'userAccountsService.getCities', 'Tampere')
  @NotUnique()
  @ReadWrite()
  city!: string;

  @MaxLength(Lengths._10M)
  @IsDataUri()
  @NotUnique()
  @ReadWrite()
  imageDataUri!: string;

  @OneToMany(true)
  @ReadOnly()
  ownSalesItems!: OwnSalesItem[];

  @ManyToMany()
  @ReadOnly()
  followedUserAccounts!: FollowedUserAccount[];

  @ManyToMany()
  @ReadOnly()
  followingUserAccounts!: FollowingUserAccount[];
}

// DO NOT MODIFY THIS FILE! This is an auto-generated file
// This is an auto-generated file from the respective .type file
// DO NOT MODIFY THIS FILE! Updates should be made to the respective .type file only
// This file can be generated from the respective .type file by running npm script 'generateTypes'
import {
  IsAnyString,
  IsDataUri,
  IsOneOf,
  IsStringOrObjectId,
  IsUndefined,
  Lengths,
  MaxLength,
  MaxLengthAndMatches,
  ReadOnly,
  ReadUpdate,
  ReadWrite,
} from 'backk-frontend-utils';
import OwnSalesItem from '../../../salesitem/types/entities/OwnSalesItem';
import getCities from '../../validation/getCities';

export default class FollowedUserAccount {
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
  displayName!: string;

  @MaxLength(Lengths._256)
  @IsOneOf(getCities, 'userAccountsService.getCities', 'Tampere')
  @ReadWrite()
  city!: string;

  @MaxLength(Lengths._10M)
  @IsDataUri()
  @ReadWrite()
  imageDataUri!: string;

  @ReadOnly()
  ownSalesItems!: OwnSalesItem[];
}

// This is an auto-generated file from the respective .type file
// DO NOT MODIFY THIS FILE! Updates should be made to the respective .type file only
// This file can be generated from the respective .type file by running npm script 'generateTypes'

import {
  AcceptFileTypes,
  IsAnyString,
  IsDataUri,
  IsFloat,
  IsStringOrObjectId,
  IsUndefined,
  Lengths,
  MaxLength,
  MaxLengthAndMatches,
  MinMax,
  NotEncrypted,
  NotUnique,
  ReadOnly,
  ReadUpdate,
  ReadWrite,
  Values,
} from 'backk';

export default class FollowedUserSalesItem {
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

  @MaxLength(Lengths._64)
  @IsAnyString()
  @NotUnique()
  @ReadWrite()
  title!: string;

  @IsFloat(2)
  @MinMax(0, Values._1B)
  @ReadWrite()
  price!: number;

  @IsFloat(2)
  @MinMax(0, Values._1B)
  @ReadOnly()
  previousPrice!: number | null;

  @MaxLength(Lengths._10M)
  @IsDataUri()
  @AcceptFileTypes(['image/*'])
  @NotUnique()
  @ReadWrite()
  primaryImageDataUri!: string;

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
  userAccountId!: string;

  @MaxLength(Lengths._128)
  @IsAnyString()
  @ReadWrite()
  @NotUnique()
  @NotEncrypted('Display name is queried with wild cards')
  displayName!: string;
}

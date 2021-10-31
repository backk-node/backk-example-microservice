// DO NOT MODIFY THIS FILE! This is an auto-generated file
// This is an auto-generated file from the respective .type file
// DO NOT MODIFY THIS FILE! Updates should be made to the respective .type file only
// This file can be generated from the respective .type file by running npm script 'generateTypes'
// eslint-disable-next-line @typescript-eslint/class-value-casing
import {
  IsBigInt,
  IsStringOrObjectId,
  IsUndefined,
  Max,
  MaxLengthAndMatches,
  Min,
  ReadUpdate,
  ReadWrite,
  Values,
} from 'backk-frontend-utils';

export default class RemoveOrderItemArg {
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

  @IsUndefined({
    groups: ['__backk_create__'],
  })
  @IsBigInt({
    groups: ['__backk_none__'],
  })
  @Min(-1)
  @Max(Number.MAX_SAFE_INTEGER)
  @ReadUpdate()
  version!: number;

  orderItemId!: string;

  @IsStringOrObjectId()
  @MaxLengthAndMatches(Values._24, /^[a-f\d]{1,24}$/)
  @ReadWrite()
  userAccountId!: string;
}
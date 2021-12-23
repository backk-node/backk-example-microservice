// This is an auto-generated file from the respective .type file
// DO NOT MODIFY THIS FILE! Updates should be made to the respective .type file only
// This file can be generated from the respective .type file by running npm script 'generateTypes'

import {
  AcceptFileTypes,
  Entity,
  Indexed,
  IsAnyString,
  IsDataUri,
  IsDate,
  IsFloat,
  IsStringOrObjectId,
  IsUndefined,
  Lengths,
  MaxLength,
  MaxLengthAndMatches,
  MinMax,
  NotUnique,
  ReadOnly,
  ReadUpdate,
  ReadWrite,
  Values,
} from 'backk';
import { SalesItemState } from '../enums/SalesItemState';

@Entity('SalesItem')
export default class OwnSalesItem {
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
    groups: ['__backk_create__', '__backk_update__'],
  })
  @IsDate({
    groups: ['__backk_none__'],
  })
  @ReadOnly()
  createdAtTimestamp!: Date;

  @IsUndefined({
    groups: ['__backk_create__', '__backk_update__'],
  })
  @IsDate({
    groups: ['__backk_none__'],
  })
  @ReadOnly()
  lastModifiedTimestamp!: Date;

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

  @MaxLength(Lengths._1M)
  @IsDataUri()
  @AcceptFileTypes(['image/*'])
  @NotUnique()
  @ReadOnly()
  primaryImageThumbnailDataUri!: string;

  @Indexed()
  @ReadOnly()
  state!: SalesItemState;
}

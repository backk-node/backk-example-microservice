// This is an auto-generated file from the respective .type file
// DO NOT MODIFY THIS FILE! Updates should be made to the respective .type file only
// This file can be generated from the respective .type file by running npm script 'generateTypes'

import {
  AcceptFileTypes,
  Entity,
  Index,
  IsAnyString,
  IsDataUri,
  IsFloat,
  IsStringOrObjectId,
  IsUndefined,
  Lengths,
  MaxLength,
  MaxLengthAndMatches,
  MinMax,
  NotUnique,
  Private,
  ReadOnly,
  ReadUpdate,
  ReadWrite,
  Values,
} from 'backk';
import { SalesItemState } from '../../../salesitem/types/enums/SalesItemState';

@Entity('SalesItem')
export default class ShoppingCartOrOrderSalesItem {
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

  @Index()
  @Private()
  state!: SalesItemState;

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
  @ReadWrite()
  shippingCost!: number;

  @MaxLength(Lengths._1M)
  @IsDataUri()
  @AcceptFileTypes(['image/*'])
  @NotUnique()
  @ReadOnly()
  primaryImageThumbnailDataUri!: string;

  @NotUnique()
  @Private()
  buyerUserAccountId: string | null = null;
}

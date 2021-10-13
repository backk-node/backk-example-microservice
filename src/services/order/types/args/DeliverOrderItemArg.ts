// This is an auto-generated file from the respective .type file
// DO NOT MODIFY THIS FILE! Updates should be made to the respective .type file only
// This file can be generated from the respective .type file by running npm script 'generateTypes'

import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBigInt,
  IsStringOrObjectId,
  IsUndefined,
  Max,
  MaxLengthAndMatches,
  Min,
  NotUnique,
  ReadUpdate
} from 'backk';
import OrderItemForDelivery from './OrderItemForDelivery';

export default class DeliverOrderItemArg {
  @IsUndefined({
    groups: ['__backk_create__']
  })
  @IsStringOrObjectId({
    groups: ['__backk_update__']
  })
  @MaxLengthAndMatches(24, /^[a-f\d]{1,24}$/, {
    groups: ['__backk_update__']
  })
  @ReadUpdate()
  _id!: string;

  @IsUndefined({
    groups: ['__backk_create__']
  })
  @IsBigInt({
    groups: ['__backk_none__']
  })
  @NotUnique()
  @Min(-1)
  @Max(Number.MAX_SAFE_INTEGER)
  @ReadUpdate()
  version!: number;

  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  orderItems!: OrderItemForDelivery[];
}

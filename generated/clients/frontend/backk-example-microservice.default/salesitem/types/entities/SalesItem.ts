// DO NOT MODIFY THIS FILE! This is an auto-generated file
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotUnique,
  IsAnyString,
  IsDataUri,
  IsFloat,
  IsInt,
  Lengths,
  MaxLength,
  MAX_INT_VALUE,
  MinMax,
  ReadOnly,
  ReadWrite,
  Values,
  _IdAndVersionAndCreatedAtTimestampAndLastModifiedTimestampAndUserAccountId,
} from 'backk-frontend-utils';
import Tag from '../../../tag/entities/Tag';
import { Area } from '../enums/Area';
import { Category } from '../enums/Category';
import { Department } from '../enums/Department';
import { SalesItemState } from '../enums/SalesItemState';

export default class SalesItem extends _IdAndVersionAndCreatedAtTimestampAndLastModifiedTimestampAndUserAccountId {
  @MaxLength(Lengths._64)
  @IsAnyString()
  @ReadWrite()
  title!: string;

  @MaxLength(Lengths._1K)
  @IsAnyString()
  @ReadWrite()
  description!: string;

  @ArrayMinSize(0)
  @ArrayMaxSize(Values._25)
  @ReadWrite()
  tags!: Tag[];

  @ReadWrite()
  area!: Area;

  @ReadWrite()
  productDepartment!: Department;

  @ReadWrite()
  productCategory!: Category;

  @ReadWrite()
  productSubCategory!: Category;

  @IsFloat(2)
  @MinMax(0, Values._1B)
  @ReadWrite()
  price!: number;

  @IsFloat(2)
  @MinMax(0, Values._1B)
  @ReadOnly()
  previousPrice!: number | null;

  @IsFloat(2)
  @MinMax(0, Values._1B)
  @ReadWrite()
  shippingCost!: number;

  @MaxLength(Lengths._10M)
  @IsDataUri()
  @ReadWrite()
  primaryImageDataUri!: string;

  @MaxLength(Lengths._1M)
  @IsDataUri()
  @ReadOnly()
  primaryImageThumbnailDataUri!: string;

  @MaxLength(Lengths._10M, {
    each: true,
  })
  @IsDataUri({
    each: true,
  })
  @ArrayMinSize(0)
  @ArrayMaxSize(10)
  @ArrayNotUnique()
  @ReadWrite()
  secondaryImageDataUris!: string[];

  @ReadOnly()
  state!: SalesItemState;

  @IsInt()
  @MinMax(0, MAX_INT_VALUE)
  @ReadOnly()
  likeCount!: number;
}

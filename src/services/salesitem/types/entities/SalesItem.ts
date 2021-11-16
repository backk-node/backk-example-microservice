import {
  AcceptFileTypes,
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotUnique,
  ArrayUnique,
  Entity,
  Index,
  IsAnyString,
  IsDataUri,
  IsFloat,
  IsInt,
  Lengths,
  ManyToMany,
  MaxLength,
  MAX_INT_VALUE,
  MinMax,
  NotUnique,
  Private,
  ReadOnly,
  ReadWrite,
  Values,
  _IdAndVersionAndCreatedAtTimestampAndLastModifiedTimestampAndUserAccountId,
} from 'backk';
import Tag from '../../../tag/entities/Tag';
import { Area } from '../enums/Area';
import { Category } from '../enums/Category';
import { Department } from '../enums/Department';
import { SalesItemState } from '../enums/SalesItemState';

@Entity()
export default class SalesItem extends _IdAndVersionAndCreatedAtTimestampAndLastModifiedTimestampAndUserAccountId {
  @MaxLength(Lengths._64)
  @IsAnyString()
  @NotUnique()
  @ReadWrite()
  title!: string;

  @MaxLength(Lengths._1K)
  @IsAnyString()
  @NotUnique()
  @ReadWrite()
  description!: string;

  @ManyToMany()
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

  @MaxLength(Lengths._10M, { each: true })
  @IsDataUri({ each: true })
  @AcceptFileTypes(['image/*'], { each: true })
  @ArrayMinSize(0)
  @ArrayMaxSize(10)
  @ArrayNotUnique()
  @ReadWrite()
  secondaryImageDataUris!: string[];

  @Index()
  @ReadOnly()
  state!: SalesItemState;

  @NotUnique()
  @Private()
  buyerUserAccountId: string | null = null;

  @ArrayUnique()
  @Private()
  priceChangeFollowingUserAccountIds!: string[];

  @ArrayUnique()
  @Private()
  likedUserAccountIds!: string[];

  @IsInt()
  @MinMax(0, MAX_INT_VALUE)
  @NotUnique()
  @ReadOnly()
  likeCount!: number;
}

// DO NOT MODIFY THIS FILE! This is an auto-generated file
import {
  IsAnyString,
  IsDataUri,
  IsFloat,
  IsString,
  IsStringOrObjectId,
  IsUndefined,
  Lengths,
  MaxLength,
  MaxLengthAndMatches,
  MinMax,
  ValidateIf,
  Values,
} from 'backk-frontend-utils';

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
  @IsString()
  _id!: string | undefined;

  @MaxLength(Lengths._64)
  @IsAnyString()
  @IsString()
  title!: string;

  @IsFloat(2)
  @MinMax(0, Values._1B)
  price!: number;

  @IsFloat(2)
  @MinMax(0, Values._1B)
  @IsUndefined({
    groups: ['__backk_create__', '__backk_update__'],
  })
  @ValidateIf((o: any) => o.previousPrice !== null)
  previousPrice!: number | null | undefined;

  @MaxLength(Lengths._10M)
  @IsDataUri()
  @IsString()
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
  @IsString()
  userAccountId!: string | undefined;

  @MaxLength(Lengths._128)
  @IsAnyString()
  @IsString()
  displayName!: string;
}

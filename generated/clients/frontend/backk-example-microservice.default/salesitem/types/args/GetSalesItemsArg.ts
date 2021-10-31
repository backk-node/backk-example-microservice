// DO NOT MODIFY THIS FILE! This is an auto-generated file
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  DefaultSortingAndPagination,
  IsAnyString,
  IsInt,
  Lengths,
  MaxLength,
  MinMax,
  SortBy,
} from 'backk-frontend-utils';
import { Area } from '../enums/Area';
import { Category } from '../enums/Category';
import { Department } from '../enums/Department';

export default class GetSalesItemsArg extends DefaultSortingAndPagination {
  @MaxLength(Lengths._512)
  @IsAnyString()
  textFilter?: string;

  @ArrayMinSize(0)
  @ArrayMaxSize(10)
  @ArrayUnique()
  areas?: Area[];

  @ArrayMinSize(0)
  @ArrayMaxSize(10)
  @ArrayUnique()
  productDepartments?: Department[];

  @ArrayMinSize(0)
  @ArrayMaxSize(10)
  @ArrayUnique()
  productCategories?: Category[];

  @ArrayMinSize(0)
  @ArrayMaxSize(10)
  @ArrayUnique()
  productSubCategories?: Category[];

  @IsInt()
  @MinMax(0, 1000000000)
  minPrice?: number;

  @IsInt()
  @MinMax(0, 1000000000)
  maxPrice?: number;

  sortBys: SortBy[] = [
    {
      fieldName: '_id',
      sortDirection: 'DESC',
    },
    {
      subEntityPath: '*',
      fieldName: '_id',
      sortDirection: 'ASC',
    },
    {
      subEntityPath: '*',
      fieldName: 'id',
      sortDirection: 'ASC',
    },
  ];
}

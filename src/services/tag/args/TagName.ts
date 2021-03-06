// This is an auto-generated file from the respective .type file
// DO NOT MODIFY THIS FILE! Updates should be made to the respective .type file only
// This file can be generated from the respective .type file by running npm script 'generateTypes'

import { IsAnyString, Lengths, MaxLength, ReadWrite, Unique } from 'backk';

export default class TagName {
  @MaxLength(Lengths._64)
  @IsAnyString()
  @Unique()
  @ReadWrite()
  name!: string;
}

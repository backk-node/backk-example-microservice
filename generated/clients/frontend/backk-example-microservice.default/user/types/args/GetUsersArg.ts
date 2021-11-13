// DO NOT MODIFY THIS FILE! This is an auto-generated file
import { DefaultPostQueryOperations, IsAnyString, Lengths, MaxLength } from 'backk-frontend-utils';

export default class GetUsersArg extends DefaultPostQueryOperations {
  constructor() {
    super();
    this.displayNameFilter = '';
  }

  @MaxLength(Lengths._256)
  @IsAnyString()
  displayNameFilter!: string;
}

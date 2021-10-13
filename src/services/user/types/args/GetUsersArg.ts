import { DefaultPostQueryOperations, IsAnyString, Lengths, MaxLength } from 'backk';

export default class GetUsersArg extends DefaultPostQueryOperations {
  @MaxLength(Lengths._256)
  @IsAnyString()
  displayNameFilter!: string;
}

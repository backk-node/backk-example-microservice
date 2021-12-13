import { DefaultPostQueryOperationsImpl, IsAnyString, Lengths, MaxLength } from 'backk';

export default class GetUsersArg extends DefaultPostQueryOperationsImpl {
  @MaxLength(Lengths._256)
  @IsAnyString()
  displayNameFilter!: string;
}

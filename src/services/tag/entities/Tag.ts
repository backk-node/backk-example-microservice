import { MaxLength, _Id, Entity, IsAnyString, Lengths, Unique, ReadWrite } from 'backk';

@Entity()
export default class Tag extends _Id {
  @MaxLength(Lengths._64)
  @IsAnyString()
  @Unique()
  @ReadWrite()
  name!: string;
}

import { Entity, IsAnyString, Lengths, MaxLength, ReadWrite, Unique, _Id } from 'backk';

@Entity()
export default class Tag extends _Id {
  @MaxLength(Lengths._64)
  @IsAnyString()
  @Unique()
  @ReadWrite()
  name!: string;
}

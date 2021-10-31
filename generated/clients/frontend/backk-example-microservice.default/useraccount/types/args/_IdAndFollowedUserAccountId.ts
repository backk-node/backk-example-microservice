// DO NOT MODIFY THIS FILE! This is an auto-generated file
import { ShouldBeTrueForObject, _Id } from 'backk-frontend-utils'; // eslint-disable-next-line @typescript-eslint/class-name-casing

export default class _IdAndFollowedUserAccountId extends _Id {
  @ShouldBeTrueForObject<_IdAndFollowedUserAccountId>(
    ({ _id, followedUserAccountId }) => _id !== followedUserAccountId,
    '_id and followedUserAccountId may not be the same'
  )
  followedUserAccountId!: string;
}

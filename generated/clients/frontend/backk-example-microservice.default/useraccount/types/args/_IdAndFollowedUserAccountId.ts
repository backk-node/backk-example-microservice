// DO NOT MODIFY THIS FILE! This is an auto-generated file
import { IsStringOrObjectId, MaxLengthAndMatches, ShouldBeTrueForObject, _Id } from 'backk-frontend-utils';

export default class _IdAndFollowedUserAccountId extends _Id {
  @ShouldBeTrueForObject<_IdAndFollowedUserAccountId>(
    ({ _id, followedUserAccountId }) => _id !== followedUserAccountId,
    '_id and followedUserAccountId may not be the same'
  )
  @MaxLengthAndMatches(24, /^[a-f\d]{1,24}$/, {
    groups: '__backk_argument__',
  })
  @IsStringOrObjectId()
  followedUserAccountId!: string;
}

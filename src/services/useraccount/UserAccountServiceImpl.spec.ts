import { NullDataStore } from 'backk';
import UserAccount from './types/entities/UserAccount';
import UserAccountServiceImpl from './UserAccountServiceImpl';

describe('UserAccountServiceImpl', () => {
  describe('followUser', () => {
    it('should make you follow user and add you to following users of the followed user', () => {
      // GIVEN
      const _id = '1';
      const followedUserAccountId = '2';
      const dataStore = new NullDataStore();
      dataStore.addSubEntitiesToEntityById = jest.fn();
      const userAccountService = new UserAccountServiceImpl(dataStore);

      // WHEN
      userAccountService.followUser({ _id, followedUserAccountId });

      // THEN
      expect(dataStore.addSubEntitiesToEntityById).toHaveBeenCalledWith(
        'followedUserAccounts',
        [{ _id: '2' }],
        UserAccount,
        '1',
        {
          entityPreHooks: expect.any(Function),
        }
      );
    });
  });
});

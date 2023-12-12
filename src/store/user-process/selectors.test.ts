
import { AuthorizationStatus, NameSpace } from '../../const';
import { TUserProcess, selectAuthStatus, selectIsAuthStatus, selectUserAuthData } from '..';
import { makeFakeUserData } from '../../utils';

const fakeUser = makeFakeUserData();

const fakeState: TUserProcess = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  user: fakeUser,
};

let state = { [NameSpace.User]: fakeState };

describe('Reducer: user-process selectors', () => {
  beforeEach(() => {
    state = { [NameSpace.User]: { ...fakeState } };
  });

  describe('selector: selectAuthStatus', () => {
    it('Should return auth. status from state', () => {
      const result = selectAuthStatus(state);

      expect(result).toEqual(AuthorizationStatus.NoAuth);
    });
  });

  describe('selector: selectIsAuthStatus', () => {
    it('Should return true or false auth. status in the state', () => {
      const result = selectIsAuthStatus(state);

      expect(result).toEqual(false);
    });
  });

  describe('selector: selectUserAuthData', () => {
    it('Should return user auth. data from state', () => {
      const result = selectUserAuthData(state);

      expect(result).toEqual(fakeUser);
    });
  });
});

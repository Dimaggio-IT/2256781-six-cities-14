import { TUserProcess, getAsyncAuth, postAsyncAuth, deleteAsyncAuth, userProcess } from '..';
import { AuthorizationStatus } from '../../const';
import { makeFakeUserData } from '../../utils';

const initialState: TUserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

let state: TUserProcess;

describe('Reducer: user-process', () => {

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: TUserProcess = { ...initialState };

    expect(userProcess.reducer(initialState, emptyAction)).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: TUserProcess = { ...initialState };

    expect(userProcess.reducer(undefined, emptyAction)).toEqual(expectedState);
  });

  describe('getAsyncAuth test', () => {
    it('getAsyncAuth fulfilled', () => {
      const fakeUser = makeFakeUserData();
      const expectedState: TUserProcess = {
        ...initialState,
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUser,
      };

      expect(
        userProcess.reducer(state, {
          type: getAsyncAuth.fulfilled.type,
          payload: fakeUser,
        })
      ).toEqual(expectedState);
    });

    it('getAsyncAuth rejected', () => {
      const expectedState: TUserProcess = {
        ...initialState,
        authorizationStatus: AuthorizationStatus.NoAuth,
      };

      expect(
        userProcess.reducer(state, {
          type: getAsyncAuth.rejected,
        })
      ).toEqual(expectedState);
    });
  });

  describe('postAsyncAuth test', () => {
    it('postAsyncAuth fulfilled', () => {
      const fakeUser = makeFakeUserData();
      const expectedState: TUserProcess = {
        ...initialState,
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUser,
      };

      expect(
        userProcess.reducer(state, {
          type: postAsyncAuth.fulfilled.type,
          payload: fakeUser,
        })
      ).toEqual(expectedState);
    });

    it('postAsyncAuth rejected', () => {
      const expectedState: TUserProcess = {
        ...initialState,
        authorizationStatus: AuthorizationStatus.NoAuth,
      };

      expect(
        userProcess.reducer(state, {
          type: postAsyncAuth.rejected,
        })
      ).toEqual(expectedState);
    });
  });

  describe('deleteAsyncAuth test', () => {
    it('deleteAsyncAuth fulfilled', () => {
      const expectedState: TUserProcess = {
        ...initialState,
        authorizationStatus: AuthorizationStatus.NoAuth,
      };

      expect(
        userProcess.reducer(state, {
          type: deleteAsyncAuth.fulfilled.type,
        })
      ).toEqual(expectedState);
    });
  });
});

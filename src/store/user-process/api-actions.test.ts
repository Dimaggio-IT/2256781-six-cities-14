import { APIRoute } from '../../const';
import { extractActionsTypes, makeFakeUserData, makeFakeUserRegistrationData } from '../../utils';
import { getAsyncAuth, postAsyncAuth, deleteAsyncAuth } from '..';
import * as tokenStorage from '../../services/token';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { TState } from '../../types';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '../../utils';
import { AuthorizationStatus } from '../../const';

describe('User-process async actions]:', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<TState, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      }
    });
  });

  describe('getAsyncAuth', () => {
    it('should dispatch getAsyncAuth.pending, getAsyncAuth.fulfilled when server response 200', async () => {
      const fakeResponse = { token: 'secret' };
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, fakeResponse);
      const expectedActions = [
        getAsyncAuth.pending.type,
        getAsyncAuth.fulfilled.type,
      ];

      await store.dispatch(getAsyncAuth());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
    });

    it('should dispatch getAsyncAuth.pending, getAsyncAuth.rejected when server response 401', async () => {
      const fakeResponse = {
        errorType: 'COMMON_ERROR',
        message: 'Access deny.'
      };
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401, fakeResponse);
      const expectedActions = [
        getAsyncAuth.pending.type,
        getAsyncAuth.rejected.type,
      ];

      await store.dispatch(getAsyncAuth());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
    });
  });

  describe('postAsyncAuth', () => {
    it('should dispatch postAsyncAuth.pending, postAsyncAuth.fulfilled when server response 200', async () => {
      const fakeUser = makeFakeUserData();
      const fakeRegData = makeFakeUserRegistrationData();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeUser);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');
      const expectedActions = [
        postAsyncAuth.pending.type,
        postAsyncAuth.fulfilled.type,
      ];

      await store.dispatch(postAsyncAuth(fakeRegData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeUser.token);
    });

    it('should dispatch postAsyncAuth.pending, postAsyncAuth.rejected when server response 400', async () => {
      const fakeRegData = makeFakeUserRegistrationData();
      const fakeResponse = {
        errorType: 'VALIDATION_ERROR',
        message: 'Validation error: /six-cities/login',
        details: [
          {
            property: 'password',
            value: 'p',
            messages: [
              'password must be longer than or equal to 3 characters'
            ]
          }]
      };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400, fakeResponse);
      const expectedActions = [
        postAsyncAuth.pending.type,
        postAsyncAuth.rejected.type,
      ];

      await store.dispatch(postAsyncAuth(fakeRegData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
    });
  });

  describe('deleteAsyncAuth', () => {
    it('should dispatch deleteAsyncAuth.pending, deleteAsyncAuth.fulfilled when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');
      const expectedActions = [
        deleteAsyncAuth.pending.type,
        deleteAsyncAuth.fulfilled.type,
      ];

      await store.dispatch(deleteAsyncAuth());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expectedActions);
      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});

import { getAsyncOffers } from '..';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { TState } from '../../types';
import { APIRoute } from '../../const';
import { AppThunkDispatch, extractActionsTypes, makeFakeOffersPreview } from '../../utils';

describe('Offers async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<TState, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ OFFERS: { offers: [] } });
  });

  describe('getAsyncOffers', () => {
    it('should dispatch getAsyncOffers.pending, getAsyncOffers.fulfilled when server response 200', async () => {
      const fakeOffers = makeFakeOffersPreview();
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, fakeOffers);

      await store.dispatch(getAsyncOffers());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getAsyncOffersFulfilled = emittedActions.at(1) as ReturnType<typeof getAsyncOffers.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getAsyncOffers.pending.type,
        getAsyncOffers.fulfilled.type,
      ]);

      expect(getAsyncOffersFulfilled.payload)
        .toEqual(fakeOffers);
    });

    it('should dispatch getAsyncOffers.pending, getAsyncOffers.rejected when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(getAsyncOffers());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        getAsyncOffers.pending.type,
        getAsyncOffers.rejected.type,
      ]);

    });
  });
});

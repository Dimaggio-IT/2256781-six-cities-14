import { getAsyncFavorites, postAsyncFavorite, updateNearbyPlaces, updateOffer, updateOffers } from '..';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { TOffer, TState } from '../../types';
import { APIRoute } from '../../const';
import { AppThunkDispatch, extractActionsTypes, makeFakeOffer, makeFakeOffersPreview, replaceURI } from '../../utils';

describe('Favorite async actions', () => {

  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<TState, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ FAVORITE: { favorites: [] } });
  });

  describe('getAsyncFavorites', () => {

    it('should dispatch getAsyncFavorites.pending, getAsyncFavorites.fulfilled when server response 200', async () => {
      const fakeOffers = makeFakeOffersPreview();
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, fakeOffers);

      await store.dispatch(getAsyncFavorites());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getAsyncFavoritesFulfilled = emittedActions.at(1) as ReturnType<typeof getAsyncFavorites.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getAsyncFavorites.pending.type,
        getAsyncFavorites.fulfilled.type,
      ]);

      expect(getAsyncFavoritesFulfilled.payload)
        .toEqual(fakeOffers);
    });

    it('should dispatch getAsyncFavorites.pending, getAsyncFavorites.rejected when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);

      await store.dispatch(getAsyncFavorites());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        getAsyncFavorites.pending.type,
        getAsyncFavorites.rejected.type,
      ]);

    });
  });

  describe('postAsyncFavorite', () => {
    it('should dispatch postAsyncFavorite.pending, postAsyncFavorite.fulfilled when server response 200', async () => {
      const fakeOffer = makeFakeOffer();
      const newStatusForTheRequest = Number(!fakeOffer.isFavorite);
      const newFakeOffer: TOffer = { ...fakeOffer, isFavorite: !fakeOffer.isFavorite };
      const offerId = fakeOffer.id;
      const query = replaceURI(APIRoute.FavoriteStatus, offerId, String(newStatusForTheRequest));
      mockAxiosAdapter.onPost(query).reply(200, newFakeOffer);

      await store.dispatch(postAsyncFavorite({ offerId, status: newStatusForTheRequest }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postAsyncFavoriteFulfilled = emittedActions.at(4) as ReturnType<typeof postAsyncFavorite.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postAsyncFavorite.pending.type,
        updateOffers.type,
        updateOffer.type,
        updateNearbyPlaces.type,
        postAsyncFavorite.fulfilled.type,
      ]);

      expect(postAsyncFavoriteFulfilled.payload)
        .toEqual(newFakeOffer);
    });

    it('should dispatch postAsyncFavorite.pending, postAsyncFavorite.rejected when server response 400', async () => {
      const fakeOffer = makeFakeOffer();
      const newStatusForTheRequest = Number(!fakeOffer.isFavorite);
      const offerId = fakeOffer.id;
      const errorResponse: Record<string, string> = {
        errorType: 'COMMON_ERROR',
        message: 'Wrong status to add offer in favorite: 2.'
      };

      const query = replaceURI(APIRoute.FavoriteStatus, offerId, String(newStatusForTheRequest));
      mockAxiosAdapter.onPost(query).reply(400, errorResponse);

      await store.dispatch(postAsyncFavorite({ offerId, status: newStatusForTheRequest }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        postAsyncFavorite.pending.type,
        postAsyncFavorite.rejected.type,
      ]);
    });
  });

});

import { getAsyncNearbyPlaces, getAsyncOffer, getAsyncReviews, postAsyncReview } from '..';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { TState } from '../../types';
import { APIRoute, RequestStatus } from '../../const';
import { AppThunkDispatch, extractActionsTypes, makeFakeNearbyPlacesPreview, makeFakeOffer, makeFakePreviewData, makeFakeReview, makeFakeReviews, replaceURI } from '../../utils';

describe('Offer async actions', () => {

  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<TState, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      OFFER: {
        isOfferLoading: false,
        offer: null,
        nearbyPlaces: [],
        reviews: [],
        reviewRequestStatus: RequestStatus.Idle,
      }
    });
  });

  describe('getAsyncOffer', () => {

    it('should dispatch getAsyncOffer.pending, getAsyncOffer.fulfilled when server response 200', async () => {
      const fakeOffer = makeFakeOffer();
      const offerId = fakeOffer.id;
      const query = replaceURI(APIRoute.Offer, offerId);
      mockAxiosAdapter.onGet(query).reply(200, fakeOffer);

      await store.dispatch(getAsyncOffer(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getAsyncOfferFulfilled = emittedActions.at(1) as ReturnType<typeof getAsyncOffer.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getAsyncOffer.pending.type,
        getAsyncOffer.fulfilled.type,
      ]);

      expect(getAsyncOfferFulfilled.payload)
        .toEqual(fakeOffer);
    });

    it('should dispatch getAsyncOffer.pending, getAsyncOffer.rejected when server response 400', async () => {
      const fakeOffer = makeFakeOffer();
      const offerId = fakeOffer.id;
      const query = replaceURI(APIRoute.Offer, offerId);
      const errorPayload = {
        errorType: 'COMMON_ERROR',
        message: `Offer with id ${offerId} not found.`
      };
      mockAxiosAdapter.onGet(query).reply(404, errorPayload);

      await store.dispatch(getAsyncOffer(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        getAsyncOffer.pending.type,
        getAsyncOffer.rejected.type,
      ]);
    });
  });

  describe('getAsyncNearbyPlaces', () => {
    it('should dispatch getAsyncNearbyPlaces.pending getAsyncNearbyPlaces.fulfilled when server response 200', async () => {
      const offerId = '123321';
      const fakeNearbyPlaces = makeFakeNearbyPlacesPreview();
      const query = replaceURI(APIRoute.Nearby, offerId);
      mockAxiosAdapter.onGet(query).reply(200, fakeNearbyPlaces);

      await store.dispatch(getAsyncNearbyPlaces(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getAsyncNearbyPlacesFulfilled = emittedActions.at(1) as ReturnType<typeof getAsyncNearbyPlaces.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getAsyncNearbyPlaces.pending.type,
        getAsyncNearbyPlaces.fulfilled.type,
      ]);

      expect(getAsyncNearbyPlacesFulfilled.payload)
        .toEqual(fakeNearbyPlaces);
    });
  });

  describe('getAsyncReviews', () => {
    it('should dispatch getAsyncReviews.pending, getAsyncReviews.fulfilled when server response 200', async () => {
      const fakeOffer = makeFakeOffer();
      const fakeOfferId = fakeOffer.id;
      const fakeReviews = makeFakeReviews();
      const query = replaceURI(APIRoute.Review, fakeOfferId);
      mockAxiosAdapter.onGet(query).reply(200, fakeReviews);

      await store.dispatch(getAsyncReviews(fakeOfferId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getAsyncReviewsFulfilled = emittedActions.at(1) as ReturnType<typeof getAsyncReviews.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getAsyncReviews.pending.type,
        getAsyncReviews.fulfilled.type,
      ]);

      expect(getAsyncReviewsFulfilled.payload)
        .toEqual(fakeReviews);
    });
  });

  describe('postAsyncReview', () => {
    it('should dispatch postAsyncReview.pending, postAsyncReview.fulfilled when server response 200', async () => {
      const fakeReview = makeFakeReview();
      const fakeReviewOfferId = fakeReview.id;
      const query = replaceURI(APIRoute.Review, fakeReviewOfferId);
      const fakeReviewData = makeFakePreviewData();
      fakeReviewData.id = fakeReviewOfferId;
      mockAxiosAdapter.onPost(query).reply(200, fakeReview);

      await store.dispatch(postAsyncReview(fakeReviewData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postAsyncReviewFulfilled = emittedActions.at(1) as ReturnType<typeof postAsyncReview.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postAsyncReview.pending.type,
        postAsyncReview.fulfilled.type,
      ]);

      expect(postAsyncReviewFulfilled.payload)
        .toEqual(fakeReview);
    });

    it('should dispatch postAsyncReview.pending, postAsyncReview.rejected when server response 400', async () => {

      const fakeReview = makeFakeReview();
      const fakeReviewOfferId = fakeReview.id;
      const query = replaceURI(APIRoute.Review, fakeReviewOfferId);
      const error400 = {
        errorType: 'VALIDATION_ERROR',
        message: `Validation error: /six-cities/comments/${fakeReviewOfferId}`,
        details: [
          {
            property: 'rating',
            value: 'a',
            messages: [
              'rating must be a number conforming to the specified constraints'
            ]
          }]
      };
      const fakeReviewData = makeFakePreviewData();
      fakeReviewData.id = fakeReviewOfferId;
      mockAxiosAdapter.onPost(query).reply(400, error400);

      await store.dispatch(postAsyncReview(fakeReviewData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        postAsyncReview.pending.type,
        postAsyncReview.rejected.type,
      ]);
    });
  });
});

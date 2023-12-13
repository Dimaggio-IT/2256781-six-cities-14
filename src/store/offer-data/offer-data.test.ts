import { TOfferData, assignEmptyOffer, assignReviewRequestStatusByDefault, getAsyncNearbyPlaces, getAsyncOffer, getAsyncReviews, offerData, postAsyncReview, updateNearbyPlaces, updateOffer } from '..';
import { RequestStatus } from '../../const';
import { TOffer } from '../../types';
import { makeFakeNearbyPlacesPreview, makeFakeOffer, makeFakeOfferPreview, makeFakeReview, makeFakeReviews } from '../../utils';

const initialState: TOfferData = {
  isOfferLoading: false,
  offer: null,
  nearbyPlaces: [],
  reviews: [],
  reviewRequestStatus: RequestStatus.Idle,
};

let state: TOfferData;

describe('Reducer: offer', () => {

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    expect(offerData.reducer(initialState, emptyAction)).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    expect(offerData.reducer(undefined, emptyAction)).toEqual(initialState);
  });

  it('should return the changed state with assignEmptyOffer action', () => {
    const changedState: TOfferData = {
      ...initialState,
      offer: makeFakeOffer()
    };

    expect(offerData.reducer(changedState, assignEmptyOffer())).toEqual(initialState);
  });

  it('should return the changed state with updateOffer action', () => {
    const fakeOffer = makeFakeOffer();
    const fakeOfferPreview = makeFakeOfferPreview();
    const expectedFakeOffer: TOffer = {
      ...fakeOffer,
      isFavorite: fakeOfferPreview.isFavorite,
    };
    const changedState: TOfferData = {
      ...initialState,
      offer: fakeOffer,
    };
    const expectedState: TOfferData = {
      ...initialState,
      offer: expectedFakeOffer,
    };

    expect(offerData.reducer(changedState, updateOffer(fakeOfferPreview))).toEqual(expectedState);
  });

  it('should return the changed state with updateNearbyPlaces action', () => {
    const fakeNearbyPlaces = makeFakeNearbyPlacesPreview();
    const fakeOfferPreview = makeFakeOfferPreview();
    const newId = '123321';
    fakeNearbyPlaces[0].id = newId;
    fakeOfferPreview.id = newId;

    const changedState: TOfferData = {
      ...initialState,
      nearbyPlaces: fakeNearbyPlaces,
    };

    expect(offerData.reducer(changedState, updateNearbyPlaces(fakeOfferPreview)).nearbyPlaces[0].isFavorite).toEqual(fakeOfferPreview.isFavorite);
  });

  it('should return the changed state with assignReviewRequestStatusByDefault action', () => {
    const changedState: TOfferData = {
      ...initialState,
      reviewRequestStatus: RequestStatus.Error,
    };

    expect(offerData.reducer(changedState, assignReviewRequestStatusByDefault()).reviewRequestStatus).toEqual(initialState.reviewRequestStatus);
  });

  describe('getAsyncOffer test', () => {
    it('getAsyncOffer fulfilled', () => {
      const fakeOffer = makeFakeOffer();
      const expectedState: TOfferData = {
        ...initialState,
        offer: fakeOffer,
      };
      expect(
        offerData.reducer(initialState, {
          type: getAsyncOffer.fulfilled.type,
          payload: fakeOffer,
        })
      ).toEqual(expectedState);
    });

    it('getAsyncOffer rejected', () => {
      const changedState: TOfferData = {
        ...initialState,
        isOfferLoading: true,
      };
      expect(
        offerData.reducer(changedState, {
          type: getAsyncOffer.rejected.type,
        })
      ).toEqual(initialState);
    });
  });

  describe('getAsyncNearbyPlaces test', () => {
    it('getAsyncNearbyPlaces fulfilled', () => {
      const fakeNearbyPlaces = makeFakeNearbyPlacesPreview();

      const expectedState: TOfferData = {
        ...initialState,
        nearbyPlaces: fakeNearbyPlaces,
      };

      expect(offerData.reducer(initialState, {
        type: getAsyncNearbyPlaces.fulfilled.type,
        payload: fakeNearbyPlaces,
      })
      ).toEqual(expectedState);
    });
  });

  describe('getAsyncReviews test', () => {
    it('getAsyncReviews fulfilled', () => {
      const fakeReviews = makeFakeReviews();

      const expectedState: TOfferData = {
        ...initialState,
        reviews: fakeReviews,
      };

      expect(offerData.reducer(initialState, {
        type: getAsyncReviews.fulfilled.type,
        payload: fakeReviews,
      })
      ).toEqual(expectedState);
    });
  });

  describe('postAsyncReview test', () => {
    it('postAsyncReview fulfilled', () => {
      const fakeReviews = makeFakeReviews();
      const fakeReview = makeFakeReview();
      const expectedReviews = [...fakeReviews];
      expectedReviews.push(fakeReview);

      const changedState: TOfferData = {
        ...initialState,
        reviews: fakeReviews,
      };

      const expectedState: TOfferData = {
        ...initialState,
        reviewRequestStatus: RequestStatus.Success,
        reviews: expectedReviews,
      };

      expect(
        offerData.reducer(changedState, {
          type: postAsyncReview.fulfilled.type,
          payload: fakeReview,
        })
      ).toEqual(expectedState);
    });

    it('postAsyncReview rejected', () => {
      const expectedState: TOfferData = {
        ...initialState,
        reviewRequestStatus: RequestStatus.Error,
      };

      expect(
        offerData.reducer(state, {
          type: postAsyncReview.rejected.type
        })
      ).toEqual(expectedState);
    });
  });
});

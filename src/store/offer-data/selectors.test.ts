
import { NameSpace, RequestStatus } from '../../const';
import { TOfferData, selectNearbyPlaces, selectNumberReviews, selectOffer, selectReviewRequestStatus } from '..';
import { makeFakeNearbyPlacesPreview, makeFakeOffer, makeFakeReviews } from '../../utils';

const fakeOffer = makeFakeOffer();
const fakeNearbyPlaces = makeFakeNearbyPlacesPreview();
const fakeReviews = makeFakeReviews();

const fakeState: TOfferData = {
  isOfferLoading: false,
  offer: fakeOffer,
  nearbyPlaces: fakeNearbyPlaces,
  reviews: fakeReviews,
  reviewRequestStatus: RequestStatus.Success,
};

let state = { [NameSpace.Offer]: fakeState };

describe('Reducer: offer selectors', () => {
  beforeEach(() => {
    state = { [NameSpace.Offer]: { ...fakeState } };
  });

  describe('selector: selectOffer', () => {
    it('Should return "offer" from state', () => {
      const result = selectOffer(state);

      expect(result).toEqual(fakeOffer);
    });
  });

  describe('selector: selectNearbyPlaces', () => {
    it('Should return "nearbyPlaces" from state', () => {
      const result = selectNearbyPlaces(state);

      expect(result).toEqual(fakeNearbyPlaces);
    });
  });

  describe('selector: selectNumberReviews', () => {
    it('Should return count reviews from state', () => {
      const result = selectNumberReviews(state);

      expect(result).toEqual(fakeReviews.length);
    });
  });

  describe('selector: selectReviewRequestStatus', () => {
    it('Should return review request status from state', () => {
      const result = selectReviewRequestStatus(state);

      expect(result).toEqual(RequestStatus.Success);
    });
  });
});

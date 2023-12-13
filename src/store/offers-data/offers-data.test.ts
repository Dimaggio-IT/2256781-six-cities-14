import { TOffersData, getAsyncOffers, offersData, updateOffers } from '..';
import { makeFakeOfferPreview, makeFakeOffersPreview } from '../../utils';

const initialState: TOffersData = {
  offers: [],
  isOffersLoading: false,
};

let state: TOffersData;

describe('Reducer: offers-data', () => {

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: TOffersData = { ...initialState };

    expect(offersData.reducer(initialState, emptyAction)).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: TOffersData = { ...initialState };

    expect(offersData.reducer(undefined, emptyAction)).toEqual(expectedState);
  });

  it('should change offer with "updateOffers" action', () => {
    const fakeOfferPreview = makeFakeOfferPreview();
    const fakeOffersPreview = makeFakeOffersPreview();
    fakeOffersPreview[0].id = fakeOfferPreview.id;
    const actualState: TOffersData = { ...initialState, offers: fakeOffersPreview, };
    const expectedFakeOffersPreview = [...fakeOffersPreview];
    expectedFakeOffersPreview.find((offer) => {
      if (offer.id === fakeOfferPreview.id) {
        offer.isFavorite = fakeOfferPreview.isFavorite;
      }
    });
    const expectedState = {
      ...initialState,
      offers: expectedFakeOffersPreview,
    };

    const stateOffers = offersData.reducer(actualState, updateOffers(fakeOfferPreview));
    expect(stateOffers).toEqual(expectedState);
  });

  describe('getAsyncOffers test', () => {
    it('getAsyncOffers fulfilled', () => {
      const fakeOffers = makeFakeOffersPreview();
      const expectedState: TOffersData = { ...initialState, offers: fakeOffers };

      expect(
        offersData.reducer(state, {
          type: getAsyncOffers.fulfilled.type,
          payload: fakeOffers,
        })
      ).toEqual(expectedState);
    });

    it('getAsyncOffers rejected', () => {
      const expectedState: TOffersData = { ...initialState, isOffersLoading: false, };
      const actualState: TOffersData = { ...initialState, isOffersLoading: true, };

      expect(
        offersData.reducer(actualState, {
          type: getAsyncOffers.rejected.type,
        })
      ).toEqual(expectedState);
    });
  });
});

import { TFavoritesData, favoriteData, getAsyncFavorites, postAsyncFavorite } from '..';
import { TOfferPreview, TOffersPreview } from '../../types';
import { makeFakeOffer, makeFakeOffersPreview } from '../../utils';

const initialState: TFavoritesData = {
  favorites: [],
  favoritesStatus: {
    status: false,
    message: '',
  },
  markStatus: {
    status: false,
    message: '',
  },
};
const fakeOffers = makeFakeOffersPreview();
let state: TFavoritesData;

describe('Reducer: favorite', () => {

  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: TFavoritesData = {
      favorites: [],
      favoritesStatus: {
        status: false,
        message: '',
      },
      markStatus: {
        status: false,
        message: '',
      },
    };

    expect(favoriteData.reducer(initialState, emptyAction)).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: TFavoritesData = {
      favorites: [],
      favoritesStatus: {
        status: false,
        message: '',
      },
      markStatus: {
        status: false,
        message: '',
      },
    };

    expect(favoriteData.reducer(undefined, emptyAction)).toEqual(expectedState);
  });

  describe('getAsyncFavorites test', () => {
    it('getAsyncFavorites fulfilled', () => {
      const expectedState = {
        favorites: fakeOffers,
        favoritesStatus: {
          status: true,
          message: 'fulfilled',
        },
        markStatus: {
          status: false,
          message: '',
        },
      };
      expect(
        favoriteData.reducer(state, {
          type: getAsyncFavorites.fulfilled.type,
          payload: fakeOffers,
        })
      ).toEqual(expectedState);
    });

    it('getAsyncFavorites rejected', () => {
      const expectedState = {
        favorites: [],
        favoritesStatus: {
          status: false,
          message: 'Unknown error',
        },
        markStatus: {
          status: false,
          message: '',
        },
      };
      expect(
        favoriteData.reducer(state, {
          type: getAsyncFavorites.rejected.type,
        })
      ).toEqual(expectedState);
    });
  });

  describe('postAsyncFavorite test', () => {
    it('postAsyncFavorite fulfilled', () => {
      const fakeOffer = makeFakeOffer() as unknown as TOfferPreview;
      const newFavorites: TOffersPreview = [];

      if (fakeOffer.isFavorite) {
        newFavorites.push(fakeOffer);
      }

      const expectedState: TFavoritesData = {
        favorites: newFavorites,
        favoritesStatus: {
          status: false,
          message: '',
        },
        markStatus: {
          status: true,
          message: '',
        },
      };

      expect(
        favoriteData.reducer(state, { type: postAsyncFavorite.fulfilled.type, payload: fakeOffer })
      ).toEqual(expectedState);
    });

    it('postAsyncFavorite rejected', () => {
      const expectedState: TFavoritesData = {
        favorites: [],
        favoritesStatus: {
          status: false,
          message: '',
        },
        markStatus: {
          status: false,
          message: 'Unknown error during asynchronous operation of mark/unmark a favorite offer on the server',
        },
      };
      expect(
        favoriteData.reducer(state, { type: postAsyncFavorite.rejected.type })
      ).toEqual(expectedState);
    });
  });
});


import { NameSpace } from '../../const';
import { TFavoritesData, selectFavorites, selectFavoritesCount, selectCitiesFromFavoritesMemo, selectIsEmptyFavorites } from '..';
import { makeFakeOffersPreview } from '../../utils';

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

let state = { [NameSpace.Favorite]: { ...initialState } };
const fakeOffersPreview = makeFakeOffersPreview();

describe('Reducer: favorite selectors', () => {
  beforeEach(() => {
    state = {
      [NameSpace.Favorite]: { ...initialState, favorites: fakeOffersPreview }
    };
  });

  describe('selector: selectFavorites', () => {
    it('should return "favorites" from state', () => {
      const result = selectFavorites(state);

      expect(result.length).toEqual(fakeOffersPreview.length);
    });
  });

  describe('selector: selectFavoritesCount', () => {
    it('should return "count" from state', () => {
      const result = selectFavoritesCount(state);

      expect(result).toEqual(fakeOffersPreview.length);
    });
  });

  describe('selector: selectCitiesFromFavoritesMemo', () => {
    it('should return "cities" from state "favorites"', () => {
      const favorites = selectFavorites(state);
      const cities = [...new Set(favorites.map((offer) => offer.city.name))];

      const result = selectCitiesFromFavoritesMemo(state);

      expect(result).toEqual(cities);
    });
  });

  describe('selector: selectIsEmptyFavorites', () => {
    it('should return the empty or non-empty state "favorites"', () => {
      const result = selectIsEmptyFavorites(state);

      expect(result).toEqual(!fakeOffersPreview.length);
    });
  });
});


import { NameSpace } from '../../const';
import { TOffersData, selectIsEmptyOffers, selectIsOffersLoading, selectOffers } from '..';
import { makeFakeOffersPreview } from '../../utils';

const fakeOffers = makeFakeOffersPreview();

const fakeState: TOffersData = {
  offers: fakeOffers,
  isOffersLoading: false,
};

let state = { [NameSpace.Offers]: fakeState };

describe('Reducer: offers selectors', () => {
  beforeEach(() => {
    state = { [NameSpace.Offers]: { ...fakeState } };
  });

  describe('selector: selectOffers', () => {
    it('should return "offers" from state', () => {
      const result = selectOffers(state);

      expect(result).toEqual(fakeOffers);
    });
  });

  describe('selector: selectIsOffersLoading', () => {
    it('should return "isOffersLoading" from state', () => {
      const result = selectIsOffersLoading(state);

      expect(result).toEqual(false);
    });
  });

  describe('selector: selectIsEmptyOffers', () => {
    it('should return empty or non-empty offers in the state', () => {
      const result = selectIsEmptyOffers(state);

      expect(result).toEqual(false);
    });
  });
});

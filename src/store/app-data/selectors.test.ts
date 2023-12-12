
import { NameSpace } from '../../const';
import { TAppData, selectCity, selectSorting } from '..';
import { getActiveCityByDefault } from '../../utils';

const initialState: TAppData = {
  city: getActiveCityByDefault(),
  sorting: 'POPULAR',
};

describe('Reducer: appData selectors', () => {
  const state = {
    [NameSpace.App]: { ...initialState },
  };

  it('Should return city from state', () => {
    const { city } = state[NameSpace.App];
    const result = selectCity(state);
    expect(result).toBe(city);
  });

  it('Should return step number from state', () => {
    const { sorting } = state[NameSpace.App];
    const result = selectSorting(state);
    expect(result).toBe(sorting);
  });
});

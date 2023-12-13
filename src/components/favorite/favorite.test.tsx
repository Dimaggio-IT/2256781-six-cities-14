import { render } from '@testing-library/react';
import { withStoreAndHistory } from '../../utils/mock-component';
import { Favorite } from '..';
import { makeFakeOffersPreview } from '../../utils';
import { NameSpace } from '../../const';
import { TCityName } from '../../types';

describe('Component: <Favorite />', () => {
  it('should render correctly with the default data', () => {
    const EXPECTED_FAVORITE_TEST_ID = {
      CONTAINER: 'favorite-container',
      LIST: 'favorite-list',
    };
    const { withStoreComponent: wrappedFavorite } = withStoreAndHistory(
      <Favorite />
    );

    const { getByTestId: getFavoriteElementsByTestId } =
      render(wrappedFavorite);

    const LIST_RESULTS = {
      CONTAINER: getFavoriteElementsByTestId(
        EXPECTED_FAVORITE_TEST_ID.CONTAINER
      ),
      LIST: getFavoriteElementsByTestId(EXPECTED_FAVORITE_TEST_ID.LIST),
    };

    expect(LIST_RESULTS.CONTAINER).toBeInTheDocument();
    expect(LIST_RESULTS.LIST).toBeInTheDocument();
  });

  it('Should render correctly with any city and a list of favorites', () => {
    const fakeOffersPreviewCount = 4;
    const fakeOffersPreview = makeFakeOffersPreview({
      length: fakeOffersPreviewCount,
    });
    const cityByDefault: TCityName = 'Cologne';
    fakeOffersPreview[0].city.name = cityByDefault;
    const favoriteItemTestId = 'favorites-item';
    const componentWithoutWrapper = <Favorite />;
    const initialState = {
      [NameSpace.Favorite]: {
        favorites: fakeOffersPreview,
        favoritesStatus: {
          status: true,
          message: '',
        },
        markStatus: {
          status: false,
          message: '',
        },
      },
    };
    const { withStoreComponent: wrappedFavorite } = withStoreAndHistory(
      componentWithoutWrapper,
      initialState
    );
    const {
      getAllByTestId: getAllFavoriteItemsById,
      getByText: getCityByDefault,
    } = render(wrappedFavorite);

    const favoriteItems = getAllFavoriteItemsById(favoriteItemTestId);
    const cityByDefaultElement = getCityByDefault(cityByDefault);

    expect(favoriteItems.length).toEqual(fakeOffersPreviewCount);
    expect(cityByDefaultElement).toBeTruthy();
  });
});

import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { App } from '..';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import {
  makeFakeOfferPreview,
  makeFakeOffersPreview,
  makeFakeState,
} from '../../utils';

describe('Component: <App />', () => {
  let mockHistory: MemoryHistory;
  let withHistoryApp: React.ReactElement;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    withHistoryApp = withHistory(<App />, mockHistory);
  });

  describe('route "/"', () => {
    it('should render the <Spinner /> when the offers have not loaded yet', () => {
      const { withStoreComponent } = withStore(
        withHistoryApp,
        makeFakeState({
          [NameSpace.Offers]: {
            offers: [],
            isOffersLoading: true,
          },
        })
      );
      const spinnerId = 'spinner-container';
      mockHistory.push(AppRoute.Main);

      render(withStoreComponent);

      expect(screen.getByTestId(spinnerId)).toBeInTheDocument();
    });

    it('should not render the <Spinner /> when the offers have already loaded', () => {
      const { withStoreComponent } = withStore(
        withHistoryApp,
        makeFakeState({
          [NameSpace.Offers]: {
            offers: [],
            isOffersLoading: false,
          },
        })
      );
      const spinnerId = 'spinner-container';
      mockHistory.push(AppRoute.Main);

      render(withStoreComponent);

      expect(screen.queryByTestId(spinnerId)).not.toBeInTheDocument();
    });

    it('should render <MainPage /> when the user navigates to "/"', () => {
      const fakeOffers = makeFakeOffersPreview();
      fakeOffers[0].city.name = 'Paris';
      const fakeStore = makeFakeState({
        [NameSpace.Offers]: {
          offers: fakeOffers,
          isOffersLoading: false,
        },
      });

      const { withStoreComponent } = withStore(withHistoryApp, fakeStore);
      mockHistory.push(AppRoute.Main);

      render(withStoreComponent);

      const citiesContainerId = 'cities-container';
      const tabsContainerId = 'tabs-container';
      const mapContainerId = 'map-container';

      expect(screen.getByTestId(citiesContainerId)).toBeInTheDocument();
      expect(screen.getByTestId(tabsContainerId)).toBeInTheDocument();
      expect(screen.getByTestId(mapContainerId)).toBeInTheDocument();
    });

    it('should render <NotFoundPlaces /> when the list of offers that we received from the server is empty', () => {
      const fakeStore = makeFakeState({
        [NameSpace.Offers]: {
          offers: [],
          isOffersLoading: false,
        },
      });

      const { withStoreComponent } = withStore(withHistoryApp, fakeStore);
      mockHistory.push(AppRoute.Main);

      const expectedCitiesStatus = 'No places to stay available';
      const expectedCitiesDescription =
        'We could not find any property available at the moment in Paris';
      mockHistory.push(AppRoute.Main);

      render(withStoreComponent);

      expect(screen.getByText(expectedCitiesStatus)).toBeInTheDocument();
      expect(screen.getByText(expectedCitiesDescription)).toBeInTheDocument();
    });
  });

  describe('route "/favorites"', () => {
    it('should render <FavoriteEmpty /> when the user is logged in and has no favorites', () => {
      const { withStoreComponent } = withStore(
        withHistoryApp,
        makeFakeState({
          [NameSpace.User]: {
            authorizationStatus: AuthorizationStatus.Auth,
            user: null,
          },
        })
      );
      const expectedTitle = 'Favorites (empty)';
      const expectedStatus = 'Nothing yet saved.';
      const expectedDescription =
        'Save properties to narrow down search or plan your future trips.';

      mockHistory.push(AppRoute.Favorites);
      render(withStoreComponent);

      expect(screen.getByText(expectedTitle)).toBeInTheDocument();
      expect(screen.getByText(expectedStatus)).toBeInTheDocument();
      expect(screen.getByText(expectedDescription)).toBeInTheDocument();
    });

    it('should render <Favorite /> when the user is logged in and has favorites', () => {
      const fakeOfferOne = makeFakeOfferPreview();
      const fakeOfferTwo = makeFakeOfferPreview();
      const { withStoreComponent } = withStore(
        withHistoryApp,
        makeFakeState({
          [NameSpace.User]: {
            authorizationStatus: AuthorizationStatus.Auth,
            user: null,
          },
          [NameSpace.Favorite]: {
            favorites: [fakeOfferOne, fakeOfferTwo],
            favoritesStatus: {
              status: false,
              message: '',
            },
            markStatus: {
              status: false,
              message: '',
            },
          },
        })
      );

      const expectedCount = 2;
      const favoritesItemId = 'favorites-item';
      const expectedTitle = 'Saved listing';
      const unexpectedTitle = 'Favorites (empty)';

      mockHistory.push(AppRoute.Favorites);
      render(withStoreComponent);

      const favoritesItems = screen.getAllByTestId(favoritesItemId);

      expect(screen.getByText(expectedTitle)).toBeInTheDocument();
      expect(favoritesItems.length).toBe(expectedCount);
      expect(screen.queryByText(unexpectedTitle)).not.toBeInTheDocument();
    });
  });

  describe('route "*"', () => {
    it('should render <NotFoundPage /> when the user navigates to a non-existent page', () => {
      const { withStoreComponent } = withStore(withHistoryApp, makeFakeState());
      const expectedTitle = '404. Page not found';

      mockHistory.push('/invalidRoute');
      render(withStoreComponent);

      expect(screen.getByText(expectedTitle)).toBeInTheDocument();
    });
  });
});

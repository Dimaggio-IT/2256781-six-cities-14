import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '..';
import { render, screen } from '@testing-library/react';
import { makeFakeState } from '../../utils';

describe('Component: <ProtectedRoute />', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('Should render component with the text "public route", when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const initialFakeStore = makeFakeState({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route
          path={AppRoute.Favorites}
          element={
            <ProtectedRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Login}
            >
              <span>{notExpectedText}</span>
            </ProtectedRoute>
          }
        />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(
      preparedComponent,
      initialFakeStore
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('Should render component with the text "private route", when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const initialFakeStore = makeFakeState({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
    });
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{notExpectedText}</span>} />
        <Route
          path={AppRoute.Favorites}
          element={
            <ProtectedRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Login}
            >
              <span>{expectedText}</span>
            </ProtectedRoute>
          }
        />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(
      preparedComponent,
      initialFakeStore
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});

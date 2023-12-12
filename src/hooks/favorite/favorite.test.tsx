import { renderHook } from '@testing-library/react';
import { useFavoritesMark } from '..';
import * as navigate from 'react-router';
import { createMemoryHistory } from 'history';
import {
  AppRoute,
  AuthorizationStatus,
  NameSpace,
  RequestStatus,
} from '../../const';
import {
  extractActionsTypes,
  makeFakeNearbyPlacesPreview,
  makeFakeOffer,
  makeFakeOfferPreview,
  makeFakeOffersPreview,
  makeFakeReviews,
  makeFakeState,
} from '../../utils';
import {
  makeMockStoreWithThunkAndState,
  makeMockStoreWrapperForHook,
  withStore,
} from '../../utils/mock-component';
import React from 'react';
import { TState } from '../../types';
import { act } from 'react-dom/test-utils';

type TWithProviderWrapperProps = {
  children: React.ReactElement;
};

const withProviderWrapperWithInitialState =
  (initialState: Partial<TState>) =>
    ({ children }: TWithProviderWrapperProps) =>
      withStore(children, makeFakeState(initialState)).withStoreComponent;

describe('Hook: useFavoritesMark', () => {
  const initialMockHistory = createMemoryHistory();
  const mockNavigate = () => initialMockHistory.push(AppRoute.Login);
  vi.spyOn(navigate, 'useNavigate').mockReturnValue(mockNavigate);

  beforeEach(() => {
    initialMockHistory.push('/anything');
  });

  it('Should return "changeFavoritesMark" function', () => {
    const fakeOffer = makeFakeOfferPreview();
    const id = fakeOffer.id;
    const flagStatus = false;
    const initialState = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      },
    };

    const wrapper = withProviderWrapperWithInitialState(initialState);
    const { result } = renderHook(() => useFavoritesMark(id, flagStatus), {
      wrapper,
    });

    expect(typeof result.current).toBe('function');
  });

  it('Should redirect to route "/login" when the user is not logged in', () => {
    const fakeOffer = makeFakeOfferPreview();
    const id = fakeOffer.id;
    const flagStatus = false;
    const initialState = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    };

    const wrapper = withProviderWrapperWithInitialState(initialState);
    const { result } = renderHook(() => useFavoritesMark(id, flagStatus), {
      wrapper,
    });

    const handleFavoriteClick = result.current;

    act(handleFavoriteClick);

    expect(initialMockHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('Should change "isFavorite" status and not redirect to route "/login" when the user has already logged in', () => {
    const fakeOffersPreview = makeFakeOffersPreview();
    const fakeNearbyPlacesPreview = makeFakeNearbyPlacesPreview();
    const fakeOffer = makeFakeOffer();
    const fakeReviews = makeFakeReviews();
    const id = fakeOffersPreview[0].id;
    const flagStatus = fakeOffersPreview[0].isFavorite;
    const initialState = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
      [NameSpace.Offers]: {
        offers: fakeOffersPreview,
        isOffersLoading: false,
      },
      [NameSpace.Offer]: {
        isOfferLoading: false,
        offer: fakeOffer,
        nearbyPlaces: fakeNearbyPlacesPreview,
        reviews: fakeReviews,
        reviewRequestStatus: RequestStatus.Success,
      },
    };

    const mockStore = makeMockStoreWithThunkAndState(
      makeFakeState(initialState)
    );
    const wrapper = makeMockStoreWrapperForHook(mockStore);
    const expectedAction = ['DATA/postFavorite/pending'];

    const { result } = renderHook(() => useFavoritesMark(id, flagStatus), {
      wrapper,
    });
    const handleFavoriteClick = result.current;

    act(handleFavoriteClick);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(initialMockHistory.location.pathname).toBe('/anything');
    expect(actions).toEqual(expectedAction);
  });
});

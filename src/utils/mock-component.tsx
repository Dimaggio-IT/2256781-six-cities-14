import { MemoryHistory, createMemoryHistory } from 'history';
import { HistoryRouter } from '../components/history-router/history-router';
import { HelmetProvider } from 'react-helmet-async';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { TState } from '../types';
import { AppThunkDispatch } from '.';
import { Action, Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>{component}</HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

function makeMockStoreWithThunkAndState(initialState: Partial<TState> = {}) {
  const axios = createAPI();
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    TState,
    Action<string>,
    AppThunkDispatch
  >(middleware);

  return mockStoreCreator(initialState);
}

function makeMockStoreWrapperForHook(store: Store): React.FC {
  const mockStoreWrapper = ({ children }: { children?: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return mockStoreWrapper;
}

function withStore(
  component: JSX.Element,
  initialState: Partial<TState> = {}
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    TState,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}

export {
  withHistory,
  withStore,
  makeMockStoreWithThunkAndState,
  makeMockStoreWrapperForHook,
};

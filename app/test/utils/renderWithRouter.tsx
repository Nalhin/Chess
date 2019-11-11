import { createStore, Store } from 'redux';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory, History } from 'history';
import * as React from 'react';
import { Router } from 'react-router-dom';
import { AppState, rootReducer } from '../../src/store/rootReducer';

export const renderWithStore = (
  ui: JSX.Element,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    route = '/',
    history = createMemoryHistory({
      initialEntries: [route],
    }),
  }: {
    initialState?: Partial<AppState>;
    store?: Store;
    route?: string;
    history?: History;
  } = {},
) => ({
  ...render(
    <Router history={history}>
      <Provider store={store}>{ui}</Provider>
    </Router>,
  ),
  store,
  history,
});

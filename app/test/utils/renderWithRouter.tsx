import { createStore, Store } from 'redux';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory, History } from 'history';
import * as React from 'react';
import { Router } from 'react-router-dom';
import { AppState, createRootReducer } from '../../src/store/rootReducer';
import { ThemeProvider } from '@material-ui/core';
import { muiTheme } from '../../src/styles/theme';

export const renderWithStore = (
  ui: JSX.Element,
  {
    initialState,
    route = '/',
    history = createMemoryHistory({
      initialEntries: [route],
    }),
    store = createStore(createRootReducer(history), initialState),
  }: {
    initialState?: Partial<AppState>;
    store?: Store;
    route?: string;
    history?: History;
  } = {},
) => ({
  ...render(
    <ThemeProvider theme={muiTheme}>
      <Router history={history}>
        <Provider store={store}>{ui}</Provider>
      </Router>
    </ThemeProvider>,
  ),
  store,
  history,
  theme: muiTheme,
});

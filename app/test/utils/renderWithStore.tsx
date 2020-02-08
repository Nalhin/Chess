import * as React from 'react';
import { createMemoryHistory, History } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { muiTheme } from '../../src/styles/theme';

export const renderWithRouter = (
  ui: JSX.Element,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: { route?: string; history?: History } = {},
) => {
  return {
    ...render(
      <ThemeProvider theme={muiTheme}>
        <Router history={history}>{ui}</Router>
      </ThemeProvider>,
    ),
    history,
    theme: muiTheme,
  };
};

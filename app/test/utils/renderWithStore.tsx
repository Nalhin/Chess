import * as React from 'react';
import { createMemoryHistory, History } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { getMuiTheme } from '../../src/styles/theme';
import { ColorMode } from '../../src/interfaces/Styles/ColorMode';

export const renderWithRouter = (
  ui: JSX.Element,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: { route?: string; history?: History } = {},
) => {
  return {
    ...render(
      <ThemeProvider theme={getMuiTheme(ColorMode.Light)}>
        <Router history={history}>{ui}</Router>
      </ThemeProvider>,
    ),
    history,
    theme: getMuiTheme(ColorMode.Light),
  };
};

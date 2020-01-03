import * as React from 'react';
import { createMemoryHistory, History } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { theme } from '../../src/styles/theme';
import { ThemeProvider } from '@emotion/core';

export const renderWithRouter = (
  ui: JSX.Element,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: { route?: string; history?: History } = {},
) => {
  return {
    ...render(
      <ThemeProvider theme={theme}>
        <Router history={history}>{ui}</Router>
      </ThemeProvider>,
    ),
    history,
    theme,
  };
};

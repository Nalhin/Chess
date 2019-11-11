import * as React from 'react';
import { createMemoryHistory, History } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

export const renderWithRouter = (
  ui: JSX.Element,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: { route?: string; history?: History } = {},
) => {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
};

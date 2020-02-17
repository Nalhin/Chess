import * as React from 'react';
import { createMemoryHistory, History } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { getMuiTheme } from '../../src/styles/muiTheme';
import { ColorTheme } from '../../src/interfaces/Styles/ColorTheme';
import { ColorModeContext } from '../../src/styles/colorModeContext';

export const renderWithRouter = (
  ui: JSX.Element,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: { route?: string; history?: History } = {},
) => {
  return {
    ...render(
      <ColorModeContext.Provider value={{ changeColorTheme: () => {} }}>
        <ThemeProvider theme={getMuiTheme(ColorTheme.Light)}>
          <Router history={history}>{ui}</Router>
        </ThemeProvider>
      </ColorModeContext.Provider>,
    ),
    history,
    theme: getMuiTheme(ColorTheme.Light),
  };
};

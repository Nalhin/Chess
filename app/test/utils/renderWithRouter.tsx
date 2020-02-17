import * as React from 'react';
import { createMemoryHistory, History } from 'history';
import { render } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { getMuiTheme } from '../../src/styles/muiTheme';
import { ColorTheme } from '../../src/interfaces/Styles/ColorTheme';
import { ColorModeContext } from '../../src/styles/colorModeContext';

export const renderWithRouter = (
  ui: JSX.Element,
  {
    path = '/',
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: { path?: string; route?: string; history?: History } = {},
) => {
  const changeColorTheme = jest.fn();

  return {
    ...render(
      <ColorModeContext.Provider value={{ changeColorTheme }}>
        <ThemeProvider theme={getMuiTheme(ColorTheme.Light)}>
          <Router history={history}>
            <Route path={path}>{ui}</Route>
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider>,
    ),
    history,
    changeColorTheme,
    theme: getMuiTheme(ColorTheme.Light),
  };
};

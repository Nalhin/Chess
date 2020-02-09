import * as React from 'react';
import { createMemoryHistory, History } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { getMuiTheme } from '../../src/styles/theme';
import { ColorMode } from '../../src/interfaces/Styles/ColorMode';
import { useColorTheme } from '../../src/styles/useColorTheme';
import { ColorModeContext } from '../../src/styles/colorModeContext';

export const renderWithRouter = (
  ui: JSX.Element,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: { route?: string; history?: History } = {},
) => {
  const { changeColorTheme } = useColorTheme();

  return {
    ...render(
      <ColorModeContext.Provider value={{ changeColorTheme }}>
        <ThemeProvider theme={getMuiTheme(ColorMode.Light)}>
          <Router history={history}>{ui}</Router>
        </ThemeProvider>
      </ColorModeContext.Provider>,
    ),
    history,
    theme: getMuiTheme(ColorMode.Light),
  };
};

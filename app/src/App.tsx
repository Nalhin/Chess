import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/store';
import ErrorBoundary from './ErrorBoundary';
import Pages from './pages/Pages';
import { Global } from '@emotion/core';
import { getMuiTheme } from './styles/theme';
import { globalStyles } from './styles/global';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { CssBaseline, StylesProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { useColorTheme } from './styles/useColorTheme';
import { ColorModeContext } from './styles/colorModeContext';

export const store = configureStore();

const App = () => {
  const { colorTheme, changeColorTheme } = useColorTheme();

  const theme = React.useMemo(() => getMuiTheme(colorTheme), [colorTheme]);

  return (
    <ErrorBoundary>
      <StylesProvider injectFirst>
        <Global styles={globalStyles} />
        <DndProvider backend={Backend}>
          <ColorModeContext.Provider value={{ changeColorTheme }}>
            <MuiThemeProvider theme={theme}>
              <Provider store={store}>
                <ConnectedRouter history={history}>
                  <CssBaseline />
                  <Pages />
                </ConnectedRouter>
              </Provider>
            </MuiThemeProvider>
          </ColorModeContext.Provider>
        </DndProvider>
      </StylesProvider>
    </ErrorBoundary>
  );
};

export default App;

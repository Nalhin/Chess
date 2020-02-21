import * as React from 'react';
import { Provider } from 'react-redux';
import { history, store } from './store/store';
import ErrorBoundary from './ErrorBoundary';
import Pages from './pages/Pages';
import { Global } from '@emotion/react';
import { getMuiTheme } from './styles/muiTheme';
import { CssBaseline, StylesProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { useColorTheme } from './styles/useColorTheme';
import { ColorModeContext } from './styles/colorModeContext';
import { useGlobalStyles } from './styles/useGlobalStyles';

const App = () => {
  const styles = useGlobalStyles();

  const { colorTheme, changeColorTheme } = useColorTheme();

  const theme = React.useMemo(() => getMuiTheme(colorTheme), [colorTheme]);

  return (
    <ErrorBoundary>
      <StylesProvider injectFirst>
        <Global styles={styles} />
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
      </StylesProvider>
    </ErrorBoundary>
  );
};

export default App;

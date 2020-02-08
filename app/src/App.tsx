import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/store';
import ErrorBoundary from './ErrorBoundary';
import Pages from './pages/Pages';
import { css, Global } from '@emotion/core';
import { muiTheme } from './styles/theme';
import { globalStyles } from './styles/global';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { CssBaseline, StylesProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

export const store = configureStore();

const globalStyle = css`
  ${globalStyles}
`;

const App = () => {
  return (
    <ErrorBoundary>
      <StylesProvider injectFirst>
        <Global styles={globalStyle} />
        <DndProvider backend={Backend}>
          <MuiThemeProvider theme={muiTheme}>
            <Provider store={store}>
              <ConnectedRouter history={history}>
                <CssBaseline />
                <Pages />
              </ConnectedRouter>
            </Provider>
          </MuiThemeProvider>
        </DndProvider>
      </StylesProvider>
    </ErrorBoundary>
  );
};

export default App;

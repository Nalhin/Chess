import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/store';
import ErrorBoundary from './ErrorBoundary';
import Pages from './pages/Pages';
import { css, Global, ThemeProvider } from '@emotion/core';
import { theme } from './styles/theme';
import { globalStyles } from './styles/global';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { CssBaseline, StylesProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';

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
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <ConnectedRouter history={history}>
                <CssBaseline />
                <Pages />
              </ConnectedRouter>
            </Provider>
          </ThemeProvider>
        </DndProvider>
      </StylesProvider>
    </ErrorBoundary>
  );
};

export default App;

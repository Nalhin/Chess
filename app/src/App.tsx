import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import ErrorBoundary from './ErrorBoundary';
import Pages from './pages/Pages';
import { css, Global, ThemeProvider } from '@emotion/core';
import { theme } from './styles/theme';
import { globalStyles } from './styles/global';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { CssBaseline, StylesProvider } from '@material-ui/core';

const global = css`
  ${globalStyles}
`;

const App = () => {
  return (
    <ErrorBoundary>
      <StylesProvider injectFirst>
        <Global styles={global} />
        <DndProvider backend={Backend}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <BrowserRouter basename={process.env.PUBLIC_URL}>
                <CssBaseline />
                <Pages />
              </BrowserRouter>
            </Provider>
          </ThemeProvider>
        </DndProvider>
      </StylesProvider>
    </ErrorBoundary>
  );
};

export default App;

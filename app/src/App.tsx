import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import ErrorBoundary from './ErrorBoundary';
import Pages from './pages/Pages';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Pages />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;

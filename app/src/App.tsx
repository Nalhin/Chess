import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div/>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;

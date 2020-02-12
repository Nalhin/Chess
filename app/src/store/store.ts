import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootSaga } from './rootSaga';
import { createRootReducer } from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const store = createStore(
    createRootReducer(history),
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, routerMiddleware(history)),
    ),
  );
  sagaMiddleware.run(rootSaga);

  return store;
}

export const store = configureStore();

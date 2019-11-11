import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { gameRootSaga } from './game/game.saga';

export function* rootSaga(): SagaIterator {
  yield all([fork(gameRootSaga)]);
}

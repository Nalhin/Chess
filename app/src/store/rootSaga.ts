import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { gameRootSaga } from './game/game.saga';
import { chatRootSaga } from './chat/chat.saga';

export function* rootSaga(): SagaIterator {
  yield all([fork(gameRootSaga), fork(chatRootSaga)]);
}

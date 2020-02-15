import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { gameRootSaga } from './game/game.saga';
import { chatRootSaga } from './chat/chat.saga';
import { userRootSaga } from './user/user.saga';
import { queueRootSaga } from './queue/queue.saga';
import { matchHistoryRootSaga } from './matchHistory/matchHistory.saga';

export function* rootSaga(): SagaIterator {
  yield all([
    fork(gameRootSaga),
    fork(chatRootSaga),
    fork(userRootSaga),
    fork(queueRootSaga),
    fork(matchHistoryRootSaga),
  ]);
}

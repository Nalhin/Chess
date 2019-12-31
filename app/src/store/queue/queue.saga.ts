import { StompSingleton } from '../../websocket/stompClient';
import { websocketTypes } from '../../websocket/websocketTypes';
import { select, take, takeEvery } from '@redux-saga/core/effects';
import { userSelector } from '../user/user.selectors';
import {
  JoinQueueAction,
  QueueActionTypes,
  QueueGameFoundAction,
} from './queue.types';
import { all } from 'redux-saga/effects';
import {
  queuePersonalSubscription,
  queueStateSubscription,
} from './queue.subscriptions';
import { put } from 'redux-saga-test-plan/matchers';
import { initChat } from '../chat/chat.actions';
import { initGameRequested } from '../game/game.actions';

export function* queueRootSaga() {
  yield all([
    yield takeEvery(QueueActionTypes.JOIN_QUEUE, joinQueueSaga),
    yield takeEvery(QueueActionTypes.QUEUE_GAME_FOUND, queueEndedSaga),
  ]);
}

export function* joinQueueSaga(action: JoinQueueAction) {
  const queueStomp = StompSingleton.getInstance(websocketTypes.QUEUE);

  const { login } = yield select(userSelector);
  const queueSubscription = queueStateSubscription(queueStomp);
  const queuePrivateSubscription = queuePersonalSubscription(queueStomp, login);

  queueStomp.publish({
    destination: `/app/queue`,
    headers: { name: login },
  });

  yield take(QueueActionTypes.QUEUE_GAME_FOUND);
  queueSubscription.unsubscribe();
  queuePrivateSubscription.unsubscribe();
}

export function* queueEndedSaga(action: QueueGameFoundAction) {
  yield put(initChat(action.payload.gameId));
  yield put(initGameRequested(action.payload.gameId));
}

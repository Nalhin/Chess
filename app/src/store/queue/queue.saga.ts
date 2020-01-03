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
import { push } from 'connected-react-router';
import { addToast } from '../toaster/toaster.action';
import { generateToast } from '../../utils/toastFactory';
import { ToastTypes } from '../../interfaces/ToastTypes';
import { isInQueueSelector } from './queue.selectors';

export function* queueRootSaga() {
  yield all([
    yield takeEvery(QueueActionTypes.JOIN_QUEUE, joinQueueSaga),
    yield takeEvery(QueueActionTypes.QUEUE_GAME_FOUND, queueEndedSaga),
  ]);
}

export function* joinQueueSaga(action: JoinQueueAction) {
  const queueStomp = StompSingleton.getInstance(websocketTypes.QUEUE);

  const [isInQueue, user] = yield all([
    select(isInQueueSelector),
    select(userSelector),
  ]);

  queueStomp.publish({
    destination: `/app/queue`,
    headers: { name: user.login },
  });

  if (isInQueue) {
    return;
  }

  const queueSubscription = queueStateSubscription(queueStomp);
  const queuePrivateSubscription = queuePersonalSubscription(
    queueStomp,
    user.login,
  );

  yield take(QueueActionTypes.QUEUE_GAME_FOUND);
  queueSubscription.unsubscribe();
  queuePrivateSubscription.unsubscribe();
}

export function* queueEndedSaga(action: QueueGameFoundAction) {
  const { gameId } = action.payload;
  yield put(initChat(gameId));
  yield put(initGameRequested(gameId));
  yield put(push(`/game/${gameId}`));
  yield put(addToast(generateToast('Game found!', ToastTypes.INFO)));
}

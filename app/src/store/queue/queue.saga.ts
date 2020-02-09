import { StompSingleton } from '../../websocket/stompClient';
import { WebsocketTypes } from '../../websocket/websocketTypes';
import { race, select, take, takeEvery } from '@redux-saga/core/effects';
import { userSelector } from '../user/user.selectors';
import {
  JoinQueueAction,
  JoinQueueAi,
  LeaveQueueAction,
  QueueActionTypes,
  QueueGameFoundAction,
} from './queue.types';
import { all } from 'redux-saga/effects';
import {
  queuePersonalSubscription,
  queueStateSubscription,
} from './queue.subscriptions';
import { call, fork, put } from 'redux-saga-test-plan/matchers';
import { initChat } from '../chat/chat.actions';
import { initGameRequested } from '../game/game.actions';
import { push } from 'connected-react-router';
import { addToast } from '../toaster/toaster.action';
import { generateToast } from '../../utils/toastFactory';
import { ToastTypes } from '../../interfaces/Toaster/ToastTypes';
import { isInQueueSelector } from './queue.selectors';
import { locations } from '../../contants/locations';
import { fetchJoinQueueAi } from './queue.api';
import { gameFound } from './queue.actions';

export function* queueRootSaga() {
  yield all([
    yield takeEvery(QueueActionTypes.JOIN_QUEUE, joinQueueSaga),
    yield takeEvery(QueueActionTypes.QUEUE_GAME_FOUND, queueGameFoundSaga),
    yield takeEvery(QueueActionTypes.LEAVE_QUEUE, leaveQueueSaga),
    yield takeEvery(QueueActionTypes.JOIN_QUEUE_AI, joinQueueAiSaga),
  ]);
}

export function* joinQueueSaga(action: JoinQueueAction) {
  const queueStomp = StompSingleton.getInstance(WebsocketTypes.QUEUE);

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

  yield race([
    take(QueueActionTypes.QUEUE_GAME_FOUND),
    take(QueueActionTypes.QUEUE_LEFT),
  ]);
  queueSubscription.unsubscribe();
  queuePrivateSubscription.unsubscribe();
  StompSingleton.deactivateInstance(WebsocketTypes.QUEUE);
}

export function* leaveQueueSaga(action: LeaveQueueAction) {
  const queueStomp = StompSingleton.getInstance(WebsocketTypes.QUEUE);

  const { login } = yield select(userSelector);

  queueStomp.publish({
    destination: `/app/leave-queue`,
    headers: { name: login },
  });
}

export function* joinQueueAiSaga(action: JoinQueueAi) {
  const { login } = yield select(userSelector);
  try {
    const response = yield call(fetchJoinQueueAi, login);
    yield fork(queueGameFoundSaga, gameFound(response.data.payload.gameId));
  } catch (e) {}
}

export function* queueGameFoundSaga(action: QueueGameFoundAction) {
  const { gameId } = action.payload;
  yield put(initChat(gameId));
  yield put(initGameRequested(gameId));
  yield put(push(`${locations.game}${gameId}`));
  yield put(addToast(generateToast('Game found!', ToastTypes.Info)));
}

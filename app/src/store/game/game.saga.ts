import { SagaIterator } from '@redux-saga/core';
import { all, select, take, takeEvery } from '@redux-saga/core/effects';
import {
  GameActionTypes,
  GameBaseActionTypes,
  GetAvailableMovesRequestedAction,
  InitGameRequestedAction,
  JoinGameQueueAction,
  MakeMoveRequestedAction,
} from './game.types';
import {
  gamePersonalSubscription,
  gameQueueSubscription,
  gameStateSubscription,
} from './game.subscriptions';
import { StompSingleton } from '../../websocket/stompClient';
import { gameIdSelector, selectedPieceSelector } from './game.selectors';
import { userSelector } from '../user/user.selectors';
import { websocketTypes } from '../../websocket/websocketTypes';
import { put } from 'redux-saga-test-plan/matchers';
import { initChat } from '../chat/chat.actions';

export function* gameRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(GameBaseActionTypes.INIT_GAME_REQUESTED, initGameSaga),
    yield takeEvery(
      GameBaseActionTypes.GET_AVAILABLE_MOVES_REQUESTED,
      getAvailableMovesSaga,
    ),
    yield takeEvery(GameBaseActionTypes.MAKE_MOVE_REQUESTED, makeMoveSaga),
    yield takeEvery(GameBaseActionTypes.JOIN_GAME_QUEUE, gameQueueSaga),
  ]);
}

export function* gameQueueSaga(action: JoinGameQueueAction): SagaIterator {
  const gameStomp = StompSingleton.getInstance(websocketTypes.GAME);

  const { login } = yield select(userSelector);
  const queueSubscription = gameQueueSubscription(gameStomp, login);

  gameStomp.publish({
    destination: `/app/queue`,
    headers: { name: login },
  });

  yield take(GameActionTypes.INIT_GAME_REQUESTED);
  queueSubscription.unsubscribe();
}

export function* initGameSaga(action: InitGameRequestedAction) {
  const gameStomp = StompSingleton.getInstance(websocketTypes.GAME);

  const gameId = action.payload.id;
  yield put(initChat(gameId));

  const { login } = yield select(userSelector);

  const gameSubscription = gameStateSubscription(gameStomp, gameId);
  const availableMoves = gamePersonalSubscription(gameStomp, gameId, login);

  gameStomp.publish({
    destination: `/app/connect/${gameId}`,
    headers: { name: login },
  });

  yield take(GameActionTypes.GAME_OVER);
  gameSubscription.unsubscribe();
  availableMoves.unsubscribe();
}

function* getAvailableMovesSaga(
  action: GetAvailableMovesRequestedAction,
): SagaIterator {
  const gameStomp = StompSingleton.getInstance(websocketTypes.GAME);
  const [gameId, user] = yield all([
    select(gameIdSelector),
    select(userSelector),
  ]);

  const { initialPosition } = action.payload;
  gameStomp.publish({
    destination: `/app/available-moves/${gameId}`,
    headers: { name: user.login },
    body: JSON.stringify(initialPosition),
  });
}

function* makeMoveSaga(action: MakeMoveRequestedAction): SagaIterator {
  const gameStomp = StompSingleton.getInstance(websocketTypes.GAME);

  const [initialPosition, gameId, user] = yield all([
    select(selectedPieceSelector),
    select(gameIdSelector),
    select(userSelector),
  ]);

  const { destinationPosition } = action.payload;
  gameStomp.publish({
    destination: `/app/move/${gameId}`,
    headers: { name: user.login },
    body: JSON.stringify({ initialPosition, destinationPosition }),
  });
}

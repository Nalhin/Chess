import { SagaIterator } from '@redux-saga/core';
import { all, select, take, takeEvery } from '@redux-saga/core/effects';
import {
  GameActionTypes,
  GameBaseActionTypes,
  GetAvailableMovesRequestedAction,
  InitGameAction,
  MakeMoveRequestedAction,
} from './game.types';
import {
  gamePersonalSubscription,
  gameStateSubscription,
} from './game.subscriptions';
import { StompSingleton } from '../../websocket/stompClient';
import { gameIdSelector, selectedPieceSelector } from './game.selectors';
import { userSelector } from '../user/user.selectors';
import { websocketTypes } from '../../websocket/websocketTypes';

export function* gameRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(GameBaseActionTypes.INIT_GAME, initGameSaga),
    yield takeEvery(
      GameBaseActionTypes.GET_AVAILABLE_MOVES,
      getAvailableMovesSaga,
    ),
    yield takeEvery(GameBaseActionTypes.MAKE_MOVE, makeMoveSaga),
  ]);
}

export function* initGameSaga(action: InitGameAction) {
  const gameStomp = StompSingleton.getInstance(websocketTypes.GAME);

  const gameId = action.payload.id;
  const { login } = yield select(userSelector);

  const gameSubscription = gameStateSubscription(gameStomp, gameId);
  const availableMoves = gamePersonalSubscription(gameStomp, gameId, login);

  gameStomp.publish({
    destination: `/app/connect/${gameId}`,
    headers: { name: login },
  });

  yield take(GameActionTypes.CLOSE_GAME);
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

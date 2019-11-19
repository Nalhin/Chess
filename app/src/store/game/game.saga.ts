import { SagaIterator } from '@redux-saga/core';
import { all, select, take, takeEvery } from '@redux-saga/core/effects';
import {
  GameActionTypes,
  GameBaseActionTypes,
  GetAvailableMovesRequestedAction,
  InitGameRequestedAction,
  MakeMoveRequestedAction,
} from './game.types';
import {
  gamePersonalSubscription,
  gameStateSubscription,
} from './game.subscriptions';
import { StompSingleton } from '../stompClient';
import { gameIdSelector, selectedPieceSelector } from './game.selectors';
import { userSelector } from '../user/user.selectors';

export function* gameRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(GameBaseActionTypes.INIT_GAME_REQUESTED, initGameSaga),
    yield takeEvery(
      GameBaseActionTypes.GET_AVAILABLE_MOVES_REQUESTED,
      getAvailableMovesSaga,
    ),
    yield takeEvery(GameBaseActionTypes.MAKE_MOVE_REQUESTED, makeMoveSaga),
  ]);
}

export function* initGameSaga(action: InitGameRequestedAction): SagaIterator {
  const gameStomp = StompSingleton.getInstance();

  const gameId = action.payload.id;

  const gameSubscription = gameStateSubscription(gameStomp, gameId);
  const availableMoves = gamePersonalSubscription(gameStomp, gameId);

  const { name } = yield select(userSelector);
  gameStomp.publish({
    destination: `/app/connect/${gameId}`,
    headers: { name },
  });

  yield take(GameActionTypes.GAME_OVER);
  gameSubscription.unsubscribe();
  availableMoves.unsubscribe();
  gameStomp.deactivate();
}

function* getAvailableMovesSaga(
  action: GetAvailableMovesRequestedAction,
): SagaIterator {
  const gameStomp = StompSingleton.getInstance();
  const [gameId, user] = yield all([
    select(gameIdSelector),
    select(userSelector),
  ]);

  const { initialPosition } = action.payload;
  gameStomp.publish({
    destination: `/app/available-moves/${gameId}`,
    headers: { name: user.name },
    body: JSON.stringify(initialPosition),
  });
}

function* makeMoveSaga(action: MakeMoveRequestedAction): SagaIterator {
  const gameStomp = StompSingleton.getInstance();

  const [initialPosition, gameId, user] = yield all([
    select(selectedPieceSelector),
    select(gameIdSelector),
    select(userSelector),
  ]);

  const { destinationPosition } = action.payload;
  gameStomp.publish({
    destination: `/app/move/${gameId}`,
    headers: { name: user.name },
    body: JSON.stringify({ initialPosition, destinationPosition }),
  });
}

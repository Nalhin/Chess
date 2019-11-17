import { SagaIterator } from '@redux-saga/core';
import { all, take, takeEvery } from '@redux-saga/core/effects';
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
import { userName } from './name';
import { gameId } from './gameId';
import { StompSingleton } from '../stompClient';

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

  const gameSubscription = gameStateSubscription(gameStomp, gameId);
  const availableMoves = gamePersonalSubscription(gameStomp, gameId);

  gameStomp.publish({
    destination: `/app/connect/${gameId}`,
    headers: { name: userName },
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

  const { initialPosition } = action.payload;
  gameStomp.publish({
    destination: `/app/available-moves/${gameId}`,
    headers: { name: userName },
    body: JSON.stringify(initialPosition),
  });
}

function* makeMoveSaga(action: MakeMoveRequestedAction): SagaIterator {
  const gameStomp = StompSingleton.getInstance();

  const { initialPosition, destinationPosition } = action.payload;
  gameStomp.publish({
    destination: `/app/move/${gameId}`,
    headers: { name: userName },
    body: JSON.stringify({
      playerMove: { initialPosition, destinationPosition },
    }),
  });
}

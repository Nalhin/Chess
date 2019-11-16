import { SagaIterator } from '@redux-saga/core';
import { all, setContext, take, takeEvery } from '@redux-saga/core/effects';
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
import { stompFactory } from '../stompClient';
import { userName } from './name';
import { gameId } from './gameId';

export function* gameRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(GameBaseActionTypes.INIT_GAME_REQUESTED, initGameSaga),
  ]);
}

function* initGameSaga(action: InitGameRequestedAction): SagaIterator {
  const gameStomp = stompFactory();
  yield setContext({ gameStomp });
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
): SagaIterator {}

function* makeMoveSaga(action: MakeMoveRequestedAction): SagaIterator {}

import { SagaIterator } from '@redux-saga/core';
import { all, take, takeEvery } from '@redux-saga/core/effects';
import {
  GameActionTypes,
  GetAvailableMovesRequestedAction,
  InitGameRequestedAction,
  MakeMoveRequestedAction,
} from './game.types';
import { stompFactory } from '../stompClient';
import {
  availableMovesSubscription,
  connectToGameSubscription,
  moveSubscription,
} from './game.subscriptions';

export function* gameRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(GameActionTypes.INIT_GAME_REQUESTED, initGameSaga),
  ]);
}

const gameId = '094657c6-a1b5-4c5b-bec7-6221bc11f69c';

function* initGameSaga(action: InitGameRequestedAction): SagaIterator {
  const stomp = stompFactory();
  connectToGameSubscription(stomp, gameId);
  stomp.publish({
    destination: `/app/create/${gameId}`,
  });
  yield take(GameActionTypes.INIT_GAME_SUCCEEDED);
  moveSubscription(stomp, gameId);
  availableMovesSubscription(stomp, gameId);
  stomp.publish({
    destination: `/app/available-moves/${gameId}/1#0`,
  });
}

function* getAvailableMovesSaga(
  action: GetAvailableMovesRequestedAction,
): SagaIterator {}

function* makeMoveSaga(action: MakeMoveRequestedAction): SagaIterator {}

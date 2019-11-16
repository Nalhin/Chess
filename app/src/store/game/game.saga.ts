import { SagaIterator } from '@redux-saga/core';
import { all, setContext, take, takeEvery } from '@redux-saga/core/effects';
import {
  GameActionTypes,
  GetAvailableMovesRequestedAction,
  InitGameRequestedAction,
  MakeMoveRequestedAction,
} from './game.types';
import {
  availableMovesSubscription,
  connectToGameSubscription,
} from './game.subscriptions';
import { stompFactory } from '../stompClient';
import { userName } from './name';

export function* gameRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(GameActionTypes.INIT_GAME_REQUESTED, initGameSaga),
  ]);
}

const gameId = '094657c6-a1b5-4c5b-bec7-6221bc11f69c';

function* initGameSaga(action: InitGameRequestedAction): SagaIterator {
  const game = stompFactory();
  yield setContext({ game });
  const gameSubscription = connectToGameSubscription(game, gameId);

  game.publish({
    destination: `/app/connect/${gameId}`,
    headers: { name: userName },
  });

  yield take(GameActionTypes.INIT_GAME_SUCCEEDED);
  const availableMoves = availableMovesSubscription(game, gameId);

  game.publish({
    destination: `/app/available-moves/${gameId}`,
    body: JSON.stringify({ x: 1, y: 2 }),
    headers: { name: userName },
  });

  yield take(GameActionTypes.MAKE_MOVE_FAILED);
  gameSubscription.unsubscribe();
  availableMoves.unsubscribe();
  game.deactivate();
}

function* getAvailableMovesSaga(
  action: GetAvailableMovesRequestedAction,
): SagaIterator {}

function* makeMoveSaga(action: MakeMoveRequestedAction): SagaIterator {}

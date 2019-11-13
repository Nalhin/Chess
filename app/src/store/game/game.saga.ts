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
  moveSubscription,
} from './game.subscriptions';
import { stompFactory } from '../stompClient';

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
    destination: `/app/create/${gameId}`,
  });

  yield take(GameActionTypes.INIT_GAME_SUCCEEDED);
  const move = moveSubscription(game, gameId);
  const availableMoves = availableMovesSubscription(game, gameId);

  game.publish({
    destination: `/app/available-moves/${gameId}/1#0`,
  });

  yield take(GameActionTypes.MAKE_MOVE_FAILED);
  gameSubscription.unsubscribe();
  move.unsubscribe();
  availableMoves.unsubscribe();
  game.deactivate();
}

function* getAvailableMovesSaga(
  action: GetAvailableMovesRequestedAction,
): SagaIterator {}

function* makeMoveSaga(action: MakeMoveRequestedAction): SagaIterator {}

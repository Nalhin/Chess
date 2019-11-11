import { SagaIterator } from '@redux-saga/core';
import { all, takeEvery } from '@redux-saga/core/effects';
import {
  GameActionTypes,
  GetAvailableMovesRequestedAction,
  InitGameRequestedAction,
  MakeMoveRequestedAction,
} from './game.types';

export function* gameRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(GameActionTypes.INIT_GAME_REQUESTED, initGameSaga),
  ]);
}

function* initGameSaga(action: InitGameRequestedAction): SagaIterator {}

function* getAvailableMovesSaga(
  action: GetAvailableMovesRequestedAction,
): SagaIterator {}

function* makeMoveSaga(action: MakeMoveRequestedAction): SagaIterator {}

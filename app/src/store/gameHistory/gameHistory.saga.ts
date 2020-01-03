import { SagaIterator } from '@redux-saga/core';
import { all, select, takeEvery } from '@redux-saga/core/effects';
import {
  GetHistoryGameByIdRequestedAction,
  GetHistoryGamesRequestedAction,
  HistoryActionTypes,
} from './gameHistory.types';
import { call, put } from 'redux-saga-test-plan/matchers';
import {
  getHistoryGameByIdFailed,
  getHistoryGameByIdSucceeded,
  getHistoryGamesFailed,
  getHistoryGamesSucceeded,
} from './gameHistory.actions';
import { fetchGetGameById, fetchGetGamesByLogin } from './gameHistory.api';
import { userSelector } from '../user/user.selectors';

export function* historyRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(
      HistoryActionTypes.GET_HISTORY_GAMES_REQUESTED,
      getHistoryGamesSaga,
    ),
    yield takeEvery(
      HistoryActionTypes.GET_HISTORY_GAME_BY_ID_REQUESTED,
      getHistoryGameByIdSaga,
    ),
  ]);
}

export function* getHistoryGamesSaga(action: GetHistoryGamesRequestedAction) {
  try {
    const { login } = yield select(userSelector);
    const response = yield call(fetchGetGamesByLogin, login);
    yield put(getHistoryGamesSucceeded(response.data));
  } catch (e) {
    yield put(getHistoryGamesFailed(e));
  }
}

export function* getHistoryGameByIdSaga(
  action: GetHistoryGameByIdRequestedAction,
) {
  try {
    const response = yield call(fetchGetGameById, action.payload.gameId);
    yield put(getHistoryGameByIdSucceeded(response.data));
  } catch (e) {
    yield put(getHistoryGameByIdFailed(e));
  }
}

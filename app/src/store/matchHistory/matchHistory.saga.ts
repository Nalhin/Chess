import { SagaIterator } from '@redux-saga/core';
import { all, select, takeEvery } from '@redux-saga/core/effects';
import {
  GetMatchDetailsRequestedAction,
  GetMatchHistoryRequestedAction,
  MatchHistoryActionTypes,
} from './matchHistory.types';
import { call, put } from 'redux-saga-test-plan/matchers';
import {
  getHistoryGameByIdFailed,
  getHistoryGameByIdSucceeded,
  getHistoryGamesFailed,
  getHistoryGamesSucceeded,
} from './matchHistory.actions';
import { fetchGetMatchDetails, fetchGetMatchHistory } from './matchHistory.api';
import { userSelector } from '../user/user.selectors';

export function* matchHistoryRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(
      MatchHistoryActionTypes.GET_MATCH_HISTORY_REQUESTED,
      getMatchHistorySaga,
    ),
    yield takeEvery(
      MatchHistoryActionTypes.GET_MATCH_DETAILS_REQUESTED,
      getMatchDetailsSaga,
    ),
  ]);
}

export function* getMatchHistorySaga(action: GetMatchHistoryRequestedAction) {
  try {
    const { login } = yield select(userSelector);
    const response = yield call(fetchGetMatchHistory, login);
    yield put(getHistoryGamesSucceeded(response.data));
  } catch (e) {
    yield put(getHistoryGamesFailed(e));
  }
}

export function* getMatchDetailsSaga(action: GetMatchDetailsRequestedAction) {
  try {
    const response = yield call(fetchGetMatchDetails, action.payload.gameId);
    yield put(getHistoryGameByIdSucceeded(response.data));
  } catch (e) {
    yield put(getHistoryGameByIdFailed(e));
  }
}

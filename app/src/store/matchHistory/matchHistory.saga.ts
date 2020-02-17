import { SagaIterator } from '@redux-saga/core';
import { all, takeEvery } from '@redux-saga/core/effects';
import {
  GetMatchDetailsRequestedAction,
  GetMatchHistoryRequestedAction,
  MatchHistoryActionTypes,
} from './matchHistory.types';
import { call, put } from 'redux-saga-test-plan/matchers';
import {
  getMatchDetailsFailed,
  getMatchDetailsSucceeded,
  getMatchHistoryFailed,
  getMatchHistorySucceeded,
} from './matchHistory.actions';
import { fetchGetMatchDetails, fetchGetMatchHistory } from './matchHistory.api';
import { addToast } from '../toaster/toaster.action';
import { generateToast } from '../../utils/generateToast';
import { generateErrorMessage } from '../../utils/generateErrorMessage';
import { ToastTypes } from '../../interfaces/Toaster/ToastTypes';

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
    const response = yield call(fetchGetMatchHistory, action.payload.login);
    yield put(getMatchHistorySucceeded(response.data));
  } catch (e) {
    yield put(
      addToast(generateToast(generateErrorMessage(e), ToastTypes.Error)),
    );
    yield put(getMatchHistoryFailed());
  }
}

export function* getMatchDetailsSaga(action: GetMatchDetailsRequestedAction) {
  try {
    const response = yield call(fetchGetMatchDetails, action.payload.gameId);
    yield put(getMatchDetailsSucceeded(response.data));
  } catch (e) {
    yield put(
      addToast(generateToast(generateErrorMessage(e), ToastTypes.Error)),
    );
    yield put(getMatchDetailsFailed());
  }
}

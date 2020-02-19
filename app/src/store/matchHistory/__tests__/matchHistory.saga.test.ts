import { getMatchDetailsSaga, getMatchHistorySaga } from '../matchHistory.saga';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import {
  getMatchDetailsFailed,
  getMatchDetailsRequested,
  getMatchDetailsSucceeded,
  getMatchHistoryFailed,
  getMatchHistoryRequested,
  getMatchHistorySucceeded,
} from '../matchHistory.actions';
import { fakeUser } from '../../../../test/fixtures/user/fakeUser';
import * as matchHistoryApi from '../matchHistory.api';
import { fakeMatchHistory } from '../../../../test/fixtures/matchHistory/fakeMatchHistory';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { addToast } from '../../toaster/toaster.action';
import { fakeToaster } from '../../../../test/fixtures/toaster/fakeToaster';
import { fakeMatchDetails } from '../../../../test/fixtures/matchHistory/fakeMatchDetails';

jest.mock('../matchHistory.api', () => ({
  fetchGetMatchHistory: jest.fn(),
  fetchGetMatchDetails: jest.fn(),
}));

describe('getMatchHistorySaga', () => {
  it('should call api and dispatch actions properly', () => {
    testSaga(getMatchHistorySaga, getMatchHistoryRequested(fakeUser.login))
      .next()
      .call(matchHistoryApi.fetchGetMatchHistory, fakeUser.login)
      .next({ data: fakeMatchHistory })
      .put(getMatchHistorySucceeded(fakeMatchHistory))
      .finish();
  });

  it('should handle api errors', () => {
    return expectSaga(
      getMatchHistorySaga,
      getMatchHistoryRequested(fakeUser.login),
    )
      .provide([
        [
          call(matchHistoryApi.fetchGetMatchHistory, fakeUser.login),
          throwError(new Error()),
        ],
      ])
      .put(getMatchHistoryFailed())
      .put.like({ action: { type: addToast(fakeToaster).type } })
      .run();
  });
});

describe('getMatchDetailsSaga', () => {
  it('should call api and dispatch actions properly', () => {
    testSaga(getMatchDetailsSaga, getMatchDetailsRequested(1))
      .next()
      .call(matchHistoryApi.fetchGetMatchDetails, 1)
      .next({ data: fakeMatchDetails })
      .put(getMatchDetailsSucceeded(fakeMatchDetails))
      .finish();
  });
  it('should handle api errors', () => {
    return expectSaga(getMatchDetailsSaga, getMatchDetailsRequested(1))
      .provide([
        [
          call(matchHistoryApi.fetchGetMatchDetails, 1),
          throwError(new Error()),
        ],
      ])
      .put(getMatchDetailsFailed())
      .put.like({ action: { type: addToast(fakeToaster).type } })
      .run();
  });
});

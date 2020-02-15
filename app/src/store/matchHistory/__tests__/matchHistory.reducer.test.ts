import matchHistoryReducer, {
  MATCH_HISTORY_INITIAL_STATE,
} from '../matchHistory.reducer';
import produce from 'immer';
import {
  clearMatchHistory,
  getMatchDetailsFailed,
  getMatchDetailsRequested,
  getMatchDetailsSucceeded,
  getMatchHistoryFailed,
  getMatchHistoryRequested,
  getMatchHistorySucceeded,
} from '../matchHistory.actions';
import { fakeUser } from '../../../../test/fixtures/user/user';
import { fakeMatchHistory } from '../../../../test/fixtures/matchHistory/fakeMatchHistory';
import { fakeMatchDetails } from '../../../../test/fixtures/matchHistory/fakeMatchDetails';

describe('Match history reducer', () => {
  it('should handle GET_MATCH_DETAILS_REQUESTED action', () => {
    const initialState = {
      ...MATCH_HISTORY_INITIAL_STATE,
    };
    const expectedState = produce(MATCH_HISTORY_INITIAL_STATE, draft => {
      draft.matchDetails.isLoading = true;
    });

    const action = getMatchDetailsRequested(1);
    const reducer = matchHistoryReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle GET_MATCH_DETAILS_FAILED action', () => {
    const initialState = produce(MATCH_HISTORY_INITIAL_STATE, draft => {
      draft.matchDetails.isLoading = true;
    });
    const expectedState = {
      ...MATCH_HISTORY_INITIAL_STATE,
    };

    const action = getMatchDetailsFailed();
    const reducer = matchHistoryReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle GET_MATCH_DETAILS_SUCCEEDED action', () => {
    const initialState = produce(MATCH_HISTORY_INITIAL_STATE, draft => {
      draft.matchDetails.isLoading = true;
    });
    const expectedState = produce(MATCH_HISTORY_INITIAL_STATE, draft => {
      draft.matchDetails.data[fakeMatchDetails.gameId] = fakeMatchDetails;
    });

    const action = getMatchDetailsSucceeded(fakeMatchDetails);
    const reducer = matchHistoryReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle GET_MATCH_HISTORY_REQUESTED action', () => {
    const initialState = {
      ...MATCH_HISTORY_INITIAL_STATE,
    };
    const expectedState = produce(MATCH_HISTORY_INITIAL_STATE, draft => {
      draft.matches.isLoading = true;
    });

    const action = getMatchHistoryRequested(fakeUser.login);
    const reducer = matchHistoryReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle GET_MATCH_HISTORY_FAILED action', () => {
    const initialState = produce(MATCH_HISTORY_INITIAL_STATE, draft => {
      draft.matches.isLoading = true;
    });
    const expectedState = {
      ...MATCH_HISTORY_INITIAL_STATE,
    };

    const action = getMatchHistoryFailed();
    const reducer = matchHistoryReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle GET_MATCH_HISTORY_SUCCEEDED action', () => {
    const initialState = produce(MATCH_HISTORY_INITIAL_STATE, draft => {
      draft.matches.isLoading = true;
    });
    const expectedState = produce(MATCH_HISTORY_INITIAL_STATE, draft => {
      draft.matches.data = fakeMatchHistory;
    });

    const action = getMatchHistorySucceeded(fakeMatchHistory);
    const reducer = matchHistoryReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('should handle CLEAR_MATCH_HISTORY action', () => {
    const initialState = produce(MATCH_HISTORY_INITIAL_STATE, draft => {
      draft.matches.isLoading = true;
      draft.matches.data = fakeMatchHistory;
      draft.matchDetails.isLoading = true;
      draft.matchDetails.data = fakeMatchDetails;
    });
    const expectedState = {
      ...MATCH_HISTORY_INITIAL_STATE,
    };

    const action = clearMatchHistory();
    const reducer = matchHistoryReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
});

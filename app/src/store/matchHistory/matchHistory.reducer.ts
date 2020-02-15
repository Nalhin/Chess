import {
  MatchHistoryActions,
  MatchHistoryActionTypes,
  MatchHistoryState,
} from './matchHistory.types';
import { Reducer } from 'redux';
import produce from 'immer';

export const MATCH_HISTORY_INITIAL_STATE: MatchHistoryState = {
  matches: { data: [], isLoading: false },
  matchDetails: { data: {}, isLoading: false },
};

const matchHistoryReducer: Reducer<MatchHistoryState, MatchHistoryActions> = (
  state = MATCH_HISTORY_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case MatchHistoryActionTypes.GET_MATCH_DETAILS_REQUESTED:
        draft.matchDetails.isLoading = true;
        break;
      case MatchHistoryActionTypes.GET_MATCH_DETAILS_FAILED:
        draft.matchDetails.isLoading = false;
        break;
      case MatchHistoryActionTypes.GET_MATCH_DETAILS_SUCCEEDED:
        draft.matchDetails.data[action.payload.historyGame.gameId] =
          action.payload.historyGame;
        draft.matchDetails.isLoading = false;
        break;
      case MatchHistoryActionTypes.GET_MATCH_HISTORY_REQUESTED:
        draft.matches.isLoading = true;
        break;
      case MatchHistoryActionTypes.GET_MATCH_HISTORY_FAILED:
        draft.matches.isLoading = false;
        break;
      case MatchHistoryActionTypes.GET_MATCH_HISTORY_SUCCEEDED:
        draft.matches.data = action.payload.historyGames;
        draft.matches.isLoading = false;
        break;
      case MatchHistoryActionTypes.CLEAR_MATCH_HISTORY:
        draft.matches = MATCH_HISTORY_INITIAL_STATE.matches;
        draft.matchDetails = MATCH_HISTORY_INITIAL_STATE.matchDetails;
        break;
      default:
        break;
    }
  });
};

export default matchHistoryReducer;

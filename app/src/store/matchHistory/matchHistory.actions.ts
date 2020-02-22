import {
  ClearMatchHistoryAction,
  GetMatchDetailsFailedAction,
  GetMatchDetailsRequestedAction,
  GetMatchDetailsSucceededAction,
  GetMatchHistoryFailedAction,
  GetMatchHistoryRequestedAction,
  GetMatchHistorySucceededAction,
  MatchHistoryActionTypes,
} from './matchHistory.types';
import {
  MatchHistoryGameWithDetails,
  MatchHistoryGameWithTurnCount,
} from '../../interfaces/MatchHistoryGame/MatchHistoryGameBase';

export const getMatchDetailsRequested = (
  gameId: string,
): GetMatchDetailsRequestedAction => ({
  type: MatchHistoryActionTypes.GET_MATCH_DETAILS_REQUESTED,
  payload: {
    gameId,
  },
});

export const getMatchDetailsSucceeded = (
  historyGame: MatchHistoryGameWithDetails,
): GetMatchDetailsSucceededAction => ({
  type: MatchHistoryActionTypes.GET_MATCH_DETAILS_SUCCEEDED,
  payload: {
    matchDetails: historyGame,
  },
});

export const getMatchDetailsFailed = (): GetMatchDetailsFailedAction => ({
  type: MatchHistoryActionTypes.GET_MATCH_DETAILS_FAILED,
});

export const getMatchHistoryRequested = (
  login: string,
): GetMatchHistoryRequestedAction => ({
  type: MatchHistoryActionTypes.GET_MATCH_HISTORY_REQUESTED,
  payload: {
    login,
  },
});

export const getMatchHistoryFailed = (): GetMatchHistoryFailedAction => ({
  type: MatchHistoryActionTypes.GET_MATCH_HISTORY_FAILED,
});

export const getMatchHistorySucceeded = (
  matchHistory: MatchHistoryGameWithTurnCount[],
): GetMatchHistorySucceededAction => ({
  type: MatchHistoryActionTypes.GET_MATCH_HISTORY_SUCCEEDED,
  payload: {
    matchHistory,
  },
});

export const clearMatchHistory = (): ClearMatchHistoryAction => ({
  type: MatchHistoryActionTypes.CLEAR_MATCH_HISTORY,
});

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

export const getHistoryGameByIdRequested = (
  gameId: number,
): GetMatchDetailsRequestedAction => ({
  type: MatchHistoryActionTypes.GET_MATCH_DETAILS_REQUESTED,
  payload: {
    gameId,
  },
});

export const getHistoryGameByIdSucceeded = (
  historyGame: MatchHistoryGameWithDetails,
): GetMatchDetailsSucceededAction => ({
  type: MatchHistoryActionTypes.GET_MATCH_DETAILS_SUCCEEDED,
  payload: {
    historyGame,
  },
});

export const getHistoryGameByIdFailed = (
  error: string,
): GetMatchDetailsFailedAction => ({
  type: MatchHistoryActionTypes.GET_MATCH_DETAILS_FAILED,
  payload: { error },
});

export const getHistoryGamesRequested = (): GetMatchHistoryRequestedAction => ({
  type: MatchHistoryActionTypes.GET_MATCH_HISTORY_REQUESTED,
});

export const getHistoryGamesFailed = (
  error: string,
): GetMatchHistoryFailedAction => ({
  type: MatchHistoryActionTypes.GET_MATCH_HISTORY_FAILED,
  payload: {
    error,
  },
});

export const getHistoryGamesSucceeded = (
  historyGames: MatchHistoryGameWithTurnCount[],
): GetMatchHistorySucceededAction => ({
  type: MatchHistoryActionTypes.GET_MATCH_HISTORY_SUCCEEDED,
  payload: {
    historyGames,
  },
});

export const clearMatchHistory = (): ClearMatchHistoryAction => ({
  type: MatchHistoryActionTypes.CLEAR_MATCH_HISTORY,
});

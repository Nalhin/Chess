import {
  GetHistoryGameByIdFailedAction,
  GetHistoryGameByIdRequestedAction,
  GetHistoryGameByIdSucceededAction,
  GetHistoryGamesFailedAction,
  GetHistoryGamesRequestedAction,
  GetHistoryGamesSucceededAction,
  HistoryActionTypes,
} from './gameHistory.types';
import {
  HistoryGameWithTurnCount,
  HistoryGameWithTurns,
} from '../../interfaces/History/HistoryGame';

export const getHistoryGameByIdRequested = (
  gameId: number,
): GetHistoryGameByIdRequestedAction => ({
  type: HistoryActionTypes.GET_HISTORY_GAME_BY_ID_REQUESTED,
  payload: {
    gameId,
  },
});

export const getHistoryGameByIdSucceeded = (
  historyGame: HistoryGameWithTurns,
): GetHistoryGameByIdSucceededAction => ({
  type: HistoryActionTypes.GET_HISTORY_GAME_BY_ID_SUCCEEDED,
  payload: {
    historyGame,
  },
});

export const getHistoryGameByIdFailed = (
  error: string,
): GetHistoryGameByIdFailedAction => ({
  type: HistoryActionTypes.GET_HISTORY_GAME_BY_ID_FAILED,
  payload: { error },
});

export const getHistoryGamesRequested = (): GetHistoryGamesRequestedAction => ({
  type: HistoryActionTypes.GET_HISTORY_GAMES_REQUESTED,
});

export const getHistoryGamesFailed = (
  error: string,
): GetHistoryGamesFailedAction => ({
  type: HistoryActionTypes.GET_HISTORY_GAMES_FAILED,
  payload: {
    error,
  },
});

export const getHistoryGamesSucceeded = (
  historyGames: HistoryGameWithTurnCount[],
): GetHistoryGamesSucceededAction => ({
  type: HistoryActionTypes.GET_HISTORY_GAMES_SUCCEEDED,
  payload: {
    historyGames,
  },
});

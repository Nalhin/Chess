import {
  HistoryGameWithTurnCount,
  HistoryGameWithTurns,
} from '../../interfaces/HistoryGame';

export interface HistoryState {
  readonly historyGames: {
    data: HistoryGameWithTurnCount[];
    isLoading: boolean;
  };
  readonly individualGames: {
    data: { [key: number]: HistoryGameWithTurns };
    isLoading: boolean;
  };
}

export enum HistoryActionTypes {
  GET_HISTORY_GAME_BY_ID_REQUESTED = 'GET_HISTORY_GAME_BY_ID_REQUESTED',
  GET_HISTORY_GAME_BY_ID_SUCCEEDED = 'GET_HISTORY_GAME_BY_ID_SUCCEEDED',
  GET_HISTORY_GAME_BY_ID_FAILED = 'GET_HISTORY_GAME_BY_ID_FAILED',
  GET_HISTORY_GAMES_REQUESTED = 'GET_HISTORY_GAMES_REQUESTED',
  GET_HISTORY_GAMES_SUCCEEDED = 'GET_HISTORY_GAMES_SUCCEEDED',
  GET_HISTORY_GAMES_FAILED = 'GET_HISTORY_GAMES_FAILED',
}

export interface GetHistoryGameByIdRequestedAction {
  type: HistoryActionTypes.GET_HISTORY_GAME_BY_ID_REQUESTED;
  payload: {
    gameId: number;
  };
}

export interface GetHistoryGameByIdSucceededAction {
  type: HistoryActionTypes.GET_HISTORY_GAME_BY_ID_SUCCEEDED;
  payload: {
    historyGame: HistoryGameWithTurns;
  };
}

export interface GetHistoryGameByIdFailedAction {
  type: HistoryActionTypes.GET_HISTORY_GAME_BY_ID_FAILED;
  payload: {
    error: string;
  };
}

export interface GetHistoryGamesRequestedAction {
  type: HistoryActionTypes.GET_HISTORY_GAMES_REQUESTED;
}

export interface GetHistoryGamesFailedAction {
  type: HistoryActionTypes.GET_HISTORY_GAMES_FAILED;
  payload: {
    error: string;
  };
}

export interface GetHistoryGamesSucceededAction {
  type: HistoryActionTypes.GET_HISTORY_GAMES_SUCCEEDED;
  payload: {
    historyGames: HistoryGameWithTurnCount[];
  };
}

export type HistoryActions =
  | GetHistoryGameByIdRequestedAction
  | GetHistoryGameByIdSucceededAction
  | GetHistoryGameByIdFailedAction
  | GetHistoryGamesRequestedAction
  | GetHistoryGamesFailedAction
  | GetHistoryGamesSucceededAction;

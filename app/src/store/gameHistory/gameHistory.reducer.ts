import {
  HistoryActions,
  HistoryActionTypes,
  HistoryState,
} from './gameHistory.types';
import { Reducer } from 'redux';
import produce from 'immer';

export const HISTORY_INITIAL_STATE: HistoryState = {
  historyGames: { data: [], isLoading: false },
  individualGames: { data: {}, isLoading: false },
};

const gameHistoryReducer: Reducer<HistoryState, HistoryActions> = (
  state = HISTORY_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case HistoryActionTypes.GET_HISTORY_GAME_BY_ID_REQUESTED:
        draft.individualGames.isLoading = true;
        break;
      case HistoryActionTypes.GET_HISTORY_GAME_BY_ID_FAILED:
        draft.individualGames.isLoading = false;
        break;
      case HistoryActionTypes.GET_HISTORY_GAME_BY_ID_SUCCEEDED:
        draft.individualGames.data[action.payload.historyGame.gameId] =
          action.payload.historyGame;
        draft.individualGames.isLoading = false;
        break;
      case HistoryActionTypes.GET_HISTORY_GAMES_REQUESTED:
        draft.historyGames.isLoading = true;
        break;
      case HistoryActionTypes.GET_HISTORY_GAMES_FAILED:
        draft.historyGames.isLoading = false;
        break;
      case HistoryActionTypes.GET_HISTORY_GAMES_SUCCEEDED:
        draft.historyGames.data = action.payload.historyGames;
        draft.historyGames.isLoading = false;
        break;
      default:
        break;
    }
  });
};

export default gameHistoryReducer;

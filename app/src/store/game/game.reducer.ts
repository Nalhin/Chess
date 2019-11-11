import { GameActions, GameActionTypes, GameState } from './game.types';
import { Reducer } from 'react';
import produce from 'immer';

export const GAME_INITIAL_STATE: GameState = {
  board: [[]],
  availableMoves: [],
};

const gameReducer: Reducer<GameState, GameActions> = (
  state = GAME_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case GameActionTypes.INIT_GAME_REQUESTED:
        break;
      case GameActionTypes.INIT_GAME_SUCCEEDED:
        break;
      case GameActionTypes.INIT_GAME_FAILED:
        break;
      case GameActionTypes.GET_AVAILABLE_MOVES_REQUESTED:
        break;
      case GameActionTypes.GET_AVAILABLE_MOVES_SUCCEEDED:
        break;
      case GameActionTypes.GET_AVAILABLE_MOVES_FAILED:
        break;
      case GameActionTypes.MAKE_MOVE_REQUESTED:
        break;
      case GameActionTypes.MAKE_MOVE_SUCCEEDED:
        break;
      case GameActionTypes.MAKE_MOVE_FAILED:
        break;
      default:
        break;
    }
  });
};

export default gameReducer;

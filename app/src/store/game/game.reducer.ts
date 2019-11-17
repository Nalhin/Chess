import { GameActions, GameActionTypes, GameState } from './game.types';
import { Reducer } from 'react';
import produce from 'immer';
import { Player } from '../../inferfaces/player';
import { GamePhase } from '../../inferfaces/game';
import { BoardPosition } from '../../inferfaces/boardPosition';

export const GAME_INITIAL_STATE: GameState = {
  game: {
    board: { state: [[]] },
    currentTurn: {} as Player,
    gameState: GamePhase.WAITING_FOR_PLAYERS,
    graveyards: {
      whiteGraveyard: [],
      blackGraveyard: [],
    },
    players: {
      whitePlayer: {} as Player,
      blackPlayer: {} as Player,
    },
  },
  selectedPiece: {
    availableMoves: [],
    position: {} as BoardPosition,
  },
};

const gameReducer: Reducer<GameState, GameActions> = (
  state = GAME_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case GameActionTypes.GAME_STARTED:
        draft.game = action.payload.game;
        break;
      case GameActionTypes.PLAYER_MOVED:
        draft.game = action.payload.game;
        break;
      case GameActionTypes.GAME_OVER:
        draft.game = action.payload.game;
        break;
      case GameActionTypes.AVAILABLE_MOVES:
        draft.selectedPiece = action.payload;
        break;
      case GameActionTypes.AVAILABLE_MOVES_ERROR:
        break;
      case GameActionTypes.SET_SELECTED_PIECE:
        draft.selectedPiece.position = action.payload.position;
        break;
      default:
        break;
    }
  });
};

export default gameReducer;

import {
  GameActions,
  GameActionTypes,
  GameBaseActionTypes,
  GameState,
} from './game.types';
import { Reducer } from 'react';
import produce from 'immer';
import { Player, PlayerColor } from '../../interfaces/player';
import { GamePhase } from '../../interfaces/game';
import { BoardPosition } from '../../interfaces/boardPosition';

export const GAME_INITIAL_STATE: GameState = {
  gameState: {
    board: {
      state: [[]],
      graveyards: {
        whiteGraveyard: [],
        blackGraveyard: [],
      },
    },
    currentTurn: PlayerColor.WHITE,
    gamePhase: GamePhase.WAITING_FOR_PLAYERS,
    players: {
      whitePlayer: {} as Player,
      blackPlayer: {} as Player,
    },
  },
  selectedPiece: {
    availableMoves: [],
    position: {} as BoardPosition,
  },
  error: '',
  gameId: '',
};

const gameReducer: Reducer<GameState, GameActions> = (
  state = GAME_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case GameBaseActionTypes.INIT_GAME:
        draft.gameId = action.payload.id;
        break;
      case GameActionTypes.GAME_STARTED:
        draft.gameState = action.payload.game;
        break;
      case GameActionTypes.PLAYER_MOVED:
        draft.gameState = action.payload.game;
        draft.selectedPiece = GAME_INITIAL_STATE.selectedPiece;
        break;
      case GameActionTypes.GAME_OVER:
        draft.gameState = action.payload.game;
        break;
      case GameActionTypes.AVAILABLE_MOVES:
        draft.selectedPiece = action.payload;
        break;
      case GameActionTypes.ERROR:
        draft.error = action.payload.error;
        break;
      case GameActionTypes.GAME_FOUND:
        draft.gameId = action.payload.gameId;
        break;
      case GameActionTypes.CLOSE_GAME:
        draft = GAME_INITIAL_STATE;
        break;
      default:
        break;
    }
  });
};

export default gameReducer;

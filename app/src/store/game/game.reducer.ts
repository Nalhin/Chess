import {
  GameActions,
  GameActionTypes,
  GameBaseActionTypes,
  GameState,
} from './game.types';
import { Reducer } from 'react';
import produce from 'immer';
import { Player, PlayerColor } from '../../interfaces/Game/Player';
import { GamePhase } from '../../interfaces/Game/Game';
import { BoardPosition } from '../../interfaces/Game/BoardPosition';
import { CheckState } from '../../interfaces/Game/CheckState';

export const GAME_INITIAL_STATE: GameState = {
  gameState: {
    board: {
      state: [[]],
      graveyards: {
        whiteGraveyard: [],
        blackGraveyard: [],
      },
      positionAwaitingPromotion: null,
      checkState: CheckState.None,
    },
    currentTurn: {
      currentPlayerColor: PlayerColor.White,
      turnNumber: 0,
    },
    gamePhase: GamePhase.WAITING_FOR_PLAYERS,
    players: {
      [PlayerColor.White]: {} as Player,
      [PlayerColor.Black]: {} as Player,
    },
    latestMove: {
      initialPosition: null,
      destinationPosition: null,
    },
  },
  selectedPiece: {
    availableMoves: [],
    position: {} as BoardPosition,
  },
  gameId: '',
  isReconnect: false,
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
      case GameActionTypes.GAME_RECONNECT_SUCCEEDED:
        draft.gameState = action.payload.game;
        draft.isReconnect = false;
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
      case GameActionTypes.CLEAR_GAME:
        draft = GAME_INITIAL_STATE;
        break;
      case GameActionTypes.GAME_IS_PRESENT_SUCCEEDED:
        draft.isReconnect = true;
        draft.gameId = action.payload.gameId;
        break;
      default:
        break;
    }
  });
};

export default gameReducer;

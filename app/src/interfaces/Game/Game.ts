import { Piece } from './Piece';
import { PlayerColor } from './Player';
import { Players } from './Players';
import { BoardPosition } from './BoardPosition';
import { CheckState } from './CheckState';

export enum GamePhase {
  WAITING_FOR_PLAYERS = 'WAITING_FOR_PLAYERS',
  STARTED = 'STARTED',
  GAME_OVER = 'GAME_OVER',
}

export interface Game {
  board: {
    state: Piece[][];
    graveyards: {
      whiteGraveyard: Piece[];
      blackGraveyard: Piece[];
    };
    positionAwaitingPromotion: BoardPosition;
    checkState: CheckState;
  };
  currentTurn: {
    currentPlayerColor: PlayerColor;
    turnNumber: number;
  };
  gamePhase: GamePhase;
  players: Players;
}

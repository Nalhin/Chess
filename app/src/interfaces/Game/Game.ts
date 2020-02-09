import { Piece } from './Piece';
import { Players } from './Players';
import { BoardPosition } from './BoardPosition';
import { CheckState } from './CheckState';
import { CurrentTurn } from './CurrentTurn';

export enum GamePhase {
  WAITING_FOR_PLAYERS = 'WAITING_FOR_PLAYERS',
  STARTED = 'STARTED',
  GAME_OVER = 'GAME_OVER',
}

export interface Graveyards {
  whiteGraveyard: Piece[];
  blackGraveyard: Piece[];
}

export interface Game {
  board: {
    state: Piece[][];
    graveyards: Graveyards;
    positionAwaitingPromotion: BoardPosition;
    checkState: CheckState;
  };
  currentTurn: CurrentTurn;
  gamePhase: GamePhase;
  players: Players;
}

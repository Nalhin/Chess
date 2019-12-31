import { Piece } from './piece';
import { PlayerColor } from './player';
import { Players } from './players';
import { BoardPosition } from './boardPosition';
import { CheckState } from './checkState';

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
  };
  currentTurn: PlayerColor;
  gamePhase: GamePhase;
  checkState: CheckState;
  players: Players;
}

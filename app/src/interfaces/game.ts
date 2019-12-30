import { Piece } from './piece';
import { PlayerColor } from './player';
import { Players } from './players';

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
  };
  currentTurn: PlayerColor;
  gamePhase: GamePhase;
  players: Players;
}
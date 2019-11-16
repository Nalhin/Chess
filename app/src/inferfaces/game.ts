import { Piece } from './piece';
import { Player } from './player';

export enum GamePhase {
  WAITING_FOR_PLAYERS = 'WAITING_FOR_PLAYERS',
  STARTED = 'STARTED',
  GAME_OVER = 'GAME_OVER',
}

export interface Game {
  board: { state: Piece[][] };
  currentTurn: Player;
  gameState: GamePhase;
  graveyards: {
    whiteGraveyard: Piece[];
    blackGraveyard: Piece[];
  };
  players: {
    whitePlayer: Player;
    blackPlayer: Player;
  };
}

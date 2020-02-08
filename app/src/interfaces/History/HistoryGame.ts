import { PlayerColor } from '../Game/Player';
import { GameTurn } from './GameTurn';

interface HistoryGame {
  gameId: number;
  blackPlayerName: string;
  whitePlayerName: string;
  winner: PlayerColor;
  finishTime: string;
  duration: number;
}

export interface HistoryGameWithTurnCount extends HistoryGame {
  totalTurns: number;
}

export interface HistoryGameWithTurns extends HistoryGame {
  turns: GameTurn[];
}

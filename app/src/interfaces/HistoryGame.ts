import { PlayerColor } from './player';
import { HistoryTurn } from './HistoryTurn';

interface HistoryGame {
  gameId: number;
  blackPlayerName: string;
  whitePlayerName: string;
  winner: PlayerColor;
  finishTime: string;
}

export interface HistoryGameWithTurnCount extends HistoryGame {
  totalTurns: number;
}

export interface HistoryGameWithTurns extends HistoryGame {
  turns: HistoryTurn[];
}

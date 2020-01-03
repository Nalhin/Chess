import { PlayerColor } from './player';
import { MatchTurn } from './MatchTurn';

interface MatchGame {
  gameId: number;
  blackPlayerName: string;
  whitePlayerName: string;
  winner: PlayerColor;
  finishTime: string;
}

export interface HistoryGameWithTurnCount extends MatchGame {
  totalTurns: number;
}

export interface HistoryGameWithTurns extends MatchGame {
  turns: MatchTurn[];
}

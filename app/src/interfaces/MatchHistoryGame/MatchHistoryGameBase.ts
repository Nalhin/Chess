import { GameTurn } from './GameTurn';

interface MatchHistoryGameBase {
  gameId: number;
  blackPlayer: string;
  whitePlayer: string;
  winner: string;
  finishTime: string;
  duration: number;
}

export interface MatchHistoryGameWithTurnCount extends MatchHistoryGameBase {
  totalTurns: number;
}

export interface MatchHistoryGameWithDetails extends MatchHistoryGameBase {
  turns: GameTurn[];
}

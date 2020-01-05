import { BoardPosition } from './boardPosition';
import { PieceType } from './piece';
import { PlayerColor } from './player';

export interface GameTurn {
  turnId: number;
  initialPosition: BoardPosition;
  destinationPosition: BoardPosition;
  pieceType: PieceType;
  playerColor: PlayerColor;
  turnNumber: number;
}

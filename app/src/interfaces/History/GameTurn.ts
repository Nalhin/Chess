import { BoardPosition } from '../Game/BoardPosition';
import { PieceType } from '../Game/Piece';
import { PlayerColor } from '../Game/Player';

export interface GameTurn {
  turnId: number;
  initialPosition: BoardPosition;
  destinationPosition: BoardPosition;
  pieceType: PieceType;
  playerColor: PlayerColor;
  turnNumber: number;
}

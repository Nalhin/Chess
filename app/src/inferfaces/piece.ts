import { PlayerColor } from './player';

export enum PieceType {
  PAWN = 1, KNIGHT = 2, BISHOP = 3, ROOK = 4, QUEEN = 5, KING = 6
}

export interface Piece {
  type: typeof PieceType,
  playerColor: typeof PlayerColor
}

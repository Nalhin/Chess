import { PlayerColor } from './Player';

export enum PieceType {
  PAWN = 'PAWN',
  KNIGHT = 'KNIGHT',
  BISHOP = 'BISHOP',
  ROOK = 'ROOK',
  QUEEN = 'QUEEN',
  KING = 'KING',
}

export interface Piece {
  type: PieceType;
  playerColor: PlayerColor;
  id?: string;
}

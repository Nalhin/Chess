import { Board } from '../../../src/interfaces/Game/Board';

import { PieceType } from '../../../src/interfaces/Game/Piece';

export const fakeBoard: Board = {
  state: [
    [
      {
        type: PieceType.ROOK,
        playerColor: 0,
      },
      {
        type: PieceType.KNIGHT,
        playerColor: 0,
      },
      {
        type: PieceType.BISHOP,
        playerColor: 0,
      },
      {
        type: PieceType.QUEEN,
        playerColor: 0,
      },
      {
        type: PieceType.KING,
        playerColor: 0,
      },
      {
        type: PieceType.BISHOP,
        playerColor: 0,
      },
      {
        type: PieceType.KNIGHT,
        playerColor: 0,
      },
      {
        type: PieceType.ROOK,
        playerColor: 0,
      },
    ],
    [
      {
        type: PieceType.PAWN,
        playerColor: 0,
      },
      {
        type: PieceType.PAWN,
        playerColor: 0,
      },
      {
        type: PieceType.PAWN,
        playerColor: 0,
      },
      {
        type: PieceType.PAWN,
        playerColor: 0,
      },
      {
        type: PieceType.PAWN,
        playerColor: 0,
      },
      {
        type: PieceType.PAWN,
        playerColor: 0,
      },
      {
        type: PieceType.PAWN,
        playerColor: 0,
      },
      {
        type: PieceType.PAWN,
        playerColor: 0,
      },
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
      {
        type: PieceType.PAWN,
        playerColor: 1,
      },
      {
        type: PieceType.PAWN,
        playerColor: 1,
      },
      {
        type: PieceType.PAWN,
        playerColor: 1,
      },
      {
        type: PieceType.PAWN,
        playerColor: 1,
      },
      {
        type: PieceType.PAWN,
        playerColor: 1,
      },
      {
        type: PieceType.PAWN,
        playerColor: 1,
      },
      {
        type: PieceType.PAWN,
        playerColor: 1,
      },
      {
        type: PieceType.PAWN,
        playerColor: 1,
      },
    ],
    [
      {
        type: PieceType.ROOK,
        playerColor: 1,
      },
      {
        type: PieceType.KNIGHT,
        playerColor: 1,
      },
      {
        type: PieceType.BISHOP,
        playerColor: 1,
      },
      {
        type: PieceType.QUEEN,
        playerColor: 1,
      },
      {
        type: PieceType.KING,
        playerColor: 1,
      },
      {
        type: PieceType.BISHOP,
        playerColor: 1,
      },
      {
        type: PieceType.KNIGHT,
        playerColor: 1,
      },
      {
        type: PieceType.ROOK,
        playerColor: 1,
      },
    ],
  ],
};

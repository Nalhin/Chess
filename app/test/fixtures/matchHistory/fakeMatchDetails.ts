import { PieceType } from '../../../src/interfaces/Game/Piece';

export const fakeMatchDetails = {
  gameId: 1,
  blackPlayer: 'Computer',
  whitePlayer: '1',
  winner: '1',
  finishTime: '2020-02-15T21:37:41Z',
  duration: 21.837626,
  turns: [
    {
      turnId: 1,
      destinationPosition: {
        x: 6,
        y: 4,
      },
      initialPosition: {
        x: 4,
        y: 4,
      },
      pieceType: PieceType.KING,
      playerColor: 0,
      turnNumber: 1,
    },
  ],
};

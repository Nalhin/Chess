export const fakeGameOverMessage = {
  body: JSON.stringify({
    type: 'GAME_OVER',
    payload: {
      board: {
        state: [
          [
            { type: 'ROOK', playerColor: 0 },
            { type: 'KNIGHT', playerColor: 0 },
            {
              type: 'BISHOP',
              playerColor: 0,
            },
            { type: 'QUEEN', playerColor: 0 },
            { type: 'KING', playerColor: 0 },
            {
              type: 'BISHOP',
              playerColor: 0,
            },
            { type: 'KNIGHT', playerColor: 0 },
            { type: 'ROOK', playerColor: 0 },
          ],
          [
            {
              type: 'PAWN',
              playerColor: 0,
            },
            { type: 'PAWN', playerColor: 0 },
            { type: 'PAWN', playerColor: 0 },
            {
              type: 'PAWN',
              playerColor: 0,
            },
            { type: 'PAWN', playerColor: 0 },
            { type: 'PAWN', playerColor: 0 },
            {
              type: 'PAWN',
              playerColor: 0,
            },
            {
              type: 'PAWN',
              playerColor: 0,
            },
          ],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [
            {
              type: 'PAWN',
              playerColor: 1,
            },
            { type: 'PAWN', playerColor: 1 },
            { type: 'PAWN', playerColor: 1 },
            {
              type: 'PAWN',
              playerColor: 1,
            },
            { type: 'PAWN', playerColor: 1 },
            { type: 'PAWN', playerColor: 1 },
            {
              type: 'PAWN',
              playerColor: 1,
            },
            { type: 'PAWN', playerColor: 1 },
          ],
          [
            { type: 'ROOK', playerColor: 1 },
            {
              type: 'KNIGHT',
              playerColor: 1,
            },
            { type: 'BISHOP', playerColor: 1 },
            { type: 'QUEEN', playerColor: 1 },
            {
              type: 'KING',
              playerColor: 1,
            },
            { type: 'BISHOP', playerColor: 1 },
            { type: 'KNIGHT', playerColor: 1 },
            {
              type: 'ROOK',
              playerColor: 1,
            },
          ],
        ],
      },
      players: {
        whitePlayer: { name: '19sz5n' },
        blackPlayer: { name: 'xlp4mq' },
      },
      graveyards: null,
      currentTurn: { name: '19sz5n' },
      gameState: 'STARTED',
    },
  }),
};

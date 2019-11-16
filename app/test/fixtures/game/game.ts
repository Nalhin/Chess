import { fakeBoard } from './board';
import { Game } from '../../../src/inferfaces/game';

export const fakeGame: Game = {
  board: { ...fakeBoard },
  players: {
    whitePlayer: {
      name: '19sz5n',
    },
    blackPlayer: {
      name: '4l900c',
    },
  },
  graveyards: null,
  currentTurn: {
    name: '19sz5n',
  },
  gameState: 'STARTED',
};

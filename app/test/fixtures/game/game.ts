import { Game, GamePhase } from '../../../src/interfaces/game';
import { PlayerColor } from '../../../src/interfaces/player';

export const fakeGame: Game = {
  board: {
    state: [[]],
    graveyards: {
      whiteGraveyard: [],
      blackGraveyard: [],
    },
  },
  currentTurn: PlayerColor.WHITE,
  gamePhase: GamePhase.WAITING_FOR_PLAYERS,
  players: {
    whitePlayer: { name: 'name' },
    blackPlayer: { name: 'name' },
  },
};

import { Game, GamePhase } from '../../../src/inferfaces/game';
import { PlayerColor } from '../../../src/inferfaces/player';

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

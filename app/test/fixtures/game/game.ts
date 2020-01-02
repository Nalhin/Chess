import { Game, GamePhase } from '../../../src/interfaces/game';
import { PlayerColor } from '../../../src/interfaces/player';
import { CheckState } from '../../../src/interfaces/checkState';

export const fakeGame: Game = {
  board: {
    state: [[]],
    graveyards: {
      whiteGraveyard: [],
      blackGraveyard: [],
    },
    positionAwaitingPromotion: { x: 0, y: 2 },
    checkState: CheckState.NONE,
  },
  currentTurn: {
    currentPlayerColor: PlayerColor.WHITE,
    turnNumber: 0,
  },
  gamePhase: GamePhase.WAITING_FOR_PLAYERS,
  players: {
    [PlayerColor.WHITE]: { name: 'name', totalTurnTimeRemaining: 300 },
    [PlayerColor.BLACK]: { name: 'name', totalTurnTimeRemaining: 300 },
  },
};

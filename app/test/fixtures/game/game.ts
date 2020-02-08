import { Game, GamePhase } from '../../../src/interfaces/Game/Game';
import { PlayerColor } from '../../../src/interfaces/Game/Player';
import { CheckState } from '../../../src/interfaces/Game/CheckState';

export const fakeGame: Game = {
  board: {
    state: [[]],
    graveyards: {
      whiteGraveyard: [],
      blackGraveyard: [],
    },
    positionAwaitingPromotion: { x: 0, y: 2 },
    checkState: CheckState.None,
  },
  currentTurn: {
    currentPlayerColor: PlayerColor.White,
    turnNumber: 0,
  },
  gamePhase: GamePhase.WAITING_FOR_PLAYERS,
  players: {
    [PlayerColor.White]: { name: 'name', totalTurnTimeRemaining: 300 },
    [PlayerColor.Black]: { name: 'name', totalTurnTimeRemaining: 300 },
  },
};

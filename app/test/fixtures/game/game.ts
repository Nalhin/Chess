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
    [PlayerColor.White]: {
      name: 'name',
      totalTurnTimeRemaining: 300,
      turnStartDate: '2004-02-12T15:19:21+00:00',
    },
    [PlayerColor.Black]: {
      name: 'name',
      totalTurnTimeRemaining: 300,
      turnStartDate: '2004-02-12T15:19:21+00:00',
    },
  },
  latestMove: {
    initialPosition: { x: 2, y: 3 },
    destinationPosition: { x: 3, y: 4 },
  },
};

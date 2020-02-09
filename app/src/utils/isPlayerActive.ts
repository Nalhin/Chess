import { PlayerColor } from '../interfaces/Game/Player';
import { GamePhase } from '../interfaces/Game/Game';
import { CurrentTurn } from '../interfaces/Game/CurrentTurn';

export const isPlayerActive = (
  currentTurn: CurrentTurn,
  gamePhase: GamePhase,
  expectedColor: PlayerColor,
) =>
  currentTurn.turnNumber !== 0 &&
  currentTurn.currentPlayerColor === expectedColor &&
  gamePhase !== GamePhase.GAME_OVER;

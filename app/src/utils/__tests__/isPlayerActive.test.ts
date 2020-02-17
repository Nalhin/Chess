import { PlayerColor } from '../../interfaces/Game/Player';
import { GamePhase } from '../../interfaces/Game/Game';
import { isPlayerActive } from '../isPlayerActive';

describe('isPlayerActive', () => {
  it('should be truthy, if player is active', () => {
    const currentTurn = {
      turnNumber: 2,
      currentPlayerColor: PlayerColor.Black,
    };
    const gamePhase = GamePhase.STARTED;
    const expectedColor = PlayerColor.Black;

    const result = isPlayerActive(currentTurn, gamePhase, expectedColor);

    expect(result).toBeTruthy();
  });
  it('should be falsy if player is not active', () => {
    const currentTurn = {
      turnNumber: 0,
      currentPlayerColor: PlayerColor.Black,
    };
    const gamePhase = GamePhase.STARTED;
    const expectedColor = PlayerColor.White;

    const result = isPlayerActive(currentTurn, gamePhase, expectedColor);

    expect(result).toBeFalsy();
  });
});

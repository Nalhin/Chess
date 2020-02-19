import { fakeGame } from '../fakeGame';
import { GamePhase } from '../../../../src/interfaces/Game/Game';
import { playerMoved } from '../../../../src/store/game/game.actions';

export const fakePlayerMovedMessage = {
  body: JSON.stringify(
    playerMoved({
      ...fakeGame,
      gamePhase: GamePhase.STARTED,
    }),
  ),
};

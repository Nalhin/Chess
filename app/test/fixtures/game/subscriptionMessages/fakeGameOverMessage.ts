import { fakeGame } from '../fakeGame';
import { GamePhase } from '../../../../src/interfaces/Game/Game';
import { gameOver } from '../../../../src/store/game/game.actions';

export const fakeGameOverMessage = {
  body: JSON.stringify(
    gameOver({
      ...fakeGame,
      gamePhase: GamePhase.GAME_OVER,
    }),
  ),
};

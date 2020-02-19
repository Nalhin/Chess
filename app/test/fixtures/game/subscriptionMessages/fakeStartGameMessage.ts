import { fakeGame } from '../fakeGame';
import { GamePhase } from '../../../../src/interfaces/Game/Game';
import { gameStarted } from '../../../../src/store/game/game.actions';

export const fakeStartGameMessage = {
  body: JSON.stringify(
    gameStarted({
      ...fakeGame,
      gamePhase: GamePhase.STARTED,
    }),
  ),
};

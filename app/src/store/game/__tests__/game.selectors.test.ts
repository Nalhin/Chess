import { isCurrentTurnSelector, userColorSelector } from '../game.selectors';
import { fakeGame } from '../../../../test/fixtures/game/game';
import { PlayerColor } from '../../../interfaces/Game/Player';
import { fakeUser } from '../../../../test/fixtures/user/user';

describe('isCurrentTurnSelector', () => {
  it('should be truthy if its user"s turn', () => {
    const players = {
      ...fakeGame.players,
      [PlayerColor.White]: {
        ...fakeGame.players[PlayerColor.White],
        name: fakeUser.login,
      },
    };
    const currentTurn = {
      currentPlayerColor: PlayerColor.White,
      turnNumber: 10,
    };

    const selector = isCurrentTurnSelector.resultFunc(
      players,
      currentTurn,
      fakeUser,
    );

    expect(selector).toBeTruthy();
  });
  it('should be truthy if its not user"s turn', () => {
    const players = {
      ...fakeGame.players,
      [PlayerColor.Black]: {
        ...fakeGame.players[PlayerColor.Black],
        name: fakeUser.login,
      },
    };
    const currentTurn = {
      currentPlayerColor: PlayerColor.White,
      turnNumber: 10,
    };

    const selector = isCurrentTurnSelector.resultFunc(
      players,
      currentTurn,
      fakeUser,
    );

    expect(selector).toBeFalsy();
  });
});

describe('userColorSelector', () => {
  it('should return black colour for black player', () => {
    const players = {
      ...fakeGame.players,
      [PlayerColor.Black]: {
        ...fakeGame.players[PlayerColor.Black],
        name: fakeUser.login,
      },
    };

    const selector = userColorSelector.resultFunc(players, fakeUser);

    expect(selector).toEqual(PlayerColor.Black);
  });
  it('should return white colour for white player', () => {
    const players = {
      ...fakeGame.players,
      [PlayerColor.White]: {
        ...fakeGame.players[PlayerColor.White],
        name: fakeUser.login,
      },
    };

    const selector = userColorSelector.resultFunc(players, fakeUser);

    expect(selector).toEqual(PlayerColor.White);
  });
});

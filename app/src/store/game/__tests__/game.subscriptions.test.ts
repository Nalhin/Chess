// @ts-nocheck
import {
  gamePersonalSubscription,
  gameStateSubscription,
} from '../game.subscriptions';
import MockStomp from '../../../../test/utils/MockStomp';
import { fakeStartGameMessage } from '../../../../test/fixtures/game/messages/fakeStartGameMessage';
import { fakePlayerMovedMessage } from '../../../../test/fixtures/game/messages/fakePlayerMovedMessage';
import { fakeGameOverMessage } from '../../../../test/fixtures/game/messages/fakeGameOverMessage';
import { fakeAvailableMovesErrorMessage } from '../../../../test/fixtures/game/messages/fakeAvailableMovesErrorMessage';
import { fakeAvailableMovesMessage } from '../../../../test/fixtures/game/messages/fakeAvailableMovesMessage';
import { fakeGameId } from '../../../../test/fixtures/game/gameId';

const mockDispatchedActions = [];

jest.mock('../../store', () => ({
  dispatch: (action: any) => mockDispatchedActions.push(action),
}));

beforeEach(() => {
  mockDispatchedActions.length = 0;
});

describe('gameStateSubscriptions', () => {
  it('Should dispatch actions correctly', () => {
    const messages = [
      fakeStartGameMessage,
      fakePlayerMovedMessage,
      fakeGameOverMessage,
    ];

    const mockStomp = new MockStomp(messages);
    gameStateSubscription(mockStomp, fakeGameId);

    expect(mockDispatchedActions.length).toBe(3);
  });
});

describe('gamePersonalSubscription', () => {
  it('Should dispatch actions correctly', () => {
    const messages = [
      fakeAvailableMovesMessage,
      fakeAvailableMovesErrorMessage,
    ];

    const mockStomp = new MockStomp(messages);
    gamePersonalSubscription(mockStomp, fakeGameId);

    expect(mockDispatchedActions.length).toBe(2);
  });
});

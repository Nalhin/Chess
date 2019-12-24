// @ts-nocheck
import {
  gamePersonalSubscription,
  gameQueueSubscription,
  gameStateSubscription,
} from '../game.subscriptions';
import MockStomp from '../../../../test/utils/MockStomp';
import { fakeStartGameMessage } from '../../../../test/fixtures/game/subscriptionMessages/fakeStartGameMessage';
import { fakePlayerMovedMessage } from '../../../../test/fixtures/game/subscriptionMessages/fakePlayerMovedMessage';
import { fakeGameOverMessage } from '../../../../test/fixtures/game/subscriptionMessages/fakeGameOverMessage';
import { fakeAvailableMovesErrorMessage } from '../../../../test/fixtures/game/subscriptionMessages/fakeAvailableMovesErrorMessage';
import { fakeAvailableMovesMessage } from '../../../../test/fixtures/game/subscriptionMessages/fakeAvailableMovesMessage';
import { fakeGameId } from '../../../../test/fixtures/game/gameId';
import { RootAction } from '../../rootAction';
import { fakeGameFoundMessage } from '../../../../test/fixtures/game/subscriptionMessages/fakeGameFoundMessage';

const mockDispatchedActions = [];

jest.mock('../../store', () => ({
  dispatch: (action: RootAction) => mockDispatchedActions.push(action),
}));

beforeEach(() => {
  mockDispatchedActions.length = 0;
});

describe('gameStateSubscriptions', () => {
  it('Should dispatch actions correctly', () => {
    const subscriptionMessages = [
      fakeStartGameMessage,
      fakePlayerMovedMessage,
      fakeGameOverMessage,
    ];

    const mockStomp = new MockStomp(subscriptionMessages);
    gameStateSubscription(mockStomp, fakeGameId);

    expect(mockDispatchedActions.length).toBe(3);
  });
});

describe('gamePersonalSubscription', () => {
  it('Should dispatch actions correctly', () => {
    const subscriptionMessages = [
      fakeAvailableMovesMessage,
      fakeAvailableMovesErrorMessage,
    ];

    const mockStomp = new MockStomp(subscriptionMessages);
    gamePersonalSubscription(mockStomp, fakeGameId);

    expect(mockDispatchedActions.length).toBe(2);
  });
});

describe('gameQueueSubscription', () => {
  it('Should dispatch actions correctly', () => {
    const subscriptionMessages = [fakeGameFoundMessage];

    const mockStomp = new MockStomp(subscriptionMessages);
    gameQueueSubscription(mockStomp);

    expect(mockDispatchedActions.length).toBe(1);
  });
});

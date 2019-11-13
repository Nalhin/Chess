// @ts-nocheck
import {
  availableMovesSubscription,
  connectToGameSubscription,
  moveSubscription,
} from '../game.subscriptions';
import MockStomp from '../../../../test/utils/MockStomp';
import { fakeBoardMessage } from '../../../../test/fixtures/messages/fakeBoardMessage';
import { fakeGameId } from '../../../../test/fixtures/fakeGameId';
import { fakeAvailableMovesMessage } from '../../../../test/fixtures/messages/fakeAvailableMovesMessage';

const mockDispatchedActions = [];

jest.mock('../../store', () => ({
  dispatch: (action: any) => mockDispatchedActions.push(action),
}));

beforeEach(() => {
  mockDispatchedActions.length = 0;
});

describe('ConnectToGameSubscription', () => {
  it('Should dispatch actions correctly', () => {
    const messages = [fakeBoardMessage, fakeBoardMessage];

    const mockStomp = new MockStomp(messages);
    connectToGameSubscription(mockStomp, fakeGameId);

    expect(mockDispatchedActions.length).toBe(2);
  });
});

describe('moveSubscription', () => {
  const messages = [fakeBoardMessage, fakeBoardMessage];

  const mockStomp = new MockStomp(messages);
  moveSubscription(mockStomp, fakeGameId);

  expect(mockDispatchedActions.length).toBe(2);
});

describe('availableMovesSubscription', () => {
  it('Should dispatch actions correctly', () => {
    const messages = [fakeAvailableMovesMessage, fakeAvailableMovesMessage];

    const mockStomp = new MockStomp(messages);
    availableMovesSubscription(mockStomp, fakeGameId);

    expect(mockDispatchedActions.length).toBe(2);
  });
});

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
    const stomp = new MockStomp(messages);

    // @ts-ignore
    connectToGameSubscription(stomp, fakeGameId);

    expect(mockDispatchedActions.length).toBe(2);
  });
});

describe('moveSubscription', () => {
  const messages = [fakeBoardMessage, fakeBoardMessage];
  const stomp = new MockStomp(messages);

  // @ts-ignore
  moveSubscription(stomp, fakeGameId);

  expect(mockDispatchedActions.length).toBe(2);
});

describe('availableMovesSubscription', () => {
  it('Should dispatch actions correctly', () => {
    const messages = [fakeAvailableMovesMessage, fakeAvailableMovesMessage];
    const stomp = new MockStomp(messages);

    // @ts-ignore
    availableMovesSubscription(stomp, fakeGameId);

    expect(mockDispatchedActions.length).toBe(2);
  });
});

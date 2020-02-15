// @ts-nocheck
import { RootAction } from '../../rootAction';
import MockStomp from '../../../../test/utils/MockStomp';
import { queuePersonalSubscription } from '../queue.subscriptions';
import { fakeUser } from '../../../../test/fixtures/user/user';
import { fakeQueueGameFoundMessage } from '../../../../test/fixtures/queue/subscriptionMessages/fakeQueueGameFoundMessage';
import { fakeQueueLeftMessage } from '../../../../test/fixtures/queue/subscriptionMessages/fakeQueueLeftMessage';
import { fakeQueueErrorMessage } from '../../../../test/fixtures/queue/subscriptionMessages/fakeQueueErrorMessage';
import { fakeQueueJoinedMessage } from '../../../../test/fixtures/queue/subscriptionMessages/fakeQueueJoinedMessage';

const mockDispatchedActions = [];

jest.mock('./../../store', () => ({
  store: {
    dispatch: (action: RootAction) => mockDispatchedActions.push(action),
  },
}));

beforeEach(() => {
  mockDispatchedActions.length = 0;
});

describe('queuePersonalSubscription', () => {
  it('should dispatch actions correctly', () => {
    const subscriptionMessages = [
      fakeQueueGameFoundMessage,
      fakeQueueLeftMessage,
      fakeQueueErrorMessage,
      fakeQueueJoinedMessage,
    ];

    const mockStomp = new MockStomp(subscriptionMessages);

    queuePersonalSubscription(mockStomp, fakeUser.login);
    expect(mockDispatchedActions.length).toBe(5);
  });
});

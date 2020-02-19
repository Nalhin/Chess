// @ts-nocheck
import * as stomp from '../../../websocket/stompClient';
import { testSaga } from 'redux-saga-test-plan';
import MockStomp from '../../../../test/utils/MockStomp';
import { initChatSaga, sendMessageSaga } from '../chat.saga';
import { initChat, sendMessage } from '../chat.actions';
import { ChatActionTypes, ChatBaseActionTypes } from '../chat.types';
import { fakeUser } from '../../../../test/fixtures/user/fakeUser';

jest.mock('../../../websocket/stompClient', () => ({
  StompSingleton: {
    getInstance: jest.fn(),
    deactivateInstance: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('initChatSaga', () => {
  it('Should initialize the chat correctly', () => {
    const mockStomp = new MockStomp();
    stomp.StompSingleton.getInstance.mockImplementation(() => {
      return mockStomp;
    });

    const action = initChat();

    testSaga(initChatSaga, action)
      .next()
      .next({ login: fakeUser.login })
      .take(ChatActionTypes.CLOSE_CHAT)
      .next()
      .isDone();

    expect(stomp.StompSingleton.deactivateInstance).toHaveBeenCalledTimes(1);
  });
});

describe('sendMessageSaga', () => {
  it('Should send messages correctly', () => {
    const mockStomp = new MockStomp();
    stomp.StompSingleton.getInstance.mockImplementation(() => {
      return mockStomp;
    });

    const action = sendMessage('abc');

    testSaga(sendMessageSaga, action)
      .next()
      .next([{ login: fakeUser.login }, 1])
      .next()
      .isDone();

    expect(mockStomp.publish).toHaveBeenCalledTimes(1);
  });
});

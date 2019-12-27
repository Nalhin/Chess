// @ts-nocheck
import * as stomp from '../../../websocket/stompClient';
import { testSaga } from 'redux-saga-test-plan';
import MockStomp from '../../../../test/utils/MockStomp';
import { initChatSaga, sendMessageSaga } from '../chat.saga';
import { initChat, sendMessage } from '../chat.actions';
import { ChatBaseActionTypes } from '../chat.types';

jest.mock('../../../websocket/stompClient', () => ({
  StompSingleton: {
    getInstance: jest.fn(),
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
      .take(ChatBaseActionTypes.CLOSE_CHAT)
      .next()
      .isDone();
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
      .next({ login: 'xd' })
      .next()
      .isDone();

    expect(mockStomp.publish).toHaveBeenCalledTimes(1);
  });
});

// @ts-nocheck
import * as stomp from '../../../websocket/stompClient';
import { testSaga } from 'redux-saga-test-plan';
import { initGameSaga } from '../game.saga';
import MockStomp from '../../../../test/utils/MockStomp';
import { clearGame, initGameRequested } from '../game.actions';
import { closeChat } from '../../chat/chat.actions';
import { CustomRouterActionTypes } from '../../customRouter/customRouter.types';

jest.mock('../../../websocket/stompClient', () => ({
  StompSingleton: {
    getInstance: jest.fn(),
    deactivateInstance: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('initGameSaga', () => {
  it('Should run correctly', () => {
    const mockStomp = new MockStomp();

    stomp.StompSingleton.getInstance.mockImplementation(() => {
      return mockStomp;
    });
    const gameId = '1';
    const action = initGameRequested(gameId);

    testSaga(initGameSaga, action)
      .next()
      .next({ login: 'xd' })
      .take(CustomRouterActionTypes.LOCATION_CHANGE)
      .next()
      .next(true)
      .put(clearGame())
      .next()
      .put(closeChat())
      .next()
      .isDone();

    expect(mockStomp.publish).toHaveBeenCalledTimes(1);
  });
});

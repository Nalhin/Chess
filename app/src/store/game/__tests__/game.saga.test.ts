// @ts-nocheck
import * as stomp from '../../../websocket/stompClient';
import { testSaga } from 'redux-saga-test-plan';
import { GameActionTypes } from '../game.types';
import { initGameSaga } from '../game.saga';
import MockStomp from '../../../../test/utils/MockStomp';
import { initGameRequested } from '../game.actions';

jest.mock('../../../websocket/stompClient', () => ({
  StompSingleton: {
    getInstance: jest.fn(),
  },
}));

describe('initGameSaga', () => {
  it('Should run correctly', () => {
    const mockStomp = new MockStomp();

    stomp.StompSingleton.getInstance.mockImplementation(() => {
      return mockStomp;
    });
    const action = initGameRequested('1');

    testSaga(initGameSaga, action)
      .next()
      .next({ name: 'xd' })
      .take(GameActionTypes.GAME_OVER)
      .next()
      .isDone();

    expect(mockStomp.publish).toHaveBeenCalledTimes(1);
  });
});

// @ts-nocheck
import * as stomp from '../../stompClient';
import { testSaga } from 'redux-saga-test-plan';
import { GameActionTypes } from '../game.types';
import { initGameSaga } from '../game.saga';
import MockStomp from '../../../../test/utils/MockStomp';

jest.mock('../../stompClient', () => ({
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

    testSaga(initGameSaga)
      .next()
      .take(GameActionTypes.GAME_OVER)
      .next()
      .isDone();

    expect(mockStomp.publish).toHaveBeenCalledTimes(1);
    expect(mockStomp.deactivate).toHaveBeenCalledTimes(1);
  });
});

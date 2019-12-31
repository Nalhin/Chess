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
    const gameId = '1';
    const action = initGameRequested(gameId);

    testSaga(initGameSaga, action)
      .next()
      .next({ login: 'xd' })
      .take(GameActionTypes.CLOSE_GAME)
      .next()
      .isDone();

    expect(mockStomp.publish).toHaveBeenCalledTimes(1);
  });
});

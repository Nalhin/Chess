// @ts-nocheck
import * as stomp from '../../../websocket/stompClient';
import { testSaga } from 'redux-saga-test-plan';
import {
  checkIsGamePresentSaga,
  forfeitGameSaga,
  getAvailableMovesSaga,
  initGameSaga,
  makeMoveSaga,
} from '../game.saga';
import MockStomp from '../../../../test/utils/MockStomp';
import {
  checkIsGamePresentFailed,
  checkIsGamePresentRequested,
  checkIsGamePresentSucceeded,
  clearGame,
  forfeitGame,
  getAvailableMoves,
  initGameRequested,
} from '../game.actions';
import { closeChat } from '../../chat/chat.actions';
import { CustomRouterActionTypes } from '../../customRouter/customRouter.types';
import { gameIdSelector, selectedPieceSelector } from '../game.selectors';
import { userSelector } from '../../user/user.selectors';
import { select } from 'redux-saga-test-plan/matchers';
import { fakeGameId } from '../../../../test/fixtures/game/gameId';
import { fakeUser } from '../../../../test/fixtures/user/user';
import { fakeBoardPosition } from '../../../../test/fixtures/game/boardPosition';
import * as gameApi from '../game.api';

jest.mock('../game.api', () => ({
  fetchIsGamePresent: jest.fn(),
}));

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

describe('forfeitGameSaga', () => {
  it('should select data and publish forfeit message correctly', () => {
    const mockStomp = new MockStomp();

    stomp.StompSingleton.getInstance.mockImplementation(() => {
      return mockStomp;
    });

    testSaga(forfeitGameSaga, forfeitGame())
      .next()
      .all([select(gameIdSelector), select(userSelector)])
      .next([fakeGameId, fakeUser])
      .next()
      .isDone();

    expect(mockStomp.publish).toHaveBeenCalledTimes(1);
  });
});

describe('checkIsGamePresentSaga', () => {
  it('should call api and dispatch actions properly', () => {
    testSaga(checkIsGamePresentSaga, checkIsGamePresentRequested)
      .next()
      .select(userSelector)
      .next(fakeUser)
      .call(gameApi.fetchIsGamePresent, fakeUser.login)
      .next({ data: { isPresent: true, gameId: fakeGameId } })
      .put(checkIsGamePresentSucceeded(fakeGameId))
      .finish();
  });

  it('should handle missing game properly', () => {
    testSaga(checkIsGamePresentSaga, checkIsGamePresentRequested)
      .next()
      .select(userSelector)
      .next(fakeUser)
      .call(gameApi.fetchIsGamePresent, fakeUser.login)
      .next({ data: { isPresent: false, gameId: '' } })
      .put(checkIsGamePresentFailed())
      .finish();
  });

  it('should handle api errors', () => {
    gameApi.fetchIsGamePresent.mockImplementation(() => {
      throw new Error();
    });

    testSaga(checkIsGamePresentSaga, checkIsGamePresentRequested)
      .next()
      .select(userSelector)
      .next(fakeUser)
      .call(gameApi.fetchIsGamePresent, fakeUser.login)
      .next()
      .put(checkIsGamePresentFailed())
      .finish();
  });
});

describe('getAvailableMovesSaga', () => {
  it('should select data and publish getAvailableMoves message correctly', () => {
    const mockStomp = new MockStomp();

    stomp.StompSingleton.getInstance.mockImplementation(() => {
      return mockStomp;
    });

    testSaga(getAvailableMovesSaga, getAvailableMoves(fakeBoardPosition))
      .next()
      .all([select(gameIdSelector), select(userSelector)])
      .next([fakeGameId, fakeUser])
      .next()
      .isDone();

    expect(mockStomp.publish).toHaveBeenCalledTimes(1);
  });
});

describe('makeMoveSaga', () => {
  it('should select data and publish makeMove message', () => {
    const mockStomp = new MockStomp();

    stomp.StompSingleton.getInstance.mockImplementation(() => {
      return mockStomp;
    });

    testSaga(makeMoveSaga, getAvailableMoves(fakeBoardPosition))
      .next()
      .all([
        select(selectedPieceSelector),
        select(gameIdSelector),
        select(userSelector),
      ])
      .next([fakeBoardPosition, fakeGameId, fakeUser])
      .next()
      .isDone();

    expect(mockStomp.publish).toHaveBeenCalledTimes(1);
  });
});

describe('promotePawnSaga', () => {
  it('should select data and publish promotePawn message correctly', () => {
    const mockStomp = new MockStomp();

    stomp.StompSingleton.getInstance.mockImplementation(() => {
      return mockStomp;
    });

    testSaga(getAvailableMovesSaga, getAvailableMoves(fakeBoardPosition))
      .next()
      .all([select(gameIdSelector), select(userSelector)])
      .next([fakeGameId, fakeUser])
      .next()
      .isDone();

    expect(mockStomp.publish).toHaveBeenCalledTimes(1);
  });
});

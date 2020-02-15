// @ts-nocheck
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';
import { Routes } from '../../../interfaces/Router/Routes';
import { initChat } from '../../chat/chat.actions';
import { initGameRequested } from '../../game/game.actions';
import {
  joinQueue,
  joinQueueAi,
  leaveQueue,
  queueGameFound,
} from '../queue.actions';
import { addToast } from '../../toaster/toaster.action';
import {
  joinQueueAiSaga,
  joinQueueSaga,
  leaveQueueSaga,
  queueGameFoundSaga,
} from '../queue.saga';
import { fakeGameId } from '../../../../test/fixtures/game/gameId';

import { fakeUser } from '../../../../test/fixtures/user/user';
import * as queueApi from '../queue.api';
import { call, select, take } from 'redux-saga-test-plan/matchers';
import * as queueSubscriptions from '../queue.subscriptions';
import { throwError } from 'redux-saga-test-plan/providers';
import { fakeToaster } from '../../../../test/fixtures/toaster/fakeToaster';
import { userSelector } from '../../user/user.selectors';
import MockStomp from '../../../../test/utils/MockStomp';
import * as stomp from '../../../websocket/stompClient';
import { isInQueueSelector } from '../queue.selectors';
import { QueueActionTypes } from '../queue.types';
import { WebsocketTypes } from '../../../websocket/websocketTypes';

jest.mock('../../../websocket/stompClient', () => ({
  StompSingleton: {
    getInstance: jest.fn(),
    deactivateInstance: jest.fn(),
  },
}));

jest.mock('../queue.api', () => ({
  fetchJoinQueueAi: jest.fn(),
}));

jest.mock('../queue.subscriptions', () => ({
  queuePersonalSubscription: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('joinQueueSaga', () => {
  it('should leave early, if user is already in queue', () => {
    const isInQueue = true;
    const mockStomp = new MockStomp();

    stomp.StompSingleton.getInstance.mockImplementation(() => {
      return mockStomp;
    });

    testSaga(joinQueueSaga, joinQueue())
      .next()
      .all([select(isInQueueSelector), select(userSelector)])
      .next([isInQueue, fakeUser])
      .next()
      .isDone();

    expect(mockStomp.publish).toHaveBeenCalledTimes(1);
  });

  it('should join queue, subscribe to queue and leave queue when game is found', () => {
    const isInQueue = false;
    const mockStomp = new MockStomp();

    stomp.StompSingleton.getInstance.mockImplementation(() => {
      return mockStomp;
    });

    queueSubscriptions.queuePersonalSubscription.mockImplementation(() => {
      return {
        unsubscribe: jest.fn(),
      };
    });

    testSaga(joinQueueSaga, joinQueue())
      .next()
      .all([select(isInQueueSelector), select(userSelector)])
      .next([isInQueue, fakeUser])
      .race([
        take(QueueActionTypes.QUEUE_GAME_FOUND),
        take(QueueActionTypes.QUEUE_LEFT),
      ])
      .next()
      .isDone();

    expect(mockStomp.publish).toHaveBeenCalledTimes(1);
    expect(stomp.StompSingleton.deactivateInstance).toHaveBeenCalledWith(
      WebsocketTypes.QUEUE,
    );
  });
});

describe('leaveQueueSaga', () => {
  const mockStomp = new MockStomp();

  stomp.StompSingleton.getInstance.mockImplementation(() => {
    return mockStomp;
  });

  testSaga(leaveQueueSaga, leaveQueue())
    .next()
    .select(userSelector)
    .next(fakeUser)
    .next()
    .isDone();

  expect(mockStomp.publish).toHaveBeenCalledTimes(1);
});

describe('joinQueueAiSaga', () => {
  it('should handle api error correctly', () => {
    return expectSaga(joinQueueAiSaga, joinQueueAi())
      .provide([
        [select(userSelector), fakeUser],
        [
          call(queueApi.fetchJoinQueueAi, fakeUser.login),
          throwError(new Error()),
        ],
      ])
      .put.like({ action: { type: addToast(fakeToaster).type } })
      .run();
  });

  it('should call api and fork saga correctly', () => {
    testSaga(joinQueueAiSaga, joinQueueAi())
      .next()
      .select(userSelector)
      .next(fakeUser)
      .call(queueApi.fetchJoinQueueAi, fakeUser.login)
      .next({ data: { payload: { gameId: fakeGameId } } })
      .fork(queueGameFoundSaga, queueGameFound(fakeGameId))
      .next()
      .isDone();
  });
});

describe('queueGameFoundSaga', () => {
  it('should dispatch correct actions', () => {
    return expectSaga(queueGameFoundSaga, queueGameFound(fakeGameId))
      .put(push(`${Routes.game}${fakeGameId}`))
      .put(initChat(fakeGameId))
      .put(initGameRequested(fakeGameId))
      .put.like({ action: { type: addToast().type } })
      .run();
  });
});

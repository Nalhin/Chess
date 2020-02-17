import { SagaIterator } from '@redux-saga/core';
import { all, select, take, takeEvery } from '@redux-saga/core/effects';
import {
  CheckIsGamePresentRequestedAction,
  ForfeitGameAction,
  GameActionTypes,
  GetAvailableMovesAction,
  InitGameAction,
  MakeMoveRequestedAction,
  PromotePawnAction,
  ReconnectToGameRequestedAction,
} from './game.types';
import {
  gamePersonalSubscription,
  gameStateSubscription,
} from './game.subscriptions';
import { StompSingleton } from '../../websocket/stompClient';
import { gameIdSelector, selectedPieceSelector } from './game.selectors';
import { userSelector } from '../user/user.selectors';
import { WebsocketTypes } from '../../websocket/websocketTypes';
import { call, put } from 'redux-saga-test-plan/matchers';
import { fetchIsGamePresent } from './game.api';
import {
  checkIsGamePresentFailed,
  checkIsGamePresentSucceeded,
  clearGame,
  initGameRequested,
} from './game.actions';
import { push } from 'connected-react-router';
import { Routes } from '../../interfaces/Router/Routes';
import { addToast } from '../toaster/toaster.action';
import { generateToast } from '../../utils/generateToast';
import { ToastTypes } from '../../interfaces/Toaster/ToastTypes';
import { closeChat, initChat } from '../chat/chat.actions';
import { CustomRouterActionTypes } from '../customRouter/customRouter.types';
import { didRouteChangeSelector } from '../customRouter/customRouter.selectors';

export function* gameRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(GameActionTypes.INIT_GAME, initGameSaga),
    yield takeEvery(GameActionTypes.GET_AVAILABLE_MOVES, getAvailableMovesSaga),
    yield takeEvery(GameActionTypes.MAKE_MOVE, makeMoveSaga),
    yield takeEvery(GameActionTypes.PROMOTE_PAWN, promotePawnSaga),
    yield takeEvery(
      GameActionTypes.CHECK_IS_GAME_PRESENT_REQUESTED,
      checkIsGamePresentSaga,
    ),
    yield takeEvery(
      GameActionTypes.RECONNECT_TO_GAME_REQUESTED,
      reconnectToGameSaga,
    ),
    yield takeEvery(GameActionTypes.FORFEIT_GAME, forfeitGameSaga),
  ]);
}

export function* reconnectToGameSaga(action: ReconnectToGameRequestedAction) {
  const user = yield select(userSelector);
  let gameId;
  try {
    const response = yield call(fetchIsGamePresent, user.login);
    const { isPresent } = response.data;

    if (!isPresent) {
      throw Error();
    }

    gameId = response.data.gameId;
  } catch (e) {
    yield put(push(`${Routes.home}`));
    yield put(addToast(generateToast('Game not found!', ToastTypes.Error)));
    return;
  }

  yield put(push(`${Routes.game}${gameId}`));

  yield put(initChat(gameId));
  yield put(initGameRequested(gameId));

  yield put(
    addToast(generateToast('Reconnect successful!', ToastTypes.Success)),
  );
}

export function* initGameSaga(action: InitGameAction) {
  const gameStomp = StompSingleton.getInstance(WebsocketTypes.GAME);

  const gameId = action.payload.id;
  const { login } = yield select(userSelector);

  const gameSubscription = gameStateSubscription(gameStomp, gameId);
  const availableMoves = gamePersonalSubscription(gameStomp, gameId, login);

  gameStomp.publish({
    destination: `/app/connect/${gameId}`,
    headers: { name: login },
  });

  let isOver = false;
  while (!isOver) {
    yield take(CustomRouterActionTypes.LOCATION_CHANGE);
    isOver = yield select(didRouteChangeSelector);
  }

  yield put(clearGame());
  yield put(closeChat());
  gameSubscription.unsubscribe();
  availableMoves.unsubscribe();
  StompSingleton.deactivateInstance(WebsocketTypes.GAME);
}

export function* forfeitGameSaga(action: ForfeitGameAction) {
  const gameStomp = StompSingleton.getInstance(WebsocketTypes.GAME);

  const [gameId, { login }] = yield all([
    select(gameIdSelector),
    select(userSelector),
  ]);

  gameStomp.publish({
    destination: `/app/forfeit/${gameId}`,
    headers: { name: login },
  });
}

export function* checkIsGamePresentSaga(
  action: CheckIsGamePresentRequestedAction,
) {
  try {
    const user = yield select(userSelector);
    const response = yield call(fetchIsGamePresent, user.login);
    if (response.data.isPresent) {
      yield put(checkIsGamePresentSucceeded(response.data.gameId));
    } else {
      yield put(checkIsGamePresentFailed());
    }
  } catch (e) {
    yield put(checkIsGamePresentFailed());
  }
}

export function* getAvailableMovesSaga(
  action: GetAvailableMovesAction,
): SagaIterator {
  const gameStomp = StompSingleton.getInstance(WebsocketTypes.GAME);
  const [gameId, user] = yield all([
    select(gameIdSelector),
    select(userSelector),
  ]);

  const { initialPosition } = action.payload;
  gameStomp.publish({
    destination: `/app/available-moves/${gameId}`,
    headers: { name: user.login },
    body: JSON.stringify(initialPosition),
  });
}

export function* makeMoveSaga(action: MakeMoveRequestedAction): SagaIterator {
  const gameStomp = StompSingleton.getInstance(WebsocketTypes.GAME);

  const [initialPosition, gameId, user] = yield all([
    select(selectedPieceSelector),
    select(gameIdSelector),
    select(userSelector),
  ]);

  const { destinationPosition } = action.payload;
  gameStomp.publish({
    destination: `/app/move/${gameId}`,
    headers: { name: user.login },
    body: JSON.stringify({ initialPosition, destinationPosition }),
  });
}

export function* promotePawnSaga(action: PromotePawnAction) {
  const gameStomp = StompSingleton.getInstance(WebsocketTypes.GAME);

  const [gameId, user] = yield all([
    select(gameIdSelector),
    select(userSelector),
  ]);

  gameStomp.publish({
    destination: `/app/promotion/${gameId}`,
    headers: { name: user.login },
    body: JSON.stringify(action.payload),
  });
}

import { SagaIterator } from '@redux-saga/core';
import { all, select, take, takeEvery } from '@redux-saga/core/effects';
import {
  GameBaseActionTypes,
  GameIsPresentRequestedAction,
  GameReconnectActionTypes,
  GameReconnectRequestedAction,
  GetAvailableMovesRequestedAction,
  InitGameAction,
  MakeMoveRequestedAction,
  PromotePawnAction,
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
  clearGame,
  gameIsPresentFailed,
  gameIsPresentSucceeded,
  initGameRequested,
} from './game.actions';
import { push } from 'connected-react-router';
import { locations } from '../../contants/locations';
import { addToast } from '../toaster/toaster.action';
import { generateToast } from '../../utils/toastFactory';
import { ToastTypes } from '../../interfaces/Toaster/ToastTypes';
import { closeChat, initChat } from '../chat/chat.actions';
import { CustomRouterActionTypes } from '../customRouter/customRouter.types';
import { didRouteChange } from '../customRouter/customRouter.selectors';

export function* gameRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(GameBaseActionTypes.INIT_GAME, initGameSaga),
    yield takeEvery(
      GameBaseActionTypes.GET_AVAILABLE_MOVES,
      getAvailableMovesSaga,
    ),
    yield takeEvery(GameBaseActionTypes.MAKE_MOVE, makeMoveSaga),
    yield takeEvery(GameBaseActionTypes.PROMOTE_PAWN, promotePawnSaga),
    yield takeEvery(
      GameReconnectActionTypes.GAME_IS_PRESENT_REQUESTED,
      isGamePresentSaga,
    ),
    yield takeEvery(
      GameReconnectActionTypes.GAME_RECONNECT_REQUESTED,
      reconnectToGameSaga,
    ),
    yield takeEvery(GameBaseActionTypes.FORFEIT_GAME, forfeitGameSaga),
  ]);
}

export function* reconnectToGameSaga(action: GameReconnectRequestedAction) {
  const user = yield select(userSelector);
  try {
    const response = yield call(fetchIsGamePresent, user.login);
    const { isPresent } = response.data;

    if (!isPresent) {
      throw Error();
    }
  } catch (e) {
    yield put(addToast(generateToast('Game not found!', ToastTypes.Error)));
    return;
  }

  const gameId = yield select(gameIdSelector);
  yield put(push(`${locations.game}${gameId}`));

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
    isOver = yield select(didRouteChange);
  }

  yield put(clearGame());
  yield put(closeChat());
  gameSubscription.unsubscribe();
  availableMoves.unsubscribe();
  StompSingleton.deactivateInstance(WebsocketTypes.GAME);
}

export function* forfeitGameSaga() {
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

export function* isGamePresentSaga(action: GameIsPresentRequestedAction) {
  try {
    const user = yield select(userSelector);
    const response = yield call(fetchIsGamePresent, user.login);
    if (response.data.isPresent) {
      yield put(gameIsPresentSucceeded(response.data.gameId));
    }
  } catch (e) {
    yield put(gameIsPresentFailed());
  }
}

function* getAvailableMovesSaga(
  action: GetAvailableMovesRequestedAction,
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

function* makeMoveSaga(action: MakeMoveRequestedAction): SagaIterator {
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

function* promotePawnSaga(action: PromotePawnAction) {
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

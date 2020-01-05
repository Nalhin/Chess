import { SagaIterator } from '@redux-saga/core';
import { all, select, take, takeEvery, race } from '@redux-saga/core/effects';
import {
  GameActionTypes,
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
import { websocketTypes } from '../../websocket/websocketTypes';
import { call, put } from 'redux-saga-test-plan/matchers';
import { fetchIsGamePresent, fetchReconnectToGame } from './game.api';
import {
  clearGame,
  gameIsPresentFailed,
  gameIsPresentSucceeded,
  gameReconnectFailed,
  gameReconnectSucceeded,
} from './game.actions';
import { push } from 'connected-react-router';
import { locations } from '../../contants/locations';
import { addToast } from '../toaster/toaster.action';
import { generateToast } from '../../utils/toastFactory';
import { ToastTypes } from '../../interfaces/ToastTypes';
import { CustomRouterActionTypes } from '../customRouter/customRouter.types';
import { closeChat, initChat } from '../chat/chat.actions';

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
  ]);
}

export function* initGameSaga(action: InitGameAction) {
  const gameStomp = StompSingleton.getInstance(websocketTypes.GAME);

  const gameId = action.payload.id;
  const { login } = yield select(userSelector);

  const gameSubscription = gameStateSubscription(gameStomp, gameId);
  const availableMoves = gamePersonalSubscription(gameStomp, gameId, login);

  gameStomp.publish({
    destination: `/app/connect/${gameId}`,
    headers: { name: login },
  });

  yield race([
    take(GameActionTypes.CLOSE_GAME),
    take(CustomRouterActionTypes.LOCATION_CHANGE),
  ]);
  yield put(clearGame());
  gameSubscription.unsubscribe();
  availableMoves.unsubscribe();
}

export function* isGamePresentSaga(action: GameIsPresentRequestedAction) {
  try {
    const user = yield select(userSelector);
    const response = yield call(fetchIsGamePresent, user.login);

    yield put(gameIsPresentSucceeded(response.data.gameId));
  } catch (e) {
    yield put(gameIsPresentFailed());
  }
}

//TODO UNIFY WITH INIT GAME
export function* reconnectToGameSaga(action: GameReconnectRequestedAction) {
  const gameStomp = StompSingleton.getInstance(websocketTypes.GAME);

  const [gameId, user] = yield all([
    select(gameIdSelector),
    select(userSelector),
  ]);

  try {
    const response = yield call(fetchReconnectToGame, gameId, user.login);
    yield put(gameReconnectSucceeded(response.data.game));
  } catch (e) {
    yield put(gameReconnectFailed());
  }
  yield put(initChat(gameId));
  yield put(push(`${locations.game}${gameId}`));
  yield put(
    addToast(generateToast('Reconnect successful!', ToastTypes.SUCCESS)),
  );

  const gameSubscription = gameStateSubscription(gameStomp, gameId);
  const availableMoves = gamePersonalSubscription(
    gameStomp,
    gameId,
    user.login,
  );
  yield race([
    take(GameActionTypes.CLOSE_GAME),
    take(CustomRouterActionTypes.LOCATION_CHANGE),
  ]);
  yield put(clearGame());
  yield put(closeChat());
  gameSubscription.unsubscribe();
  availableMoves.unsubscribe();
}

function* getAvailableMovesSaga(
  action: GetAvailableMovesRequestedAction,
): SagaIterator {
  const gameStomp = StompSingleton.getInstance(websocketTypes.GAME);
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
  const gameStomp = StompSingleton.getInstance(websocketTypes.GAME);

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
  const gameStomp = StompSingleton.getInstance(websocketTypes.GAME);

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

import { SagaIterator } from '@redux-saga/core';
import { all, takeEvery } from '@redux-saga/core/effects';
import {
  LoginUserRequestedAction,
  LogoutUserAction,
  RegisterUserRequestedAction,
  UserActionTypes,
} from './user.types';
import {
  fetchAuthenticateUser,
  fetchLoginUser,
  fetchRegisterUser,
} from './user.api';
import { call, fork, put } from 'redux-saga-test-plan/matchers';
import {
  authenticationSucceeded,
  loginUserFailed,
  loginUserSucceeded,
  registerUserFailed,
  registerUserSucceeded,
  setToken,
} from './user.actions';
import Cookies from 'js-cookie';
import { closeChat } from '../chat/chat.actions';
import { closeGame } from '../game/game.actions';
import { push } from 'connected-react-router';
import { Routes } from '../../interfaces/Router/Routes';
import { addToast } from '../toaster/toaster.action';
import { ToastTypes } from '../../interfaces/Toaster/ToastTypes';
import { generateToast } from '../../utils/toastFactory';
import { generateErrorMessage } from '../../utils/generateErrorMessage';
import { leaveQueue } from '../queue/queue.actions';
import { clearMatchHistory } from '../matchHistory/matchHistory.actions';

export function* userRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(UserActionTypes.LOGIN_USER_REQUESTED, loginUserSaga),
    yield takeEvery(UserActionTypes.REGISTER_USER_REQUESTED, registerUserSaga),
    yield takeEvery(UserActionTypes.LOGOUT_USER, logoutSaga),
    fork(authenticateUserSaga),
  ]);
}

export function* loginUserSaga(action: LoginUserRequestedAction) {
  try {
    const response = yield call(fetchLoginUser, action.payload.user);
    Cookies.set('token', response.data.token, { expires: 7 });
    yield put(loginUserSucceeded(response.data));
    yield put(
      addToast(
        generateToast(`Welcome ${response.data.login}`, ToastTypes.Info),
      ),
    );
  } catch (e) {
    yield put(loginUserFailed());
    yield put(
      addToast(generateToast(generateErrorMessage(e), ToastTypes.Error)),
    );
  }
}

export function* registerUserSaga(action: RegisterUserRequestedAction) {
  try {
    const response = yield call(fetchRegisterUser, action.payload.user);
    Cookies.set('token', response.data.token, { expires: 7 });
    yield put(registerUserSucceeded(response.data));
    yield put(
      addToast(
        generateToast(`Welcome ${response.data.login}`, ToastTypes.Info),
      ),
    );
  } catch (e) {
    yield put(
      addToast(generateToast(generateErrorMessage(e), ToastTypes.Error)),
    );
    yield put(registerUserFailed());
  }
}

export function* authenticateUserSaga() {
  try {
    const token = Cookies.get('token');
    if (!token) {
      return;
    }
    yield put(setToken(token));
    const response = yield call(fetchAuthenticateUser, token);
    yield put(authenticationSucceeded(response.data));
  } catch (e) {
    Cookies.remove('token');
    yield put(setToken(''));
  }
}

export function* logoutSaga(action: LogoutUserAction) {
  Cookies.remove('token');
  yield put(push(Routes.logout));
  yield put(closeChat());
  yield put(closeGame());
  yield put(leaveQueue());
  yield put(clearMatchHistory());
  yield put(addToast(generateToast('Logout successful', ToastTypes.Info)));
}

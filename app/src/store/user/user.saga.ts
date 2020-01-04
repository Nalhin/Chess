import { SagaIterator } from '@redux-saga/core';
import { all, takeEvery } from '@redux-saga/core/effects';
import {
  LoginUserRequestedAction,
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
  authenticationSucceededAction,
  loginUserFailedAction,
  loginUserSucceeded,
  registerUserFailedAction,
  registerUserSucceeded,
  setToken,
} from './user.actions';
import Cookies from 'js-cookie';
import { closeChat } from '../chat/chat.actions';
import { closeGame } from '../game/game.actions';
import { push } from 'connected-react-router';
import { locations } from '../../contants/locations';

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
    Cookies.set('token', response.data.token);
    yield put(loginUserSucceeded(response.data));
  } catch (e) {
    yield put(registerUserFailedAction('error'));
  }
}

export function* registerUserSaga(action: RegisterUserRequestedAction) {
  try {
    const response = yield call(fetchRegisterUser, action.payload.user);
    Cookies.set('token', response.data.token);
    yield put(registerUserSucceeded(response.data));
  } catch (e) {
    yield put(loginUserFailedAction('error'));
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

    yield put(authenticationSucceededAction(response.data));
  } catch (e) {
    Cookies.remove('token');
    return;
  }
}

export function* logoutSaga() {
  Cookies.remove('token');
  yield put(push(locations.logout));
  yield put(closeChat());
  yield put(closeGame());
}

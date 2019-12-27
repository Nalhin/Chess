import { SagaIterator } from '@redux-saga/core';
import { all, takeEvery } from '@redux-saga/core/effects';
import {
  LoginUserRequestedAction,
  RegisterUserRequestedAction,
  UserActionTypes,
} from './user.types';
import { fetchLoginUser, fetchRegisterUser } from './user.api';
import { call, put } from 'redux-saga-test-plan/matchers';
import {
  loginUserSucceeded,
  registerUserFailedAction,
  registerUserSucceeded,
} from './user.actions';

export function* userRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(UserActionTypes.LOGIN_USER_REQUESTED, loginUserSaga),
    yield takeEvery(UserActionTypes.REGISTER_USER_REQUESTED, registerUserSaga),
  ]);
}

export function* loginUserSaga(action: LoginUserRequestedAction) {
  try {
    const response = yield call(fetchLoginUser, action.payload.user);
    yield put(loginUserSucceeded(response.data));
  } catch (e) {
    yield put(registerUserFailedAction('error'));
  }
}

export function* registerUserSaga(action: RegisterUserRequestedAction) {
  try {
    const response = yield call(fetchRegisterUser, action.payload.user);
    yield put(registerUserSucceeded(response.data));
  } catch (e) {
    yield put(registerUserFailedAction('error'));
  }
}

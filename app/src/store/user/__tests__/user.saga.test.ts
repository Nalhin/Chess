// @ts-nocheck
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import {
  authenticateUserSaga,
  loginUserSaga,
  logoutSaga,
  registerUserSaga,
} from '../user.saga';
import {
  authenticationSucceeded,
  loginUserFailed,
  loginUserRequested,
  loginUserSucceeded,
  logoutUser,
  registerUserFailed,
  registerUserRequested,
  registerUserSucceeded,
  setToken,
} from '../user.actions';
import {
  fakeLoginUser,
  fakeRegisterUser,
  fakeUser,
} from '../../../../test/fixtures/user/user';
import * as userApi from '../user.api';
import Cookies from 'js-cookie';
import { call } from 'redux-saga-test-plan/matchers';
import { addToast } from '../../toaster/toaster.action';
import { throwError } from 'redux-saga-test-plan/providers';
import { fakeToaster } from '../../../../test/fixtures/toaster/fakeToaster';
import { push } from 'connected-react-router';
import { Routes } from '../../../interfaces/Router/Routes';
import { closeChat } from '../../chat/chat.actions';
import { closeGame } from '../../game/game.actions';
import { leaveQueue } from '../../queue/queue.actions';
import { clearMatchHistory } from '../../matchHistory/matchHistory.actions';

jest.mock('../user.api', () => ({
  fetchLoginUser: jest.fn(),
  fetchRegisterUser: jest.fn(),
  fetchAuthenticateUser: jest.fn(),
}));

Cookies.set = jest.fn();
Cookies.get = jest.fn();
Cookies.remove = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();
});

describe('loginUserSaga', () => {
  it('should login user and set cookie', () => {
    testSaga(loginUserSaga, loginUserRequested(fakeLoginUser))
      .next()
      .call(userApi.fetchLoginUser, fakeLoginUser)
      .next({ data: { ...fakeUser } })
      .put(loginUserSucceeded(fakeUser))
      .next()
      .next()
      .isDone();

    expect(Cookies.set).toHaveBeenCalledTimes(1);
  });
  it('should handle user login and dispatch proper actions', () => {
    return expectSaga(loginUserSaga, loginUserRequested(fakeLoginUser))
      .provide([
        [
          call(userApi.fetchLoginUser, fakeLoginUser),
          { data: { ...fakeUser } },
        ],
      ])
      .put(loginUserSucceeded(fakeUser))
      .put.like({ action: { type: addToast(fakeToaster).type } })
      .run();
  });
  it('should handle user login error and dispatch proper actions', () => {
    const error = new Error('error');

    return expectSaga(loginUserSaga, loginUserRequested(fakeLoginUser))
      .provide([
        [call(userApi.fetchLoginUser, fakeLoginUser), throwError(error)],
      ])
      .put(loginUserFailed())
      .put.like({ action: { type: addToast(fakeToaster).type } })
      .run();
  });
});

describe('registerUserSaga', () => {
  it('should handle register user and set cookie', () => {
    testSaga(registerUserSaga, registerUserRequested(fakeRegisterUser))
      .next()
      .call(userApi.fetchRegisterUser, fakeRegisterUser)
      .next({ data: { ...fakeUser } })
      .put(registerUserSucceeded(fakeUser))
      .next()
      .next()
      .isDone();

    expect(Cookies.set).toHaveBeenCalledTimes(1);
  });
  it('should handle user register and dispatch proper actions', () => {
    return expectSaga(registerUserSaga, registerUserRequested(fakeRegisterUser))
      .provide([
        [
          call(userApi.fetchRegisterUser, fakeRegisterUser),
          { data: { ...fakeUser } },
        ],
      ])
      .put(registerUserSucceeded(fakeUser))
      .put.like({ action: { type: addToast(fakeToaster).type } })
      .run();
  });
  it('should handle user register error and dispatch proper actions', () => {
    const error = new Error('error');

    return expectSaga(registerUserSaga, registerUserRequested(fakeRegisterUser))
      .provide([
        [call(userApi.fetchRegisterUser, fakeRegisterUser), throwError(error)],
      ])
      .put(registerUserFailed())
      .put.like({ action: { type: addToast(fakeToaster).type } })
      .run();
  });
});

describe('authenticateUserSaga', () => {
  it('should return, if token is absent', () => {
    Cookies.get.mockImplementation(() => '');
    testSaga(authenticateUserSaga)
      .next()
      .isDone();

    expect(Cookies.get).toHaveBeenCalledTimes(1);
  });
  it(`should set token, call authenticate user and put authentication
  succeeded action, if user is found`, () => {
    const token = 'token';
    Cookies.get.mockImplementation(() => token);

    testSaga(authenticateUserSaga)
      .next()
      .put(setToken(token))
      .next()
      .call(userApi.fetchAuthenticateUser, token)
      .next({ data: { ...fakeUser } })
      .put(authenticationSucceeded(fakeUser))
      .next()
      .isDone();
  });
  it('should remove token, and put set token, if user is not found', () => {
    const token = 'token';
    Cookies.get.mockImplementation(() => token);

    testSaga(authenticateUserSaga)
      .next()
      .put(setToken(token))
      .next()
      .call(userApi.fetchAuthenticateUser, token)
      .next()
      .put(setToken(''))
      .next()
      .isDone();
  });
});

describe('logoutSaga', () => {
  it('should remove cookie', () => {
    logoutSaga(logoutUser).next();

    expect(Cookies.remove).toHaveBeenCalledTimes(1);
  });
  it('should dispatch correct actions', () => {
    return expectSaga(logoutSaga)
      .put(push(Routes.logout))
      .put(closeChat())
      .put(closeGame())
      .put(leaveQueue())
      .put(clearMatchHistory())
      .put.like({ action: { type: addToast().type } })
      .run();
  });
});

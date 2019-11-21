import { SagaIterator } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';
import { ChatBaseActionTypes } from './chat.types';

export function* chatRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(ChatBaseActionTypes.SEND_MESSAGE, sendMessageSaga),
  ]);
}

export function* initChatSaga(): SagaIterator {}

export function* sendMessageSaga(): SagaIterator {}

import { SagaIterator } from 'redux-saga';
import { all, select, take, takeEvery } from 'redux-saga/effects';
import {
  ChatBaseActionTypes,
  InitChatAction,
  SendMessageAction,
} from './chat.types';
import { StompSingleton } from '../../websocket/stompClient';
import { userSelector } from '../user/user.selectors';
import { chatSubscription } from './chat.subscriptions';
import { websocketTypes } from '../../websocket/websocketTypes';

export function* chatRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(ChatBaseActionTypes.INIT_CHAT, initChatSaga),
    yield takeEvery(ChatBaseActionTypes.SEND_MESSAGE, sendMessageSaga),
  ]);
}

const chatId = '3ece1b67-8e42-442c-8d38-cc150ad328af';

export function* initChatSaga(action: InitChatAction): SagaIterator {
  const chatStomp = StompSingleton.getInstance(websocketTypes.CHAT);

  const subscription = chatSubscription(chatStomp, chatId);

  yield take(ChatBaseActionTypes.CLOSE_CHAT);
  subscription.unsubscribe();
}

export function* sendMessageSaga(action: SendMessageAction): SagaIterator {
  const chatStomp = StompSingleton.getInstance(websocketTypes.CHAT);

  const user = yield select(userSelector);

  chatStomp.publish({
    destination: `/app/chat/${chatId}`,
    headers: { name: user.name },
    body: action.payload.content,
  });
}

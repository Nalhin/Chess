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
import { WebsocketTypes } from '../../websocket/websocketTypes';

export function* chatRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(ChatBaseActionTypes.INIT_CHAT, initChatSaga),
    yield takeEvery(ChatBaseActionTypes.SEND_MESSAGE, sendMessageSaga),
  ]);
}

export function* initChatSaga(action: InitChatAction): SagaIterator {
  const chatStomp = StompSingleton.getInstance(WebsocketTypes.CHAT);

  const user = yield select(userSelector);

  const subscription = chatSubscription(
    chatStomp,
    action.payload.chatId,
    user.login,
  );

  yield take(ChatBaseActionTypes.CLOSE_CHAT);
  subscription.unsubscribe();
  StompSingleton.deactivateInstance(WebsocketTypes.CHAT);
}

export function* sendMessageSaga(action: SendMessageAction): SagaIterator {
  const chatStomp = StompSingleton.getInstance(WebsocketTypes.CHAT);

  const [user, chatId] = yield all([
    select(userSelector),
    select(state => state.chat.id),
  ]);

  chatStomp.publish({
    destination: `/app/chat/${chatId}`,
    headers: { login: user.login },
    body: action.payload.content,
  });
}

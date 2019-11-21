import { Reducer } from 'react';
import { ChatActions, ChatActionTypes, ChatState } from './chat.types';
import produce from 'immer';

export const CHAT_INITIAL_STATE: ChatState = {
  messages: [],
};

const chatReducer: Reducer<ChatState, ChatActions> = (
  state = CHAT_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case ChatActionTypes.NEW_MESSAGE_RECEIVED:
        draft.messages.push(action.payload.message);
    }
  });
};

export default chatReducer;

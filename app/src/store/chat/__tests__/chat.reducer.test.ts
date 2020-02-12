import chatReducer, { CHAT_INITIAL_STATE } from '../chat.reducer';
import produce from 'immer';
import { fakeChatMessage } from '../../../../test/fixtures/chat/chatMessage';
import { closeChat, initChat, newMessageReceived } from '../chat.actions';

describe('Chat Reducer', () => {
  it('Should handle INIT_CHAT action', () => {
    const chatId = 'cad20f64-f6c2-46e0-b334-397790dbf69c';
    const initialState = {
      ...CHAT_INITIAL_STATE,
    };
    const expectedState = produce(CHAT_INITIAL_STATE, draft => {
      draft.id = chatId;
    });

    const action = initChat(chatId);
    const reducer = chatReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle NEW_MESSAGE_RECEIVED action', () => {
    const initialState = {
      ...CHAT_INITIAL_STATE,
    };
    const expectedState = produce(CHAT_INITIAL_STATE, draft => {
      draft.messages = [fakeChatMessage, fakeChatMessage];
    });

    const action = newMessageReceived(fakeChatMessage);
    const reducerAfterFirstAction = chatReducer(initialState, action);
    const reducerAfterSecondAction = chatReducer(
      reducerAfterFirstAction,
      action,
    );

    expect(reducerAfterSecondAction).toEqual(expectedState);
  });

  it('Should handle close chat action', () => {
    const chatId = 'cad20f64-f6c2-46e0-b334-397790dbf69c';
    const initialState = produce(CHAT_INITIAL_STATE, draft => {
      draft.messages = [fakeChatMessage];
      draft.id = chatId;
    });
    const expectedState = {
      ...CHAT_INITIAL_STATE,
    };

    const action = closeChat();
    const reducer = chatReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
});

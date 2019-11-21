import chatReducer, { CHAT_INITIAL_STATE } from '../chat.reducer';
import produce from 'immer';
import { fakeChatMessage } from '../../../../test/fixtures/chat/chatMessage';
import { newMessageReceived } from '../chat.actions';

describe('Chat Reducer', () => {
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
});

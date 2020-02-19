import { fakeChatMessage } from '../fakeChatMessage';

export const fakeSubscriptionChatMessage = {
  body: JSON.stringify({
    message: { ...fakeChatMessage },
  }),
};

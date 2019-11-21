import { fakeChatMessage } from '../chatMessage';

export const fakeSubscriptionChatMessage = {
  body: JSON.stringify({
    message: { ...fakeChatMessage },
  }),
};

import { useEffect, useState } from 'react';

export function useUnreadMessagesCount(
  messageCount: number,
  isChatOpen: boolean,
) {
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    setUnreadMessagesCount(0);
  }, [isChatOpen]);

  useEffect(() => {
    if (messageCount) {
      setUnreadMessagesCount(unreadMessagesCount + 1);
    }
  }, [messageCount]);

  return unreadMessagesCount;
}

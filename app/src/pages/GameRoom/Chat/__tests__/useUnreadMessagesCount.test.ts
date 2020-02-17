import { renderHook } from '@testing-library/react-hooks';
import { useUnreadMessagesCount } from '../useUnreadMessagesCount';

describe('useUnreadMessagesCount', () => {
  it('should update with new messages', () => {
    let messageCount = 2;
    const isChatOpen = true;
    const { result, rerender } = renderHook(() =>
      useUnreadMessagesCount(messageCount, isChatOpen),
    );

    messageCount++;
    rerender();
    messageCount++;
    rerender();

    expect(result.current).toBe(3);
  });
  it('should reset message count on opening', () => {
    let messageCount = 2;
    let isChatOpen = true;
    const { result, rerender } = renderHook(() =>
      useUnreadMessagesCount(messageCount, isChatOpen),
    );

    messageCount++;
    rerender();
    messageCount++;
    rerender();
    isChatOpen = false;
    rerender();

    expect(result.current).toBe(0);
  });
});

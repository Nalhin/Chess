import { renderHook } from '@testing-library/react-hooks';
import { useGlobalStyles } from '../useGlobalStyles';

describe('useGlobalStyles', () => {
  it('should change styles after some time ', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGlobalStyles());

    const styles = result.current;
    await waitForNextUpdate();
    const newStyles = result.current;

    expect(newStyles).not.toBe(styles);
  });
});

// @ts-nocheck
import Cookie from 'js-cookie';
import { useColorTheme } from '../useColorTheme';
import { ColorTheme } from '../../interfaces/Styles/ColorTheme';
import { act, renderHook } from '@testing-library/react-hooks';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

describe('useColorTheme', () => {
  it('should allow changing theme and set cookie', () => {
    const { result } = renderHook(() => useColorTheme());

    const initial = result.current.colorTheme;

    act(() => {
      result.current.changeColorTheme();
    });

    expect(initial).not.toBe(result.current.colorTheme);
    expect(Cookie.set).toHaveBeenCalledTimes(1);
  });

  it('should theme value from cookie', () => {
    Cookie.get.mockImplementation(() => String(true));

    const { result } = renderHook(() => useColorTheme());

    expect(result.current.colorTheme).toBe(ColorTheme.Dark);
  });
});

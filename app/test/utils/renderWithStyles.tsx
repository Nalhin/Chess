import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/core';
import { theme } from '../../src/styles/theme';
import * as React from 'react';

export const renderWithStyles = (ui: JSX.Element) => {
  return {
    ...render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>),
    history,
    theme,
  };
};

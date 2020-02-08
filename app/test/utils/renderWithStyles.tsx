import { render } from '@testing-library/react';
import * as React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { muiTheme } from '../../src/styles/theme';

export const renderWithStyles = (ui: JSX.Element) => {
  return {
    ...render(<ThemeProvider theme={muiTheme}>{ui}</ThemeProvider>),
    history,
    theme: muiTheme,
  };
};

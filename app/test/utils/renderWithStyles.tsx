import { render } from '@testing-library/react';
import * as React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { getMuiTheme } from '../../src/styles/theme';
import { ColorMode } from '../../src/interfaces/Styles/ColorMode';

export const renderWithStyles = (ui: JSX.Element) => {
  return {
    ...render(
      <ThemeProvider theme={getMuiTheme(ColorMode.Light)}>{ui}</ThemeProvider>,
    ),
    history,
    theme: getMuiTheme(ColorMode.Light),
  };
};

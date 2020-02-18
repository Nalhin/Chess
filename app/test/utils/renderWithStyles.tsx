import { render } from '@testing-library/react';
import * as React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { getMuiTheme } from '../../src/styles/muiTheme';
import { ColorTheme } from '../../src/interfaces/Styles/ColorTheme';

export const renderWithStyles = (ui: JSX.Element) => {
  return {
    ...render(
      <ThemeProvider theme={getMuiTheme(ColorTheme.Light)}>{ui}</ThemeProvider>,
    ),
    theme: getMuiTheme(ColorTheme.Light),
  };
};

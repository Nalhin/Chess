import { render } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core';
import { getMuiTheme } from '../../src/styles/muiTheme';
import { ColorTheme } from '../../src/interfaces/Styles/ColorTheme';
import * as React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export const renderWithDnd = (ui: JSX.Element) => {
  return {
    ...render(
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={getMuiTheme(ColorTheme.Light)}>
          {ui}
        </ThemeProvider>
      </DndProvider>,
    ),
    theme: getMuiTheme(ColorTheme.Light),
  };
};

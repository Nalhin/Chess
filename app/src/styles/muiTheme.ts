import { createMuiTheme } from '@material-ui/core/styles';
import { ColorTheme } from '../interfaces/Styles/ColorTheme';

export const getMuiTheme = (mode: ColorTheme) =>
  createMuiTheme({
    palette: {
      type: mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

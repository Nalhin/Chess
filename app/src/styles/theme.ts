import { createMuiTheme } from '@material-ui/core/styles';
import { ColorMode } from '../interfaces/Styles/ColorMode';

export const getMuiTheme = (mode: ColorMode) =>
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

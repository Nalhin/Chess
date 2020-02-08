import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const colors = {
  textPrimary: '#000000',
  textSecondary: '#3e3e3e',
  textLight: '#ffffff',
  background: '#f8f8f8',
  foreground: '#ffffff',
  backgroundDarker: '#d6d6d6',
  backgroundHover: '#00000011',
  primary: '#1976d2',
  primaryHover: '#1976d2cc',
  secondary: '#f50057',
  secondaryHover: '#ffc107cc',
  error: '#f44336',
  success: '#43a047',
};

const space = [0, 4, 8, 16, 32];

const breakpoints = ['40em', '52em', '64em'];

const fontSizes = [12, 14, 16, 20, 24, 32];

export const theme = {
  colors,
  breakpoints,
  fontWeights: {
    body: 400,
    heading: 700,
  },
  space: {
    small: space[1],
    medium: space[2],
    large: space[3],
    giga: space[4],
  },
  fontSizes: {
    small: fontSizes[0],
    body: fontSizes[2],
    larger: fontSizes[4],
  },
  mediaQueries: {
    small: `@media screen and (max-width: ${breakpoints[0]})`,
    medium: `@media screen and (max-width: ${breakpoints[1]})`,
    large: `@media screen and (max-width: ${breakpoints[2]})`,
  },
};

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: theme.colors.primary,
    },
    secondary: {
      main: theme.colors.secondary,
    },
  },
});

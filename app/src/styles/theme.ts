const colors = {
  textPrimary: '#000000',
  textSecondary: '#3e3e3e',
  textLight: '#ffffff',
  background: '#f8f8f8',
  foreground: '#ffffff',
  primary: '#1976d2',
  primaryHover: '#1976d2cc',
  secondary: '',
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
    body: fontSizes[2],
    larger: fontSizes[4],
  },
  mediaQueries: {
    small: `@media screen and (min-width: ${breakpoints[0]})`,
    medium: `@media screen and (min-width: ${breakpoints[1]})`,
    large: `@media screen and (min-width: ${breakpoints[2]})`,
  },
};

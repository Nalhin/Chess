import '@emotion/react';
import { Theme as MuiTheme } from '@material-ui/core/styles/createMuiTheme';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}

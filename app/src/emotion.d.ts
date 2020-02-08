import '@emotion/core';
import { Theme as MuiTheme } from '@material-ui/core/styles/createMuiTheme';

declare module '@emotion/core' {
  export interface Theme extends MuiTheme {}
}

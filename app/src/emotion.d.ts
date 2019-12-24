import '@emotion/core';

declare module '@emotion/core' {
  export interface Theme {
    colors: {
      textPrimary: string;
      textSecondary: string;
      background: string;
      foreground: string;
      error: string;
    };
    breakpoints: string[];
    fontWeights: {
      body: number;
      heading: number;
    };
    space: {
      small: number;
      medium: number;
      large: number;
      giga: number;
    };
    fontSizes: {
      body: number;
    };
    mediaQueries: {
      small: string;
      medium: string;
      large: string;
    };
  }
}

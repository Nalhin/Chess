import '@emotion/core';

declare module '@emotion/core' {
  export interface Theme {
    colors: {
      textPrimary: string;
      textSecondary: string;
      textLight: string;
      primary: string;
      primaryHover: string;
      secondary: string;
      background: string;
      foreground: string;
      error: string;
      success: string;
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
      larger: number;
    };
    mediaQueries: {
      small: string;
      medium: string;
      large: string;
    };
  }
}

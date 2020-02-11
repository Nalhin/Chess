import React from 'react';
import { reset } from './global';

export const useGlobalStyles = () => {
  const [styles, setStyles] = React.useState(reset);

  React.useEffect(() => {
    setTimeout(() => {
      setStyles(
        `
          ${styles}
          * {
             transition: background 0.5s;
          }`,
      );
    }, 1000);
  }, []);
  return styles;
};

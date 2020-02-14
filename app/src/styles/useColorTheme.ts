import { useMediaQuery } from '@material-ui/core';
import { ColorTheme } from '../interfaces/Styles/ColorTheme';
import React from 'react';
import Cookies from 'js-cookie';

export const useColorTheme = () => {
  const darkModeCookie = Cookies.get('isDarkTheme');
  const isDarkTheme = darkModeCookie ? JSON.parse(darkModeCookie) : null;
  const isDarkThemePreferred = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersDarkMode = isDarkTheme ?? isDarkThemePreferred;
  const mode = prefersDarkMode ? ColorTheme.Dark : ColorTheme.Light;

  const [colorTheme, setColorTheme] = React.useState(mode);
  const changeColorTheme = () => {
    const isOldThemeDark = colorTheme === ColorTheme.Dark;
    setColorTheme(isOldThemeDark ? ColorTheme.Light : ColorTheme.Dark);
    Cookies.set('isDarkTheme', String(!isOldThemeDark), { expires: 7 });
  };

  return { colorTheme, changeColorTheme };
};

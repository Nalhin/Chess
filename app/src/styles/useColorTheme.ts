import { useMediaQuery } from '@material-ui/core';
import { ColorMode } from '../interfaces/Styles/ColorMode';
import React from 'react';
import Cookies from 'js-cookie';

export const useColorTheme = () => {
  const darkModeCookie = Cookies.get('isDarkMode');
  const { isDarkMode } = darkModeCookie
    ? JSON.parse(darkModeCookie)
    : { isDarkMode: undefined };
  const isDarkModePreferred = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersDarkMode = isDarkMode ?? isDarkModePreferred;
  const mode = prefersDarkMode ? ColorMode.Dark : ColorMode.Light;

  const [colorTheme, setColorTheme] = React.useState(mode);
  const changeColorTheme = () => {
    const isOldModeDark = colorTheme === ColorMode.Dark;
    setColorTheme(isOldModeDark ? ColorMode.Light : ColorMode.Dark);
    Cookies.set('isDarkMode', { isDarkMode: !isOldModeDark }, { expires: 7 });
  };

  return { colorTheme, changeColorTheme };
};

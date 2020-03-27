import {DefaultTheme} from '@react-navigation/native';

import {blackColor, whiteColor, primaryColor, borderColor} from './colors';

const themes = {
  light: {
    mode: 'light',
    textColor: blackColor,
    backgroundColor: whiteColor,
    primary: primaryColor,
    navigation: {
      ...DefaultTheme.colors,
    },
  },
  dark: {
    mode: 'dark',
    textColor: whiteColor,
    backgroundColor: blackColor,
    primary: primaryColor,
    navigation: {
      primary: primaryColor,
      background: 'rgb(28, 28, 30)',
      text: whiteColor,
      card: 'rgb(28, 28, 30)',
      border: borderColor,
    },
  },
};

export default themes;

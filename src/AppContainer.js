import 'react-native-gesture-handler';
import React, {useCallback} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  useDarkMode,
  useDarkModeContext,
  DarkModeProvider,
} from 'react-native-dark-mode';
import {useTranslation} from 'react-i18next';

import samples from './constants/samples';
import settings from './constants/settings';
import bottomTabs1 from './constants/bottom-tabs';
import {SYSTEM, DARK} from './constants/theme-modes';
import {SYSTEM as LOCAL_SYSTEM} from './constants/locales';
import AppIntro from './AppIntro';
import {primaryColor} from './constants/colors';
import './i18n';
import {changeLocale} from './store/action-creators';

const Tab = createBottomTabNavigator();
const SN = createStackNavigator();
export const LocalizationContext = React.createContext();

const BottomTabNavigator = () => {
  const isDarkMode = useDarkMode();
  const bottomTabs = useSelector(state => state.bottomTabs);

  const {t} = React.useContext(LocalizationContext);

  const tabScreen = bottomTabs.map(tab => {
    const {name, title, activeIcon, inactiveIcon} = tab;
    const Comp = bottomTabs1[name].Comp;
    const IconComp = bottomTabs1[name].IconComp;
    // const realTitle = t(title);
    const options = {
      title: t(title),
      tabBarIcon: ({focused, color, size}) => {
        const props = {
          name: focused ? activeIcon : inactiveIcon,
          size,
          color,
        };

        return <IconComp {...props} />;
      },
    };
    return <Tab.Screen name={name} options={options} component={Comp} />;
  });

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: primaryColor,
        inactiveTintColor: isDarkMode ? '#f7f7f7' : '#999',
      }}>
      {tabScreen}
    </Tab.Navigator>
  );
};

const App = () => {
  const bottomTabs = useSelector(state => state.bottomTabs);
  const {t} = React.useContext(LocalizationContext);

  return (
    <SN.Navigator>
      <SN.Screen
        name="AppIntro"
        component={AppIntro}
        options={{headerShown: false}}
      />
      <SN.Screen
        name="BottomTabNavigator"
        options={({route, navigation}) => {
          return {
            title:
              (route &&
                route.state &&
                t(bottomTabs[route.state.index].title)) ||
              t(bottomTabs[0].title),
            headerTitle:
              (route &&
                route.state &&
                t(bottomTabs[route.state.index].title)) ||
              t(bottomTabs[0].title),
          };
        }}
        component={BottomTabNavigator}
      />
      {samples.map(sample => {
        // const realTitle = t(sample.title);
        const parent = (
          <SN.Screen
            name={sample.routeName}
            options={{
              title: t(sample.title),
              headerTitle: t(sample.title),
            }}
            component={sample.component}
          />
        );
        return !sample.children
          ? parent
          : [parent].concat(
              sample.children.map(child => (
                <SN.Screen
                  name={child.routeName}
                  options={{
                    title: t(child.title),
                    headerTitle: t(sample.title),
                  }}
                  component={child.component}
                />
              )),
            );
      })}
      {settings.map(setting => {
        // const realTitle = t(setting.title);
        return (
          <SN.Screen
            name={setting.routeName}
            options={{
              title: t(setting.title),
              headerTitle: t(setting.title),
              headerShown: !setting.hiddenHeader,
            }}
            component={setting.component}
          />
        );
      })}
    </SN.Navigator>
  );
};

const AppL10nWrapper = ({theme}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  let locale = useSelector(state => state.locale);
  if (locale === LOCAL_SYSTEM) {
    locale = i18n.language;
  }
  const setLocale = useCallback(locale => dispatch(changeLocale(locale)), []);

  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => t(scope, {locale, ...options}),
      locale,
      setLocale,
    }),
    [locale],
  );

  return (
    <LocalizationContext.Provider value={localizationContext}>
      <NavigationContainer theme={theme}>
        <App />
      </NavigationContainer>
    </LocalizationContext.Provider>
  );
};

const AppContainer = () => {
  const darkMode = useSelector(state => state.darkMode);
  const systemMode = useDarkModeContext();
  const mode = darkMode === SYSTEM ? systemMode : darkMode;
  const darkColors = {
    primary: primaryColor,
    background: 'rgb(28, 28, 30)',
    text: 'rgb(255, 255, 255)',
    card: 'rgb(28, 28, 30)',
    border: '#999',
  };
  const theme = {
    ...DefaultTheme,
    dark: mode === DARK,
    colors: mode === DARK ? darkColors : DefaultTheme.colors,
  };
  return (
    <DarkModeProvider mode={mode}>
      <AppL10nWrapper theme={theme} />
    </DarkModeProvider>
  );
};

export default AppContainer;

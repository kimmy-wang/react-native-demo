import 'react-native-gesture-handler';
import React from 'react';

import {useSelector} from 'react-redux';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  useDarkMode,
  useDarkModeContext,
  DarkModeProvider,
} from 'react-native-dark-mode';

import samples from './constants/samples';
import settings from './constants/settings';
import bottomTabs1 from './constants/bottom-tabs';
import {SYSTEM, DARK} from './constants/theme-modes';
import useL10n from './utils/l10n';
import AppIntro from './AppIntro';
import {primaryColor} from './constants/colors';

const Tab = createBottomTabNavigator();
const SN = createStackNavigator();

const BottomTabNavigator = () => {
  const isDarkMode = useDarkMode();
  const bottomTabs = useSelector(state => state.bottomTabs);

  const translate = useL10n();

  const tabScreen = bottomTabs.map(tab => {
    const {name, title, activeIcon, inactiveIcon} = tab;
    const Comp = bottomTabs1[name].Comp;
    const IconComp = bottomTabs1[name].IconComp;
    const realTitle = translate(title);
    console.log(realTitle);
    const options = {
      title: realTitle,
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

  const translate = useL10n();

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
                translate(bottomTabs[route.state.index].title)) ||
              translate(bottomTabs[0].title),
          };
        }}
        component={BottomTabNavigator}
      />
      {samples.map(sample => {
        const parent = (
          <SN.Screen
            name={sample.routeName}
            options={{title: sample.title}}
            component={sample.component}
          />
        );
        return !sample.children
          ? parent
          : [parent].concat(
              sample.children.map(child => (
                <SN.Screen
                  name={child.routeName}
                  options={{title: child.title}}
                  component={child.component}
                />
              )),
            );
      })}
      {settings.map(setting => (
        <SN.Screen
          name={setting.routeName}
          options={{
            title: setting.title,
            headerShown: !setting.hiddenHeader,
          }}
          component={setting.component}
        />
      ))}
    </SN.Navigator>
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
      <NavigationContainer theme={theme}>
        <App />
      </NavigationContainer>
    </DarkModeProvider>
  );
};

export default AppContainer;

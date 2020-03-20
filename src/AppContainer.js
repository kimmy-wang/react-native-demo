import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import samples from './constants/samples';
import settings from './constants/settings';
import bottomTabs from './constants/bottom-tabs';

const Tab = createBottomTabNavigator();
const SN = createStackNavigator();

const BottomTabNavigator = () => {
  const tabScreen = bottomTabs.map(tab => {
    const {
      name,
      title,
      activeIcon,
      inactiveIcon,
      component,
      IconComponent,
    } = tab;
    const options = {
      title,
      tabBarIcon: ({focused, color, size}) => {
        const props = {
          name: focused ? activeIcon : inactiveIcon,
          size,
          color,
        };
        return <IconComponent {...props} />;
      },
    };
    return <Tab.Screen name={name} options={options} component={component} />;
  });

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      {tabScreen}
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <SN.Navigator>
      <SN.Screen
        name="BottomTabNavigator"
        options={({route, navigation}) => {
          return {
            title:
              (route && route.state && bottomTabs[route.state.index].title) ||
              bottomTabs[0].title,
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
          options={{title: setting.title}}
          component={setting.component}
        />
      ))}
    </SN.Navigator>
  );
};

const AppContainer = () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

export default AppContainer;

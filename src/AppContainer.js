import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import samples from './constants/samples';
import bottomTabs from './constants/bottom-tabs';

const Tab = createBottomTabNavigator();
const App = createStackNavigator();

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
      title: title,
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

const AppContainer = () => {
  return (
    <NavigationContainer>
      <App.Navigator>
        <App.Screen
          name="BottomTabNavigator"
          options={({route, navigation}) => {
            return {
              title:
                (route && route.state && bottomTabs[route.state.index].title) ||
                '',
            };
          }}
          component={BottomTabNavigator}
        />
        {samples.map(sample => (
          <App.Screen
            name={sample.routeName}
            options={{title: sample.title}}
            component={sample.component}
          />
        ))}
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;

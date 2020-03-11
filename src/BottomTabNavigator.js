import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Samples from './pages/Samples';
import Settings from './pages/Settings';
import Gallery from './pages/Samples/Gallery';

const Tab = createBottomTabNavigator();
const App = createStackNavigator();

const TABS = [
  {
    name: 'Samples',
    title: '示例',
    activeIcon: 'appstore1',
    inactiveIcon: 'appstore-o',
    component: Samples,
    IconComponent: AntDesign,
  },
  {
    name: 'Settings',
    title: '设置',
    activeIcon: 'settings',
    inactiveIcon: 'settings-outline',
    component: Settings,
    IconComponent: MaterialCommunityIcons,
  },
];

const BottomTabNavigator = () => {
  const tabScreen = TABS.map(tab => {
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
            console.log('route', route, route.state);
            return {
              title:
                (route && route.state && TABS[route.state.index].title) || '',
            };
          }}
          component={BottomTabNavigator}
        />
        <App.Screen name="Gallery" component={Gallery} />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;

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

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Samples"
        options={{
          title: '示例',
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'appstore1' : 'appstore-o';
            return <AntDesign name={iconName} size={size} color={color} />;
          },
        }}
        component={Samples}
      />
      <Tab.Screen
        name="Settings"
        options={{
          title: '设置',
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'settings' : 'settings-outline';
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
};

const AppContainer = () => {
  return (
    <NavigationContainer>
      <App.Navigator>
        <App.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
        <App.Screen name="Gallery" component={Gallery} />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;

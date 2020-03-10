import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SamplesWrapper from './pages/Samples';
import Settings from './pages/Settings';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen
          name="SamplesWrapper"
          options={{
            title: '示例',
            tabBarIcon: ({focused, color, size}) => {
              let iconName = focused ? 'appstore1' : 'appstore-o';
              return <AntDesign name={iconName} size={size} color={color} />;
            },
          }}
          component={SamplesWrapper}
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
    </NavigationContainer>
  );
};

export default BottomTabNavigator;

import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  useDarkMode,
  useDarkModeContext,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';

const Tab = createMaterialTopTabNavigator();

const TopTabPage = ({description}) => {
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Text style={styles.sectionTitle}>{description}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const TopTab = () => {
  const isDarkMode = useDarkMode();

  const TopTabs = () => {
    let topTabs = [];
    for (let i = 0, size = 7; i < size; i++) {
      topTabs.push(
        <Tab.Screen
          name={`TAB${i + 1}`}
          component={props => (
            <TopTabPage {...props} description={`TAB${i + 1}`} />
          )}
        />,
      );
    }
    return topTabs;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        labelStyle: {fontSize: 12, color: isDarkMode ? '#222' : 'white'},
        style: {backgroundColor: 'powderblue'},
        indicatorStyle: {backgroundColor: 'blue'},
      }}>
      {TopTabs()}
    </Tab.Navigator>
  );
};

const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue('white', 'black'),
  },
  scrollView: {
    backgroundColor: new DynamicValue('white', 'black'),
  },
  body: {
    backgroundColor: new DynamicValue('white', 'black'),
    paddingTop: 24,
  },
  sectionTitle: {
    paddingTop: 24,
    fontSize: 24,
    fontWeight: '600',
    color: new DynamicValue('black', 'white'),
    textAlign: 'center',
  },
});

export default TopTab;

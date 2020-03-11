import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const TopTabPage = ({description}) => {
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
        labelStyle: {fontSize: 12},
        style: {backgroundColor: 'powderblue'},
        indicatorStyle: {backgroundColor: 'blue'},
      }}>
      {TopTabs()}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#F3F3F3',
  },
  body: {
    backgroundColor: 'white',
    paddingTop: 24,
  },
  sectionTitle: {
    paddingTop: 24,
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
});

export default TopTab;

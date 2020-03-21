import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import {
  useDarkModeContext,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';

const Notification = () => {
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Text style={styles.sectionTitle}>Notification Demo</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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

export default Notification;

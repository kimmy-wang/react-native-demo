import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import {
  useDarkModeContext,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';

import {whiteColor, blackColor} from '../../constants/colors';

const AMap = () => {
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Text style={styles.sectionTitle}>AMap Demo</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue(whiteColor, blackColor),
  },
  scrollView: {
    backgroundColor: new DynamicValue(whiteColor, blackColor),
  },
  body: {
    backgroundColor: new DynamicValue(whiteColor, blackColor),
    paddingTop: 24,
  },
  sectionTitle: {
    paddingTop: 24,
    fontSize: 24,
    fontWeight: '600',
    color: new DynamicValue(blackColor, whiteColor),
    textAlign: 'center',
  },
});

export default AMap;

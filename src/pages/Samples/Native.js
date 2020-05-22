import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {
  useDynamicStyleSheet,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';

import RNDCustomTextView from '../../utils/native/RNDCustomTextView';
import {whiteColor, blackColor} from '../../constants/colors';

const Native = () => {
  const styles = useDynamicStyleSheet(dynamicStyleSheet);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <RNDCustomTextView text={'Some test text'} />
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

export default Native;

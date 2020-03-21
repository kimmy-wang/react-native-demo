import React from 'react';
import {SafeAreaView, ScrollView, Button, View} from 'react-native';

import {
  useDarkModeContext,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';

import ShareUtil from '../../utils/native/ShareUtil';

const Share = () => {
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];

  const onPressShare = () => {
    ShareUtil.shareboard(
      '这是一条分享测试',
      'https://cdn.upcwangying.com/logo/avatar.JPG?v=7.1.0',
      'https://github.com/upcwangying',
      '测试',
      [0, 1, 2, 3, 4, 5, 6, 9, 28, 32],
      () => {},
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Button title="Share" onPress={onPressShare} />
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
    color: new DynamicValue('white', 'black'),
    textAlign: 'center',
  },
});

export default Share;

import React, {useCallback} from 'react';
import {SafeAreaView, ScrollView, FlatList} from 'react-native';

import {
  useDynamicStyleSheet,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';

import {whiteColor, blackColor} from '../../constants/colors';
import AnalyticsUtil from '../../utils/native/AnalyticsUtil';
import ListItem from '../../components/ListItem';
import samples from '../../constants/samples';

const Samples = ({navigation}) => {
  const styles = useDynamicStyleSheet(dynamicStyleSheet);
  const onSelect = useCallback(
    routeName => {
      navigation && navigation.navigate(routeName);
      AnalyticsUtil.onEvent('SamplesItemClick');
    },
    [navigation],
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <FlatList
            data={samples}
            renderItem={({item}) => (
              <ListItem
                title={item.title}
                description={item.description}
                onPress={() => onSelect(item.routeName)}
              />
            )}
            keyExtractor={item => item.id}
          />
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
    backgroundColor: new DynamicValue('#F3F3F3', blackColor),
  },
});

export default Samples;

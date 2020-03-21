import React, {useCallback} from 'react';
import {SafeAreaView, ScrollView, FlatList, StatusBar} from 'react-native';

import {
  useDarkModeContext,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';

import SettingItem from '../../components/SettingItem';
import settings from '../../constants/settings';

const Settings = ({navigation}) => {
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];

  const onSelect = useCallback(
    routeName => {
      navigation && navigation.navigate(routeName);
    },
    [navigation],
  );

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <FlatList
            data={settings}
            renderItem={({item}) => (
              <SettingItem
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
    backgroundColor: new DynamicValue('white', 'black'),
  },
  scrollView: {
    backgroundColor: new DynamicValue('#F3F3F3', 'black'),
  },
});

export default Settings;

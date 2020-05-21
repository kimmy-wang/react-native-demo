import React, {useCallback} from 'react';
import {SafeAreaView, ScrollView, FlatList, StatusBar} from 'react-native';

import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import {useTranslation} from 'react-i18next';

import {whiteColor, blackColor} from '../../constants/colors';
import SettingItem from '../../components/SettingItem';
import settings from '../../constants/settings';

const Settings = ({navigation}) => {
  const styles = useDynamicStyleSheet(dynamicStyleSheet);

  const {t} = useTranslation();

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
                title={t(item.title)}
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

export default Settings;

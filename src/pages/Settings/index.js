import React, {useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';

import SettingItem from '../../components/SettingItem';
import settings from '../../constants/settings';

const Settings = ({navigation}) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#F3F3F3',
  },
});

export default Settings;

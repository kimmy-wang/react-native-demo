import React, {useEffect, useCallback} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, FlatList} from 'react-native';

import ListItem from '../../components/ListItem';
import samples from '../../constants/samples';

const Samples = ({navigation}) => {
  /* eslint-disable */
  const onSelect = useCallback(routeName => {
    navigation && navigation.navigate(routeName);
  });

  useEffect(() => {
    console.log('[Samples]: updated');

    return () => {
      console.log('[Samples]: destroyed');
    }
  });

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#F3F3F3',
  },
});

export default Samples;

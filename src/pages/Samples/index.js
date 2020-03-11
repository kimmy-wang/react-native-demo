import React, {useEffect, useCallback} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, FlatList} from 'react-native';

import ListItem from '../../components/ListItem';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Gallery Demo',
    description: 'Gallery Demo',
    routeName: 'Gallery',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Video Demo',
    description: 'Video Demo',
    routeName: 'Gallery',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Map Demo',
    description: 'Map Demo',
    routeName: 'Gallery',
  },
];

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
            data={DATA}
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

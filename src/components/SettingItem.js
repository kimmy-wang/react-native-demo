import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {
  useDarkModeContext,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SettingItem = ({title, description, onPress}) => {
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];
  return (
    <TouchableOpacity onPress={() => onPress && onPress()} style={styles.item}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionDescription}>{description}</Text>
        <AntDesign style={styles.right} name="right" />
      </View>
    </TouchableOpacity>
  );
};

const dynamicStyleSheet = new DynamicStyleSheet({
  item: {
    marginVertical: 6,
    marginHorizontal: 6,
  },
  sectionContainer: {
    height: 60,
    backgroundColor: new DynamicValue('white', '#222'),
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: new DynamicValue('black', 'white'),
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 14,
    color: new DynamicValue('gray', '#f0f0f0'),
  },
  right: {
    position: 'absolute',
    top: 20,
    right: 10,
    fontSize: 20,
    color: '#999',
  },
});

export default SettingItem;

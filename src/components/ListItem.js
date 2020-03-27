import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {
  useDarkModeContext,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {whiteColor, blackColor, borderColor} from '../constants/colors';

const ListItem = ({title, description, onPress}) => {
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
    backgroundColor: new DynamicValue(whiteColor, '#222'),
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: new DynamicValue(blackColor, whiteColor),
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
    color: borderColor,
  },
});

export default ListItem;

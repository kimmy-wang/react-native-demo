import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import {
  useDarkModeContext,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {whiteColor, blackColor, borderColor} from '../constants/colors';

const SettingItem = ({title, description, onPress}) => {
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];
  return (
    <TouchableOpacity onPress={() => onPress && onPress()} style={styles.item}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
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
    flexDirection: 'row',
    height: 48,
    backgroundColor: new DynamicValue(whiteColor, '#222'),
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    color: new DynamicValue(blackColor, whiteColor),
  },
  right: {
    fontSize: 20,
    color: borderColor,
  },
});

export default SettingItem;

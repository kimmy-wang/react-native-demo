import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {
  useDarkModeContext,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  whiteColor,
  blackColor,
  primaryColor,
  borderColor,
} from '../constants/colors';

const DraggableItem = ({item, index, drag, isActive}) => {
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];
  return (
    <TouchableOpacity onLongPress={drag} style={styles.item}>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      <AntDesign
        style={[
          styles.right,
          {
            color: isActive ? primaryColor : borderColor,
          },
        ]}
        name="menufold"
      />
    </TouchableOpacity>
  );
};

const dynamicStyleSheet = new DynamicStyleSheet({
  item: {
    height: 48,
    flexDirection: 'row',
    backgroundColor: new DynamicValue(whiteColor, '#222'),
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: 6,
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

export default DraggableItem;

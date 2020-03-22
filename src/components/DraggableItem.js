import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {
  useDarkModeContext,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
            color: isActive ? 'rgb(0, 122, 255)' : '#999',
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
    backgroundColor: new DynamicValue('white', '#222'),
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: 6,
  },
  sectionTitle: {
    fontSize: 16,
    color: new DynamicValue('black', 'white'),
  },
  right: {
    fontSize: 20,
    color: '#999',
  },
});

export default DraggableItem;

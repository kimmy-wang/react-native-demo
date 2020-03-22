import React, {useState} from 'react';
import {View, Text, SafeAreaView, Dimensions} from 'react-native';

import {
  DynamicStyleSheet,
  DynamicValue,
  useDarkModeContext,
} from 'react-native-dark-mode';
import {AutoDragSortableView} from 'react-native-drag-sort';

import settingConstants from '../../constants/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BottomTab2 = () => {
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];
  const [currentDragItemIndex, setCurrentDragItemIndex] = useState(-1);
  const [settings, setSettings] = useState(settingConstants);

  const onDataChange = data => {
    if (data.length !== settings.length) {
      setSettings(data);
    }
  };

  const onDragStart = index => {
    setCurrentDragItemIndex(index);
  };

  const onDragEnd = () => {
    setCurrentDragItemIndex(-1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AutoDragSortableView
        dataSource={settings}
        childrenWidth={childrenWidth}
        marginChildrenBottom={MARGIN}
        marginChildrenRight={MARGIN}
        marginChildrenLeft={MARGIN}
        marginChildrenTop={MARGIN}
        childrenHeight={childrenHeight}
        onDataChange={onDataChange}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        keyExtractor={(item, index) => item.id} // FlatList作用一样，优化
        renderItem={(item, index) => (
          <View style={styles.item}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <AntDesign
              style={[
                styles.right,
                {
                  color:
                    index === currentDragItemIndex
                      ? 'rgb(0, 122, 255)'
                      : '#999',
                },
              ]}
              name="menufold"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const {width} = Dimensions.get('window');
const MARGIN = 8;
const childrenWidth = width - MARGIN * 2;
const childrenHeight = 48;
const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    height: childrenHeight,
    width: childrenWidth,
    flexDirection: 'row',
    backgroundColor: new DynamicValue('white', '#222'),
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default BottomTab2;

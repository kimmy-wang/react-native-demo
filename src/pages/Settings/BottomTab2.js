import React, {useState} from 'react';
import {View, Text, SafeAreaView, Dimensions} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import {AutoDragSortableView} from 'react-native-drag-sort';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  whiteColor,
  blackColor,
  primaryColor,
  borderColor,
} from '../../constants/colors';
import {changeBottomTabs} from '../../store/action-creators';
import useL10n from '../../utils/l10n';

const BottomTab2 = () => {
  const dispatch = useDispatch();
  const styles = useDynamicStyleSheet(dynamicStyleSheet);
  const [currentDragItemIndex, setCurrentDragItemIndex] = useState(-1);
  const bottomTabs = useSelector(state => state.bottomTabs);

  const onDataChange = datas => {
    const currentIndexStr = datas.map(data => data.key).join(',');
    const preIndexStr = bottomTabs.map(data => data.key).join(',');
    if (currentIndexStr !== preIndexStr) {
      dispatch(changeBottomTabs(datas));
    }
  };

  const translate = useL10n();

  const onDragStart = index => {
    setCurrentDragItemIndex(index);
  };

  const onDragEnd = () => {
    setCurrentDragItemIndex(-1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AutoDragSortableView
        dataSource={bottomTabs}
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
            <Text style={styles.sectionTitle}>{translate(item.title)}</Text>
            <AntDesign
              style={[
                styles.right,
                {
                  color:
                    index === currentDragItemIndex ? primaryColor : borderColor,
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

export default BottomTab2;

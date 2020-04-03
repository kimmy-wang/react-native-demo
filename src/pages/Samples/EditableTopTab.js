import React, {useState, useRef} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {
  useDarkMode,
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import Modal from 'react-native-modal';
import ViewPager from '@react-native-community/viewpager';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DragSortableView} from 'react-native-drag-sort';

import {primaryColor} from '../../constants/colors';
import {changeEditableTopTabs} from '../../store/action-creators';

const {width, height} = Dimensions.get('window');

const ViewPagerItem = ({key, label}) => {
  const styles = useDynamicStyleSheet(dynamicStyleSheet);
  return (
    <ScrollView
      key={key}
      contentInsetAdjustmentBehavior="automatic"
      style={styles.viewPagerItemContainer}>
      <View style={styles.viewPagerItem}>
        <Text style={styles.viewPagerItemContent}>{label}</Text>
      </View>
    </ScrollView>
  );
};

const childrenWidth = width / 4;
const childrenHeight = width / 8;
const itemWidth = 72;
const itemHeight = 36;
const sortWidth = width;
const EditableTopTab = () => {
  const dispatch = useDispatch();
  const isDarkMode = useDarkMode();
  const styles = useDynamicStyleSheet(dynamicStyleSheet);
  const flatRef = useRef(null);
  const viewPagerRef = useRef(null);
  const scrollViewRef = useRef(null);
  const editableTopTabs = useSelector(state => state.editableTopTabs);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(null);
  const [visible, setVisible] = useState(false);

  const [isEditState, setEditState] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const onTabEdit = () => {
    setVisible(true);
  };

  const onTabClick = index => {
    setActivePageIndex(index);
    viewPagerRef && viewPagerRef.current.setPage(index);
  };

  const TabEdit = () => (
    <TouchableWithoutFeedback onPress={onTabEdit}>
      <View style={styles.tabEditContainer}>
        <AntDesign
          name="bars"
          style={[
            styles.tabEdit,
            {
              color: isDarkMode ? 'white' : 'black',
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabClick(index)}>
        <Text
          style={[
            styles.tabContent,
            {
              color:
                activePageIndex === index
                  ? primaryColor
                  : isDarkMode
                  ? 'white'
                  : 'black',
            },
          ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const onPageSelected = e => {
    const {
      nativeEvent: {position},
    } = e;
    setActivePageIndex(position);
    flatRef &&
      flatRef.current.scrollToIndex({
        index: position,
        viewOffset: width / 2 - TOP_TAB_WIDTH / 2,
      });
  };

  const handleOnScroll = event => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = p => {
    scrollViewRef && scrollViewRef.current.scrollTo(p);
  };

  const renderSelectedItemView = (item, index) => {
    const clearIcon =
      isEditState && !item.affix ? (
        <Image
          style={styles.selected_item_icon}
          source={require('../../assets/images/clear.png')}
        />
      ) : (
        undefined
      );
    return (
      <View style={styles.selected_container}>
        <View
          style={
            item.affix ? styles.selected_item_fixed : styles.selected_item
          }>
          <Text
            style={
              item.affix
                ? styles.selected_item_text_fixed
                : styles.selected_item_text
            }>
            {item.label}
          </Text>
        </View>
        {clearIcon}
      </View>
    );
  };

  const renderUnSelectedItemView = (item, index) => {
    return (
      <View style={styles.selected_container}>
        <View style={styles.unselected_item}>
          <Image
            style={styles.unselected_item_icon}
            source={require('../../assets/images/add.png')}
          />
          <Text style={styles.selected_item_text}>{item.label}</Text>
        </View>
      </View>
    );
  };

  const onSelectedDragEnd = () => setScrollEnabled(true);

  const onSelectedDragStart = () => {
    if (!isEditState) {
      setEditState(true);
    }
    setScrollEnabled(false);
  };

  const onSelectedClickItem = (data, item, index) => {
    // delete, data 是最新的数据
    if (isEditState) {
      let unselectedItems = editableTopTabs.filter(topTab => !topTab.selected);
      const selectedItems = [...data].filter(
        (wItem, windex) => windex !== index,
      );
      unselectedItems = [{...item, selected: false}, ...unselectedItems];
      const allItems = selectedItems.concat(unselectedItems);
      dispatch(changeEditableTopTabs(allItems));
    }
  };

  const onUnSelectedClickItem = (data, item, index) => {
    let selectedItems = editableTopTabs.filter(topTab => topTab.selected);
    selectedItems = [...selectedItems, {...item, selected: true}];
    const unselectedItems = [...data].filter(
      (wItem, windex) => windex !== index,
    );
    const allItems = selectedItems.concat(unselectedItems);
    dispatch(changeEditableTopTabs(allItems));
  };

  const onSelectedSortedItems = data => {
    let unselectedItems = editableTopTabs.filter(topTab => !topTab.selected);
    const allItems = data.concat(unselectedItems);
    dispatch(changeEditableTopTabs(allItems));
  };

  const onUnselectedSortedItems = data => {
    let selectedItems = editableTopTabs.filter(topTab => topTab.selected);
    const allItems = selectedItems.concat(data);
    dispatch(changeEditableTopTabs(allItems));
  };

  const onEditClick = () => {
    setEditState(!isEditState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <FlatList
          ref={flatRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={editableTopTabs.filter(topTab => topTab.selected)}
          renderItem={renderItem}
          ListFooterComponent={TabEdit}
        />
      </View>
      <ViewPager
        ref={viewPagerRef}
        style={styles.viewPager}
        initialPage={0}
        onPageSelected={onPageSelected}>
        {editableTopTabs
          .filter(topTab => topTab.selected)
          .map(({key, label}) => {
            return <ViewPagerItem key={key} label={label} />;
          })}
      </ViewPager>
      <Modal
        testID={'modal'}
        isVisible={visible}
        onSwipeComplete={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        swipeDirection={['down']}
        scrollTo={handleScrollTo}
        scrollOffset={scrollOffset}
        scrollOffsetMax={100} // content height - ScrollView height
        propagateSwipe={true}
        style={styles.modal}>
        <View style={styles.scrollableModal}>
          <ScrollView
            ref={scrollViewRef}
            onScroll={handleOnScroll}
            scrollEnabled={scrollEnabled}
            scrollEventThrottle={16}>
            <View style={styles.hurdle}>
              <Text style={styles.hurdle_title}>{'我的频道'}</Text>
              <TouchableOpacity
                style={styles.hurdle_edit}
                onPress={onEditClick}>
                <Text style={styles.hurdle_edit_text}>
                  {isEditState ? '完成' : '编辑'}
                </Text>
              </TouchableOpacity>
            </View>
            <DragSortableView
              dataSource={editableTopTabs.filter(topTab => topTab.selected)}
              parentWidth={sortWidth}
              childrenWidth={childrenWidth}
              childrenHeight={childrenHeight}
              marginChildrenTop={10}
              onDragStart={onSelectedDragStart}
              onDragEnd={onSelectedDragEnd}
              onDataChange={onSelectedSortedItems}
              onClickItem={onSelectedClickItem}
              keyExtractor={item => item.key} // FlatList作用一样，优化
              renderItem={renderSelectedItemView}
            />
            <View
              style={[
                styles.hurdle,
                {justifyContent: 'flex-start', marginTop: 40},
              ]}>
              <Text style={styles.hurdle_title}>{'推荐频道'}</Text>
            </View>
            <DragSortableView
              dataSource={editableTopTabs.filter(topTab => !topTab.selected)}
              parentWidth={sortWidth}
              sortable={true}
              childrenWidth={childrenWidth}
              childrenHeight={childrenHeight}
              marginChildrenTop={10}
              onDataChange={onUnselectedSortedItems}
              onClickItem={onUnSelectedClickItem}
              keyExtractor={item => item.key} // FlatList作用一样，优化
              renderItem={renderUnSelectedItemView}
            />
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const TOP_TAB_HEIGHT = 36;
const TOP_TAB_WIDTH = 90;
const MODAL_HEIGHT = height - getStatusBarHeight();

const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue('white', 'black'),
  },
  tabContainer: {
    height: TOP_TAB_HEIGHT,
    marginHorizontal: 6,
    backgroundColor: new DynamicValue('white', 'black'),
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue('#f0f0f0', '#222'),
  },
  tabItem: {
    width: TOP_TAB_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    fontSize: 16,
  },
  tabEditContainer: {
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabEdit: {
    fontSize: 24,
  },
  viewPager: {
    flex: 1,
  },
  viewPagerItemContainer: {
    flex: 1,
    backgroundColor: new DynamicValue('white', 'black'),
  },
  viewPagerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: new DynamicValue('white', 'black'),
  },
  viewPagerItemContent: {
    fontSize: 24,
    fontWeight: '600',
    color: new DynamicValue('black', 'white'),
    textAlign: 'center',
  },

  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: MODAL_HEIGHT,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    backgroundColor: new DynamicValue('white', 'black'),
  },
  hurdle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  hurdle_title: {
    color: new DynamicValue('#333', '#f0f0f0'),
    fontSize: 18,
    marginLeft: 15,
  },
  hurdle_edit: {
    height: 24,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ff6548',
    marginRight: 15,
    borderRadius: 12,
  },
  hurdle_edit_text: {
    color: '#ff6548',
    fontSize: 16,
  },
  selected_container: {
    width: childrenWidth,
    height: childrenHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected_item: {
    width: 72,
    height: 36,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected_item_fixed: {
    width: 72,
    height: 36,
    backgroundColor: '#949494',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected_item_text: {
    fontSize: 16,
    color: '#444',
  },
  selected_item_text_fixed: {
    fontSize: 16,
    color: '#f0f0f0',
  },
  selected_item_icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    position: 'absolute',
    top: (childrenHeight - itemHeight - 16) / 2 + 16 * 0.25, //下移点
    left: (childrenWidth + itemWidth - 16) / 2 - 16 * 0.25, //右移点，也可以换个布局
  },
  unselected_item: {
    width: 72,
    height: 36,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  unselected_item_icon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
});

export default EditableTopTab;

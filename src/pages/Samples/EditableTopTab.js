import React, {useState, useRef} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import {
  useDarkMode,
  useDarkModeContext,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';
import ViewPager from '@react-native-community/viewpager';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('window');

const TOP_TAB_LENGTH = 10;
const exampleData = [...Array(TOP_TAB_LENGTH)].map((d, index) => ({
  key: `item-${index}`, // For example only -- don't use index as your key!
  label: `TAB${index + 1}`,
}));

const ViewPagerItem = ({key, label}) => {
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];
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

const EditableTopTab = ({navigation}) => {
  const isDarkMode = useDarkMode();
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];
  const flatRef = useRef(null);
  const viewPagerRef = useRef(null);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const onTabEdit = () => {
    navigation && navigation.push('EditableTopTabPage');
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
                  ? 'rgb(0, 122, 255)'
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
        viewOffset: width / 2 - 50,
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <FlatList
          ref={flatRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={exampleData}
          renderItem={renderItem}
          ListFooterComponent={TabEdit}
        />
      </View>
      <ViewPager
        ref={viewPagerRef}
        style={styles.viewPager}
        initialPage={0}
        onPageSelected={onPageSelected}>
        {exampleData.map(({key, label}) => {
          return <ViewPagerItem key={key} label={label} />;
        })}
      </ViewPager>
    </SafeAreaView>
  );
};

const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue('white', 'black'),
  },
  tabContainer: {
    height: 36,
    backgroundColor: new DynamicValue('white', 'black'),
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue('#f0f0f0', '#222'),
  },
  tabItem: {
    width: 100,
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
});

export default EditableTopTab;

import React, {useState, useEffect, createRef} from 'react';
import {
  SafeAreaView,
  SectionList,
  FlatList,
  View,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';

import {getStatusBarHeight} from 'react-native-status-bar-height';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

const Contacts = () => {
  const sectionListRef = createRef();
  const [initial, setInitial] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [languages, setLanguages] = useState({});
  const [sections, setSections] = useState([]);
  const getSectionListItemLayout = sectionListGetItemLayout({
    // The height of the row with rowData at the given sectionIndex and rowIndex
    getItemHeight: (rowData, sectionIndex, rowIndex) => 60,

    // These four properties are optional
    getSeparatorHeight: () => 1, // The height of your separators
    getSectionHeaderHeight: () => 80, // The height of your section headers
    getSectionFooterHeight: () => 80, // The height of your section footers
    listHeaderHeight: 26, // The height of your list header
  });

  useEffect(() => {
    if (!initial) {
      console.log('[Languages] init...');
      fetch('https://api.upcwangying.com/languages.json')
        .then(response => response.json())
        .then(resJson => {
          // console.log('[Languages] fetch success: ', resJson);
          resJson && processLanguages(resJson);
        })
        .catch(err => console.error('[Languages] fetch error: ', err));
      setInitial(true);
    }
  }, [initial]);

  const processLanguages = resJson => {
    const processingLanguages = {},
      sectionList = [];

    // 对返回的数据进行处理
    resJson
      .filter(language => language.text)
      .forEach(language => {
        const key = language.text.charAt(0).toUpperCase();
        const preLanguages = processingLanguages[key];
        if (preLanguages) {
          processingLanguages[key] = preLanguages.concat([language]);
        } else {
          processingLanguages[key] = [language];
        }
      });

    // 将processingLanguages转换成SectionList对应的数据
    for (let key in processingLanguages) {
      sectionList.push({
        title: key,
        data: processingLanguages[key],
      });
    }
    setLanguages(processingLanguages);
    setSections(sectionList);
  };

  const selectTouchBarItem = index => {
    setCurrentIndex(index || 0);
    sectionListRef.current.scrollToLocation({
      sectionIndex: index || 0,
      itemIndex: 0,
    });
  };

  const onViewableItemsChanged = ({viewableItems, changed}) => {
    const title = changed[0].section.title;
    const isViewable = changed[0].isViewable;
    if (this.title !== title && isViewable) {
      this.title = title;
      const index = sections.findIndex(section => title === section.title);
      setCurrentIndex(index);
    }
  };

  const SectionListItem = ({language}) => {
    return (
      <View style={styles.sectionItem}>
        <Text style={styles.title}>{language.text}</Text>
      </View>
    );
  };

  const SectionHeader = ({title}) => {
    return (
      <View style={styles.sectionHeader}>
        <Text>{title}</Text>
      </View>
    );
  };

  const SectionListItemSeparator = () => {
    return <View style={styles.sectionItemSeparator} />;
  };

  const SectionListHeader = () => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderFooter}>这是通讯录头部</Text>
      </View>
    );
  };

  const SectionListFooter = () => {
    return (
      <View style={styles.listFooter}>
        <Text style={styles.listHeaderFooter}>这是通讯录头部</Text>
      </View>
    );
  };

  const TouchBarItem = ({title, index}) => {
    return (
      <TouchableWithoutFeedback onPress={() => selectTouchBarItem(index)}>
        <View
          hitSlop={{top: 4, bottom: 4, left: 4, right: 4}}
          style={styles.touchBarItem}>
          <Text style={[{color: index === currentIndex ? 'blue' : 'white'}]}>
            {title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const TouchBarItemSeparator = () => {
    return <View style={styles.touchBarItemSeparator} />;
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <SectionList
          ref={sectionListRef}
          sections={sections}
          stickySectionHeadersEnabled={true}
          renderItem={({item}) => <SectionListItem language={item} />}
          renderSectionHeader={({section: {title}}) => (
            <SectionHeader title={title} />
          )}
          ItemSeparatorComponent={SectionListItemSeparator}
          ListHeaderComponent={SectionListHeader}
          ListFooterComponent={SectionListFooter}
          ListEmptyComponent={<Text style={styles.tip}>数据加载中</Text>}
          getItemLayout={getSectionListItemLayout}
          onViewableItemsChanged={onViewableItemsChanged}
        />
        {languages ? (
          <View style={styles.touchBar}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={Object.keys(languages)}
              renderItem={({item, index}) => (
                <TouchBarItem index={index} title={item} />
              )}
              ItemSeparatorComponent={TouchBarItemSeparator}
            />
          </View>
        ) : null}
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
  tip: {
    fontSize: 24,
    marginTop: 26,
    alignSelf: 'center',
  },
  listHeader: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  listFooter: {
    height: 80,
    marginTop: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  listHeaderFooter: {
    fontSize: 24,
  },
  sectionHeader: {
    height: 26,
    paddingLeft: 10,
    fontSize: 18,
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
  },
  sectionItem: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  sectionItemSeparator: {
    height: 1,
    backgroundColor: '#F3F3F3',
  },
  title: {
    fontSize: 24,
  },
  touchBar: {
    position: 'absolute',
    right: 10,
    top: (Dimensions.get('window').height * 0.3) / 2 - STATUSBAR_HEIGHT - 20,
    alignItems: 'center',
    width: 20,
    height: Dimensions.get('window').height * 0.7,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'lightblue',
  },
  touchBarItem: {
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  touchBarItemSeparator: {
    height: 1,
    backgroundColor: '#F3F3F3',
  },
});

export default Contacts;

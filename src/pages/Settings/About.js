import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  useDarkMode,
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import Hyperlink from 'react-native-hyperlink';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import * as RNLocalize from 'react-native-localize';

import {
  whiteColor,
  blackColor,
  primaryColor,
  borderColor,
} from '../../constants/colors';
import {translate, setI18nConfig} from '../../utils/l10n';

const DATA = [
  'https://upcwangying.com',
  'https://github.com/upcwangying',
  'https://gitee.com/upcwangying',
  'Are We There Yet?',
  'The Language of the System',
  'Design, Composition, and Performance',
  'Clojure core.async',
  'The Functional Database',
  'Deconstructing the Database',
  'Hammock Driven Development',
  'Value of Values',
];

const About = ({route: {name, params}, navigation}) => {
  const isDarkMode = useDarkMode();
  const styles = useDynamicStyleSheet(dynamicStyleSheet);
  const goBack = () => {
    navigation && navigation.goBack();
  };

  const handleLocalizationChange = () => {
    setI18nConfig()
      .then(() => this.forceUpdate())
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    setI18nConfig() // set initial config
      .then(() => {
        RNLocalize.addEventListener('change', handleLocalizationChange);
      })
      .catch(error => {
        console.error(error);
      });
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);

  const Background = () => (
    <View key="background">
      <Image
        source={{
          uri: 'https://cdn.upcwangying.com/logo/avatar.JPG',
          width: window.width,
          height: PARALLAX_HEADER_HEIGHT,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          width: window.width,
          backgroundColor: 'rgba(0,0,0,.4)',
          height: PARALLAX_HEADER_HEIGHT,
        }}
      />
    </View>
  );

  const Foreground = () => (
    <View key="parallax-header" style={styles.parallaxHeader}>
      <Image
        style={styles.avatar}
        source={{
          uri: 'https://cdn.upcwangying.com/logo/avatar.JPG',
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
        }}
      />
      <Text style={styles.title}>Ying Wang</Text>
      <Text style={styles.description}>{translate('desc')}</Text>
    </View>
  );

  const StickyHeader = () => (
    <View key="sticky-header" style={styles.stickySection}>
      <Text style={styles.stickySectionText}>{name}</Text>
    </View>
  );

  const FixedHeader = () => (
    <View key="fixed-header" style={styles.fixedSection}>
      <TouchableWithoutFeedback onPress={goBack}>
        <AntDesign
          name="left"
          style={[styles.headerIcon, {color: primaryColor}]}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={goBack}>
        <AntDesign name="sharealt" style={styles.headerIcon} />
      </TouchableWithoutFeedback>
    </View>
  );

  return (
    <FlatList
      data={DATA}
      renderItem={({item}) => (
        <View key={item} style={styles.row}>
          <Hyperlink linkDefault={true} linkStyle={{color: primaryColor}}>
            <Text style={styles.rowText}>{item}</Text>
          </Hyperlink>
        </View>
      )}
      style={styles.container}
      renderScrollComponent={props => (
        <ParallaxScrollView
          contentBackgroundColor={isDarkMode ? blackColor : whiteColor}
          headerBackgroundColor="#333"
          stickyHeaderHeight={STICKY_HEADER_HEIGHT}
          parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
          backgroundSpeed={10}
          renderBackground={Background}
          renderForeground={Foreground}
          renderStickyHeader={StickyHeader}
          renderFixedHeader={FixedHeader}
        />
      )}
    />
  );
};

const window = Dimensions.get('window');
const STATUSBAR_HEIGHT = getStatusBarHeight();
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 44 + STATUSBAR_HEIGHT;

const dynamicStyleSheet = new DynamicStyleSheet({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'blue',
  },
  container: {
    flex: 1,
    backgroundColor: new DynamicValue(blackColor, whiteColor),
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: window.width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: new DynamicValue(whiteColor, blackColor),
  },
  stickySectionText: {
    color: new DynamicValue(blackColor, whiteColor),
    fontSize: 20,
    margin: 10,
  },
  fixedSection: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: STICKY_HEADER_HEIGHT,
    width: window.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: STATUSBAR_HEIGHT,
  },
  headerIcon: {
    color: borderColor,
    fontSize: 26,
    marginHorizontal: 8,
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100,
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2,
  },
  title: {
    color: new DynamicValue(whiteColor, blackColor),
    fontSize: 24,
    paddingVertical: 5,
  },
  description: {
    color: new DynamicValue(whiteColor, blackColor),
    fontSize: 18,
    paddingVertical: 5,
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: new DynamicValue(whiteColor, blackColor),
    borderColor: borderColor,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  rowText: {
    fontSize: 20,
    color: new DynamicValue(blackColor, whiteColor),
  },
});

export default About;

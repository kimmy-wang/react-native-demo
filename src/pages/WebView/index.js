import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Platform,
  StatusBar,
  BackHandler,
  Dimensions,
} from 'react-native';

import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import {WebView} from 'react-native-webview';
import LottieView from 'lottie-react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {whiteColor, blackColor} from '../../constants/colors';

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

const CWebView = () => {
  const styles = useDynamicStyleSheet(dynamicStyleSheet);
  const webViewRef = useRef(null);
  const [initial, setInitial] = useState(false);
  const [canGoBack, setGoBack] = useState(false);

  const onAndroidBackPress = useCallback(() => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  }, [canGoBack, webViewRef]);

  useEffect(() => {
    if (!initial) {
      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      }
      setInitial(true);
    }

    return () => {
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress');
      }
    };
  }, [onAndroidBackPress, initial]);

  const onNavigationStateChange = navState => {
    console.log('[CWebView] -> [onNavigationStateChange]: ', navState);
    setGoBack(navState.canGoBack);
  };

  const renderLoading = () => {
    return (
      <View style={styles.webViewLoadingContainer}>
        <LottieView
          source={require('../../assets/animations/loading.json')}
          style={styles.loading}
          autoPlay
          loop
        />
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <WebView
          style={styles.webview}
          ref={webViewRef}
          originWhitelist={['*']}
          source={{uri: 'https://reactnative.cn'}}
          startInLoadingState={true}
          onNavigationStateChange={onNavigationStateChange}
          renderLoading={renderLoading}
        />
      </SafeAreaView>
    </>
  );
};

const LOADING_SIZE = 80;
const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue(whiteColor, blackColor),
  },
  webview: {
    backgroundColor: new DynamicValue(whiteColor, blackColor),
  },
  webViewLoadingContainer: {
    position: 'absolute',
    top:
      Dimensions.get('window').height * 0.5 -
      STATUSBAR_HEIGHT -
      LOADING_SIZE / 2 -
      20,
    left: Dimensions.get('window').width * 0.5 - LOADING_SIZE / 2,
    width: LOADING_SIZE,
    height: LOADING_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: LOADING_SIZE,
    height: LOADING_SIZE,
  },
});

export default CWebView;

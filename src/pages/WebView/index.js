import React, {useState, useEffect, useCallback, useRef} from 'react';
import {SafeAreaView, StyleSheet, Platform, BackHandler} from 'react-native';

import {WebView} from 'react-native-webview';

const CWebView = () => {
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

  return (
    <>
      <SafeAreaView style={styles.container}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{uri: 'https://reactnative.cn'}}
          useWebKit={true}
          onNavigationStateChange={onNavigationStateChange}
        />
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
});

export default CWebView;

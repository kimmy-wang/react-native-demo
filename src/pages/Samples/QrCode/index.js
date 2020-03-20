import React, {useEffect, useCallback, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Animated,
  Easing,
} from 'react-native';

import {RNCamera} from 'react-native-camera';

const QrCode = ({navigation}) => {
  const cameraRef = useRef(null);
  const [initial, setInitial] = useState(false);
  const [content, setContent] = useState('');
  const [reconnect, setReconnect] = useState(false);
  const [ws, setWs] = useState(null);
  const [moveAnim, setMoveAnim] = useState(new Animated.Value(0));

  const startAnimation = useCallback(() => {
    setMoveAnim(0);
    Animated.timing(moveAnim, {
      toValue: -200,
      duration: 1500,
      easing: Easing.linear,
    }).start(() => startAnimation());
  }, [setMoveAnim, moveAnim]);

  const onSend = useCallback(data => ws && ws.send(data), [ws]);

  const _handleWebSocketSetup = useCallback(() => {
    const wss = new WebSocket('ws://192.168.200.10:8080/');
    wss.onopen = () => {
      console.log('[WebSocket Opened].');
    };
    wss.onmessage = event => {
      console.log('[WebSocket Message]: ', event);
    };
    wss.onerror = error => {
      console.error('[WebSocket Error]: ', error);
    };
    wss.onclose = () => {};
    setWs(wss);
  }, [setWs]);

  useEffect(() => {
    if (!initial) {
      startAnimation();
      setInitial(true);
      setReconnect(!!reconnect);
      _handleWebSocketSetup();
    }

    return () => {
      setReconnect(false);
      ws && ws.close();
    };
  }, [startAnimation, _handleWebSocketSetup, initial, reconnect, ws]);

  const onBarCodeRead = result => {
    const {data} = result;
    setContent(data);
    onSend(data);
    navigation &&
      navigation.push('QrCodeResult', {
        content,
      });
  };

  const onPress = () => {
    navigation &&
      navigation.push('QrCodeResult', {
        content,
      });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.cameraWrapper}>
          <RNCamera
            ref={cameraRef}
            style={styles.camera}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            onBarCodeRead={onBarCodeRead}>
            <View style={styles.rectangleContainer}>
              <View style={styles.rectangle} />
              <Animated.View
                style={[styles.border, {transform: [{translateY: moveAnim}]}]}
              />
              <Text style={styles.rectangleText}>
                将二维码放入框内，即可自动扫描
              </Text>
              <Button title="测试" onPress={onPress} />
            </View>
          </RNCamera>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraWrapper: {
    backgroundColor: '#F3F3F3',
  },
  camera: {
    height: '100%',
    // justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rectangleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: 200,
    width: 200,
    marginTop: '35%',
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: 'transparent',
  },
  rectangleText: {
    flex: 0,
    color: 'white',
    marginTop: 10,
  },
  border: {
    flex: 0,
    width: 200,
    height: 2,
    backgroundColor: 'red',
  },
});

export default QrCode;

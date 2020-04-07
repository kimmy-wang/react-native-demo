import React, {useEffect, useCallback, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Vibration,
  Animated,
  Easing,
  Platform,
  Dimensions,
} from 'react-native';

import {useSelector} from 'react-redux';
import {RNCamera} from 'react-native-camera';

import {whiteColor} from '../../../constants/colors';

const QrCode = ({navigation}) => {
  const websocketUrl = useSelector(state => state.websocketUrl);
  const [initial, setInitial] = useState(false);
  const [content, setContent] = useState('');
  const [ws, setWs] = useState(null);
  const [show, setShow] = useState(true);
  const [moveAnim] = useState(new Animated.Value(0));

  const startAnimation = useCallback(() => {
    if (show) {
      moveAnim.setValue(0);
      Animated.timing(moveAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
      }).start(startAnimation);
    }
  }, [moveAnim, show]);

  const resetShow = useCallback(() => {
    console.log('resetShow');
    setShow(true);
  }, []);

  const onSend = useCallback(data => ws && ws.send(data), [ws]);

  const _handleWebSocketSetup = useCallback(() => {
    const wss = new WebSocket(websocketUrl);
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
  }, [setWs, websocketUrl]);

  useEffect(() => {
    if (!initial) {
      startAnimation();
      setInitial(true);
      websocketUrl && _handleWebSocketSetup();
    }

    return () => {
      console.log('[ QrCode ] destroy.');
      setShow(false);
      ws && ws.close();
    };
  }, [websocketUrl]);

  const onBarCodeRead = result => {
    console.log('show', show, result);
    if (show) {
      setShow(false);
      if (result) {
        const {data} = result;
        Vibration.vibrate([0, 500], false);
        setContent(data);
        onSend(data);
        navigation &&
          navigation.push('QrCodeResult', {
            content: data,
            resetShow,
          });
      } else {
        Alert.alert(
          '提示',
          '扫描失败，请将手机对准二维码重新尝试',
          [
            {
              text: '确定',
              onPress: () => {
                setShow(true);
              },
            },
          ],
          {cancelable: false},
        );
      }
    }
  };

  const onPress = () => {
    navigation &&
      navigation.push('QrCodeResult', {
        content,
        resetShow,
      });
  };

  const scanView =
    Platform.OS === 'ios' ? (
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        flashMode={RNCamera.Constants.FlashMode.auto}
        onBarCodeRead={onBarCodeRead}>
        <View
          style={{
            height: (height - 264) / 3,
            width: width,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={styles.itemStyle} />
          <View style={styles.rectangle}>
            <Image
              style={[
                styles.rectangle,
                {position: 'absolute', left: 0, top: 0},
              ]}
              source={require('../../../assets/images/icon_scan_rect.png')}
            />
            <Animated.View
              style={[
                styles.animatedStyle,
                {
                  transform: [
                    {
                      translateY: moveAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 200],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
          <View style={styles.itemStyle} />
        </View>
        <View style={styles.textContainerStyle}>
          <Text style={styles.textStyle}>将二维码放入框内，即可自动扫描</Text>
        </View>
      </RNCamera>
    ) : (
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        googleVisionBarcodeType={
          RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE
        }
        flashMode={RNCamera.Constants.FlashMode.auto}
        onBarCodeRead={onBarCodeRead}>
        <View
          style={{
            height: (height - 244) / 3,
            width: width,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={styles.itemStyle} />
          <View style={styles.rectangle}>
            <Image
              style={[
                styles.rectangle,
                {position: 'absolute', left: 0, top: 0},
              ]}
              source={require('../../../assets/images/icon_scan_rect.png')}
            />
            <Animated.View
              style={[
                styles.animatedStyle,
                {
                  transform: [
                    {
                      translateY: moveAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 200],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
          <View style={styles.itemStyle} />
        </View>
        <View style={styles.textContainerStyle}>
          <Text style={styles.textStyle}>将二维码放入框内，即可自动扫描</Text>
        </View>
      </RNCamera>
    );

  return (
    <>
      <SafeAreaView style={styles.container}>{scanView}</SafeAreaView>
    </>
  );
};

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
  itemStyle: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: (width - 200) / 2,
    height: 200,
  },
  textContainerStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: width,
    alignItems: 'center',
  },
  textStyle: {
    color: whiteColor,
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  animatedStyle: {
    height: 2,
    backgroundColor: '#00c050',
  },
  rectangle: {
    height: 200,
    width: 200,
  },
});

export default QrCode;

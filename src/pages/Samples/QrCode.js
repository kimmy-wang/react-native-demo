import React, {useEffect, useCallback, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native';

import {RNCamera} from 'react-native-camera';

const QrCode = () => {
  const cameraRef = useRef(null);
  const [initial, setInitial] = useState(false);
  const [content, setContent] = useState('');
  const [moveAnim, setMoveAnim] = useState(new Animated.Value(0));

  const startAnimation = useCallback(() => {
    setMoveAnim(0);
    Animated.timing(moveAnim, {
      toValue: -200,
      duration: 1500,
      easing: Easing.linear,
    }).start(() => startAnimation());
  }, [setMoveAnim, moveAnim]);

  useEffect(() => {
    if (!initial) {
      startAnimation();
      setInitial(true);
    }
  }, [startAnimation, initial]);

  const onBarCodeRead = result => {
    const {data} = result;
    setContent(data);
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
              <Text style={styles.rectangleText}>扫码内容: {content}</Text>
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

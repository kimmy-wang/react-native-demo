import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const QrCodeResult = ({route}) => {
  const {content} = route.params;
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.cameraWrapper}>
          <Text>扫码内容: {content}</Text>
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

export default QrCodeResult;

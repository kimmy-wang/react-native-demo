import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {whiteColor} from '../../../constants/colors';

const QrCodeResult = ({route, navigation}) => {
  const {content, resetShow} = route.params;

  const onLoginConfirm = () => {};

  const onGoBack = () => {
    resetShow && resetShow();
    navigation && navigation.goBack();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>扫码内容</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={[styles.btn, styles.confirm]}
            onPress={onLoginConfirm}>
            <Text style={styles.text}>确认登陆</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.cancel]}
            onPress={onGoBack}>
            <Text style={styles.text}>取消</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'space-between',
  },
  contentWrapper: {
    paddingTop: '15%',
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
  },
  content: {
    marginTop: 40,
  },
  btnWrapper: {
    height: 100,
    marginBottom: '30%',
    alignItems: 'center',
  },
  btn: {
    height: 36,
    width: '90%',
    marginBottom: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirm: {
    backgroundColor: 'blue',
  },
  cancel: {
    backgroundColor: 'gray',
  },
  text: {
    color: whiteColor,
  },
});

export default QrCodeResult;

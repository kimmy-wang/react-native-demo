import React, {useState} from 'react';
import {View, TextInput, SafeAreaView, Button, Alert} from 'react-native';

import {
  DynamicStyleSheet,
  DynamicValue,
  useDarkMode,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-root-toast';

import {changeWebViewUrl} from '../../store/action-creators';
import {blackColor, whiteColor} from '../../constants/colors';

const WebViewUrl = ({navigation}) => {
  const darkMode = useDarkMode();
  const styles = useDynamicStyleSheet(dynamicStyleSheet);
  const dispatch = useDispatch();
  const webViewUrl = useSelector(state => state.webViewUrl);
  const [value, onChangeText] = useState(webViewUrl);

  const onSave = () => {
    console.log(value);
    if (!value) {
      Alert.alert('错误', '请输入URL地址');
      return;
    }
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      Alert.alert('错误', 'URL地址必须以http://或者https://开头');
      return;
    }
    value && dispatch(changeWebViewUrl(value));
    Toast.show('保存成功', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onHidden: () => {
        navigation && navigation.canGoBack() && navigation.goBack();
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          value={value}
          dataDetectorTypes="link"
          placeholder="请输入URL地址"
          placeholderTextColor={darkMode ? '#f7f7f7' : '#999'}
          multiline
          onChangeText={text => onChangeText(text)}
        />
        <Button title="保存" onPress={onSave} />
      </View>
    </SafeAreaView>
  );
};

const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue(whiteColor, blackColor),
  },
  input: {
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    color: new DynamicValue(blackColor, whiteColor),
  },
});

export default WebViewUrl;

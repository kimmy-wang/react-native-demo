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

import {changeWebsocketUrl} from '../../store/action-creators';
import {blackColor, whiteColor} from '../../constants/colors';

const WebsocketUrl = ({navigation}) => {
  const darkMode = useDarkMode();
  const styles = useDynamicStyleSheet(dynamicStyleSheet);
  const dispatch = useDispatch();
  const websocketUrl = useSelector(state => state.websocketUrl);
  const [value, onChangeText] = useState(websocketUrl);

  const onSave = () => {
    if (!value) {
      Alert.alert('错误', '请输入websocket地址');
      return;
    }
    if (!value.startsWith('ws://') && !value.startsWith('wss://')) {
      Alert.alert('错误', 'websocket地址必须以ws://或者wss://开头');
      return;
    }
    value && dispatch(changeWebsocketUrl(value));
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
          placeholder="请输入websocket地址"
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

export default WebsocketUrl;

import React, {useEffect, useState} from 'react';
import {View, Text, Button, Platform} from 'react-native';

import NfcManager, {NfcTech} from 'react-native-nfc-manager';

import {
  useDynamicStyleSheet,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';

import {whiteColor, blackColor} from '../../constants/colors';

const Nfc = () => {
  const styles = useDynamicStyleSheet(dynamicStyleSheet);
  const [tag, setTag] = useState({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      NfcManager.start();
      setInitialized(true);
    }
    return () => {
      _cancel();
    };
  }, []);

  const _cancel = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  };

  const _test = async () => {
    try {
      let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: 'Ready to do some custom Mifare cmd!',
      });
      console.info('resp: ', resp);

      // the NFC uid can be found in tag.id
      const tagInfo = await NfcManager.getTag();
      console.info('tag: ', tagInfo);
      setTag(tagInfo);
      _cancel();
    } catch (ex) {
      console.error('ex', ex);
      _cancel();
    }
  };

  const _clear = () => {
    setTag({});
  };

  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <Button title="Test" onPress={_test} />
      </View>
      <View style={styles.btn}>
        <Button title="Clear Tag" onPress={_clear} />
      </View>
      <View>
        <Text style={styles.text}>{tag && JSON.stringify(tag)}</Text>
      </View>
    </View>
  );
};

const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue(whiteColor, blackColor),
  },
  btn: {
    margin: 20,
  },
  text: {
    margin: 20,
    color: new DynamicValue(blackColor, whiteColor),
  },
});

export default Nfc;

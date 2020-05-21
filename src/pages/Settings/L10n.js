import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

import {useTranslation} from 'react-i18next';

const L10n = () => {
  const {i18n} = useTranslation();

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh')
        }>
        <Text>{i18n.language === 'zh' ? 'English' : '简体中文'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default L10n;

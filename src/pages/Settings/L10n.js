import React from 'react';
import {View, FlatList} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import locales, {SYSTEM} from '../../constants/locales';
import SettingItem from '../../components/SettingItem';
import {changeLocale} from '../../store/action-creators';

const L10n = () => {
  const {i18n} = useTranslation();
  const dispatch = useDispatch();
  let locale = useSelector(state => state.locale);

  return (
    <View>
      <FlatList
        data={locales}
        renderItem={({item}) => (
          <SettingItem
            title={item.title}
            iconName={locale === item.value ? 'star' : 'staro'}
            onPress={() => {
              let nextLocale = item.value;
              if (nextLocale === SYSTEM) {
                // console.warn('SYSTEM', DeviceInfo.getDeviceLocale());
                // todo
                nextLocale = i18n.language;
              }
              i18n.changeLanguage(nextLocale);
              dispatch(changeLocale(item.value));
            }}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default L10n;

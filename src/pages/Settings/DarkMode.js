import React from 'react';
import {FlatList, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import themeModes from '../../constants/theme-modes';
import SettingItem from '../../components/SettingItem';
import {changeDarkMode} from '../../store/action-creators';

const DarkMode = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.darkMode);

  return (
    <View>
      <FlatList
        data={themeModes}
        renderItem={({item}) => (
          <SettingItem
            title={item.title}
            onPress={() => dispatch(changeDarkMode(item.value))}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default DarkMode;

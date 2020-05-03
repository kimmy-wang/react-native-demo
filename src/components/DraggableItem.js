import React, {useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {
  useDynamicStyleSheet,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';
import * as RNLocalize from 'react-native-localize';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  whiteColor,
  blackColor,
  primaryColor,
  borderColor,
} from '../constants/colors';
import {translate, setI18nConfig} from '../utils/l10n';

const DraggableItem = ({item, index, drag, isActive}) => {
  const styles = useDynamicStyleSheet(dynamicStyleSheet);

  const handleLocalizationChange = () => {
    setI18nConfig()
      .then(() => this.forceUpdate())
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    setI18nConfig() // set initial config
      .then(() => {
        RNLocalize.addEventListener('change', handleLocalizationChange);
      })
      .catch(error => {
        console.error(error);
      });
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);

  return (
    <TouchableOpacity onLongPress={drag} style={styles.item}>
      <Text style={styles.sectionTitle}>{translate(item.title)}</Text>
      <AntDesign
        style={[
          styles.right,
          {
            color: isActive ? primaryColor : borderColor,
          },
        ]}
        name="menufold"
      />
    </TouchableOpacity>
  );
};

const dynamicStyleSheet = new DynamicStyleSheet({
  item: {
    height: 48,
    flexDirection: 'row',
    backgroundColor: new DynamicValue(whiteColor, '#222'),
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: 6,
  },
  sectionTitle: {
    fontSize: 16,
    color: new DynamicValue(blackColor, whiteColor),
  },
  right: {
    fontSize: 20,
    color: borderColor,
  },
});

export default DraggableItem;

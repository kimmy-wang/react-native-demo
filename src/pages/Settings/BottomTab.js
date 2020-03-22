import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

import {DynamicStyleSheet, useDarkModeContext} from 'react-native-dark-mode';
import DraggableFlatList from 'react-native-draggable-flatlist';

import settingConstants from '../../constants/bottom-tabs';
import DraggableItem from '../../components/DraggableItem';

const BottomTab = () => {
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];
  const [settings, setSettings] = useState(settingConstants);

  const onDragEnd = ({data}) => {
    setSettings(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DraggableFlatList
        data={settings}
        renderItem={props => <DraggableItem {...props} />}
        keyExtractor={(item, index) => `draggable-${item.key}`}
        onDragEnd={onDragEnd}
      />
    </SafeAreaView>
  );
};

const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
  },
});

export default BottomTab;

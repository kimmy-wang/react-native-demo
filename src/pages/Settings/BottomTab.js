import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

import {useSelector} from 'react-redux';
import {DynamicStyleSheet, useDarkModeContext} from 'react-native-dark-mode';

import DraggableFlatList from 'react-native-draggable-flatlist';
import DraggableItem from '../../components/DraggableItem';

const BottomTab = () => {
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];
  const bottomTabs = useSelector(state => state.bottomTabs);
  const [settings, setSettings] = useState(bottomTabs);

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

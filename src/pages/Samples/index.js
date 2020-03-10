import React, {useState, useCallback} from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Samples from './Samples'
import Gallery from './Gallery'

const SamplesStack = createStackNavigator();

const SamplesWrapper = () => {

  return (
    <SamplesStack.Navigator>
      <SamplesStack.Screen name="Samples" component={Samples} />
      <SamplesStack.Screen name="Gallery" component={Gallery} />
    </SamplesStack.Navigator>
  );
};

export default SamplesWrapper;

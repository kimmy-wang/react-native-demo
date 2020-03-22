/**
 * @format
 */
console.disableYellowBox = true;
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import AppContainer from './src/AppContainer';
import {name as appName} from './app.json';

import store from './src/store';

const StoreWrapper = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

AppRegistry.registerComponent(appName, () => StoreWrapper);

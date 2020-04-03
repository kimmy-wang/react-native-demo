/**
 * @format
 */
console.disableYellowBox = true;
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppContainer from './src/AppContainer';
import {name as appName} from './app.json';

import {store, persistor} from './src/store';

const StoreWrapper = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => StoreWrapper);

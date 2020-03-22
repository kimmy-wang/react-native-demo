import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {BOTTOM_TAB_CHANGED} from './action-types';
import Samples from '../pages/Samples';
import WebView from '../pages/WebView';
import Settings from '../pages/Settings';

const defaultState = {
  bottomTabs: [
    {
      key: 0,
      name: 'Samples',
      title: '示例',
      activeIcon: 'appstore1',
      inactiveIcon: 'appstore-o',
      component: Samples,
      IconComponent: AntDesign,
    },
    {
      key: 1,
      name: 'WebView',
      title: '网页',
      activeIcon: 'network',
      inactiveIcon: 'network-outline',
      component: WebView,
      IconComponent: MaterialCommunityIcons,
    },
    {
      key: 2,
      name: 'Settings',
      title: '设置',
      activeIcon: 'settings',
      inactiveIcon: 'settings-outline',
      component: Settings,
      IconComponent: MaterialCommunityIcons,
    },
  ],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case BOTTOM_TAB_CHANGED:
      return {
        ...state,
        bottomTabs: action.bottomTabs,
      };
    default:
      return state;
  }
};
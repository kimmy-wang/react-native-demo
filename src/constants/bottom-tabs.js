import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Samples from '../pages/Samples';
import WebView from '../pages/WebView';
import Settings from '../pages/Settings';

export default [
  {
    name: 'Samples',
    title: '示例',
    activeIcon: 'appstore1',
    inactiveIcon: 'appstore-o',
    component: Samples,
    IconComponent: AntDesign,
  },
  {
    name: 'WebView',
    title: '网页',
    activeIcon: 'network',
    inactiveIcon: 'network-outline',
    component: WebView,
    IconComponent: MaterialCommunityIcons,
  },
  {
    name: 'Settings',
    title: '设置',
    activeIcon: 'settings',
    inactiveIcon: 'settings-outline',
    component: Settings,
    IconComponent: MaterialCommunityIcons,
  },
];

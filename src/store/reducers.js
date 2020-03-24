import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {BOTTOM_TAB_CHANGED, EDITABLE_TOP_TAB_CHANGED} from './action-types';
import Samples from '../pages/Samples';
import WebView from '../pages/WebView';
import Settings from '../pages/Settings';
import ProductCategory from '../pages/ProductCategory';

const TOP_TAB_LENGTH = 20;
const exampleData = [...Array(TOP_TAB_LENGTH)].map((d, index) => ({
  key: `item-${index}`, // For example only -- don't use index as your key!
  label: `TAB ${index + 1}`,
  selected: index < 10,
  affix: index <= 3,
}));

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
      key: 10,
      name: 'ProductCategory',
      title: '分类',
      activeIcon: 'search1',
      inactiveIcon: 'search1',
      component: ProductCategory,
      IconComponent: AntDesign,
    },
    {
      key: 20,
      name: 'WebView',
      title: '网页',
      activeIcon: 'network',
      inactiveIcon: 'network-outline',
      component: WebView,
      IconComponent: MaterialCommunityIcons,
    },
    {
      key: 30,
      name: 'Settings',
      title: '设置',
      activeIcon: 'settings',
      inactiveIcon: 'settings-outline',
      component: Settings,
      IconComponent: MaterialCommunityIcons,
    },
  ],
  editableTopTabs: exampleData,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case BOTTOM_TAB_CHANGED:
      return {
        ...state,
        bottomTabs: action.bottomTabs,
      };
    case EDITABLE_TOP_TAB_CHANGED:
      return {
        ...state,
        editableTopTabs: action.editableTopTabs,
      };
    default:
      return state;
  }
};

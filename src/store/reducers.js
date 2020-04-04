import {SYSTEM} from '../constants/theme-modes';
import {
  BOTTOM_TAB_CHANGED,
  EDITABLE_TOP_TAB_CHANGED,
  DARK_MODE_CHANGED,
  WEBVIEW_URL_CHANGED,
  WEBSOCKET_URL_CHANGED,
} from './action-types';

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
    },
    {
      key: 10,
      name: 'ProductCategory',
      title: '分类',
      activeIcon: 'search1',
      inactiveIcon: 'search1',
    },
    {
      key: 20,
      name: 'WebView',
      title: '网页',
      activeIcon: 'network',
      inactiveIcon: 'network-outline',
    },
    {
      key: 30,
      name: 'Settings',
      title: '设置',
      activeIcon: 'settings',
      inactiveIcon: 'settings-outline',
    },
  ],
  editableTopTabs: exampleData,
  darkMode: SYSTEM,
  webViewUrl: 'https://apps.upcwangying.com/rn/demo',
  websocketUrl: '',
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
    case DARK_MODE_CHANGED:
      return {
        ...state,
        darkMode: action.darkMode,
      };
    case WEBVIEW_URL_CHANGED:
      return {
        ...state,
        webViewUrl: action.webViewUrl,
      };
    case WEBSOCKET_URL_CHANGED:
      return {
        ...state,
        websocketUrl: action.websocketUrl,
      };
    default:
      return state;
  }
};

import CodePush from '../pages/Settings/CodePush';
import BottomTab from '../pages/Settings/BottomTab';
import BottomTab2 from '../pages/Settings/BottomTab2';
import DarkMode from '../pages/Settings/DarkMode';
import L10n from '../pages/Settings/L10n';
import WebViewUrl from '../pages/Settings/WebViewUrl';
import WebsocketUrl from '../pages/Settings/WebsocketUrl';
import About from '../pages/Settings/About';

export default [
  {
    id: 10,
    title: 'CodePush示例',
    routeName: 'CodePush',
    component: CodePush,
  },
  {
    id: 20,
    title: '底部Tab栏',
    routeName: 'BottomTabSetting',
    component: BottomTab,
  },
  {
    id: 30,
    title: '底部Tab栏2',
    routeName: 'BottomTabSetting2',
    component: BottomTab2,
  },
  {
    id: 40,
    title: '黑暗模式',
    routeName: 'DarkMode',
    component: DarkMode,
  },
  {
    id: 45,
    title: '语言环境',
    routeName: 'L10n',
    component: L10n,
  },
  {
    id: 50,
    title: 'WebView地址',
    routeName: 'WebViewUrl',
    component: WebViewUrl,
  },
  {
    id: 60,
    title: 'Websocket地址',
    routeName: 'WebsocketUrl',
    component: WebsocketUrl,
  },
  {
    id: 70,
    title: '关于',
    routeName: 'About',
    component: About,
    hiddenHeader: true,
  },
];

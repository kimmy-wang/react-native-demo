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
    title: 'settings.codePush',
    routeName: 'CodePush',
    component: CodePush,
  },
  {
    id: 20,
    title: 'settings.bottomTab',
    routeName: 'BottomTabSetting',
    component: BottomTab,
  },
  {
    id: 30,
    title: 'settings.bottomTab2',
    routeName: 'BottomTabSetting2',
    component: BottomTab2,
  },
  {
    id: 40,
    title: 'settings.darkMode',
    routeName: 'DarkMode',
    component: DarkMode,
  },
  {
    id: 45,
    title: 'settings.languages',
    routeName: 'L10n',
    component: L10n,
  },
  {
    id: 50,
    title: 'settings.webView',
    routeName: 'WebViewUrl',
    component: WebViewUrl,
  },
  {
    id: 60,
    title: 'settings.webSocket',
    routeName: 'WebsocketUrl',
    component: WebsocketUrl,
  },
  {
    id: 70,
    title: 'settings.about',
    routeName: 'About',
    component: About,
    hiddenHeader: true,
  },
];

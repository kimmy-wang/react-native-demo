import CodePush from '../pages/Settings/CodePush';
import BottomTab from '../pages/Settings/BottomTab';
import BottomTab2 from '../pages/Settings/BottomTab2';
import DarkMode from '../pages/Settings/DarkMode';
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
    id: 50,
    title: '关于',
    routeName: 'About',
    component: About,
    hiddenHeader: true,
  },
];

import CodePush from '../pages/Settings/CodePush';
import BottomTab from '../pages/Settings/BottomTab';
import About from '../pages/Settings/About';

export default [
  {
    id: 1,
    title: 'CodePush示例',
    description: 'CodePush Demo',
    routeName: 'CodePush',
    component: CodePush,
  },
  {
    id: 2,
    title: '底部Tab栏',
    description: '底部Tab栏',
    routeName: 'BottomTabSetting',
    component: BottomTab,
  },
  {
    id: 3,
    title: '关于',
    description: 'About',
    routeName: 'About',
    component: About,
    hiddenHeader: true,
  },
];

import Gallery from '../pages/Samples/Gallery';
import QrCode from '../pages/Samples/QrCode';
import Video from '../pages/Samples/Video';
import AMap from '../pages/Samples/AMap';
import TopTab from '../pages/Samples/TopTab';
import Contacts from '../pages/Samples/Contacts';
import Notification from '../pages/Samples/Notification';

export default [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '相册示例',
    description: 'Gallery Demo',
    routeName: 'Gallery',
    component: Gallery,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '扫码示例',
    description: 'Scan QR code Demo',
    routeName: 'QrCode',
    component: QrCode,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '视频示例',
    description: 'Video Demo',
    routeName: 'Video',
    component: Video,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '地图示例',
    description: 'Map Demo',
    routeName: 'AMap',
    component: AMap,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '顶部Tab页示例',
    description: 'TopTab Demo',
    routeName: 'TopTab',
    component: TopTab,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '通讯录示例',
    description: 'Contacts Demo',
    routeName: 'Contacts',
    component: Contacts,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '通知推送示例',
    description: 'Notification Demo',
    routeName: 'Notification',
    component: Notification,
  },
];

import Gallery from '../pages/Samples/Gallery';
import QrCode from '../pages/Samples/QrCode';
import QrCodeResult from '../pages/Samples/QrCode/QrCodeResult';
import Video from '../pages/Samples/Video';
import AMap from '../pages/Samples/AMap';
import TopTab from '../pages/Samples/TopTab';
import Contacts from '../pages/Samples/Contacts';
import Notification from '../pages/Samples/Notification';
import Share from '../pages/Samples/Share';

export default [
  {
    id: '1',
    title: '相册示例',
    description: 'Gallery Demo',
    routeName: 'Gallery',
    component: Gallery,
  },
  {
    id: '2',
    title: '扫码示例',
    description: 'Scan QR code Demo',
    routeName: 'QrCode',
    component: QrCode,
    children: [
      {
        id: '21',
        title: '扫码结果',
        description: '扫码结果',
        routeName: 'QrCodeResult',
        component: QrCodeResult,
      },
    ],
  },
  {
    id: '3',
    title: '视频示例',
    description: 'Video Demo',
    routeName: 'Video',
    component: Video,
  },
  {
    id: '4',
    title: '地图示例',
    description: 'Map Demo',
    routeName: 'AMap',
    component: AMap,
  },
  {
    id: '5',
    title: '顶部Tab页示例',
    description: 'TopTab Demo',
    routeName: 'TopTab',
    component: TopTab,
  },
  {
    id: '6',
    title: '通讯录示例',
    description: 'Contacts Demo',
    routeName: 'Contacts',
    component: Contacts,
  },
  {
    id: '7',
    title: '通知推送示例',
    description: 'Notification Demo',
    routeName: 'Notification',
    component: Notification,
  },
  {
    id: '8',
    title: '分享示例',
    description: 'Share Demo',
    routeName: 'Share',
    component: Share,
  },
];

import Gallery from '../pages/Samples/Gallery';
import QrCode from '../pages/Samples/QrCode';
import QrCodeResult from '../pages/Samples/QrCode/QrCodeResult';
import Video from '../pages/Samples/Video';
import Swiper from '../pages/Samples/Swiper';
import AMap from '../pages/Samples/AMap';
import TopTab from '../pages/Samples/TopTab';
import EditableTopTab from '../pages/Samples/EditableTopTab';
import Contacts from '../pages/Samples/Contacts';
import Notification from '../pages/Samples/Notification';
import Share from '../pages/Samples/Share';
import Animated from '../pages/Samples/Animated';

export default [
  {
    id: 0,
    title: '相册示例',
    description: 'Gallery Demo',
    routeName: 'Gallery',
    component: Gallery,
  },
  {
    id: 5,
    title: '扫码示例',
    description: 'Scan QR code Demo',
    routeName: 'QrCode',
    component: QrCode,
    children: [
      {
        id: 200,
        title: '扫码结果',
        description: '扫码结果',
        routeName: 'QrCodeResult',
        component: QrCodeResult,
      },
    ],
  },
  {
    id: 10,
    title: '视频示例',
    description: 'Video Demo',
    routeName: 'Video',
    component: Video,
  },
  {
    id: 15,
    title: '滑块视图示例',
    description: 'Swiper Demo',
    routeName: 'Swiper',
    component: Swiper,
  },
  {
    id: 20,
    title: '顶部Tab页示例',
    description: 'TopTab Demo',
    routeName: 'TopTab',
    component: TopTab,
  },
  {
    id: 25,
    title: '可编辑顶部Tab页示例',
    description: 'EditableTopTab Demo',
    routeName: 'EditableTopTab',
    component: EditableTopTab,
  },
  {
    id: 30,
    title: '通讯录示例',
    description: 'Contacts Demo',
    routeName: 'Contacts',
    component: Contacts,
  },
  {
    id: 35,
    title: '通知推送示例',
    description: 'Notification Demo',
    routeName: 'Notification',
    component: Notification,
  },
  {
    id: 40,
    title: '分享示例',
    description: 'Share Demo',
    routeName: 'Share',
    component: Share,
  },
  {
    id: 45,
    title: '动画示例',
    description: 'Animated Demo',
    routeName: 'Animated',
    component: Animated,
  },
  {
    id: 50,
    title: '地图示例',
    description: 'Map Demo',
    routeName: 'AMap',
    component: AMap,
  },
];

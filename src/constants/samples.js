import Gallery from '../pages/Samples/Gallery';
import QrCode from '../pages/Samples/QrCode';
import Fingerprint from '../pages/Samples/Fingerprint';
import Nfc from '../pages/Samples/Nfc';
import QrCodeResult from '../pages/Samples/QrCode/QrCodeResult';
import Video from '../pages/Samples/Video';
import Table from '../pages/Samples/Table';
import Swiper from '../pages/Samples/Swiper';
import AMap from '../pages/Samples/AMap';
import TopTab from '../pages/Samples/TopTab';
import EditableTopTab from '../pages/Samples/EditableTopTab';
import Contacts from '../pages/Samples/Contacts';
import Native from '../pages/Samples/Native';
import Share from '../pages/Samples/Share';
import Animated from '../pages/Samples/Animated';

export default [
  {
    id: 0,
    title: 'samples.gallery.title',
    description: 'samples.gallery.desc',
    routeName: 'Gallery',
    component: Gallery,
  },
  {
    id: 5,
    title: 'samples.qrCode.title',
    description: 'samples.qrCode.desc',
    routeName: 'QrCode',
    component: QrCode,
    children: [
      {
        id: 200,
        title: 'samples.qrCodeResult.title',
        description: 'samples.qrCodeResult.desc',
        routeName: 'QrCodeResult',
        component: QrCodeResult,
      },
    ],
  },
  {
    id: 8,
    title: 'samples.localAuth.title',
    description: 'samples.localAuth.desc',
    routeName: 'Fingerprint',
    component: Fingerprint,
  },
  {
    id: 9,
    title: 'samples.nfc.title',
    description: 'samples.nfc.desc',
    hidden: true,
    routeName: 'Nfc',
    component: Nfc,
  },
  {
    id: 10,
    title: 'samples.video.title',
    description: 'samples.video.desc',
    routeName: 'Video',
    component: Video,
  },
  {
    id: 13,
    title: 'samples.table.title',
    description: 'samples.table.desc',
    routeName: 'Table',
    component: Table,
  },
  {
    id: 15,
    title: 'samples.swiper.title',
    description: 'samples.swiper.desc',
    routeName: 'Swiper',
    component: Swiper,
  },
  {
    id: 20,
    title: 'samples.topTab.title',
    description: 'samples.topTab.desc',
    routeName: 'TopTab',
    component: TopTab,
  },
  {
    id: 25,
    title: 'samples.editableTopTab.title',
    description: 'samples.editableTopTab.desc',
    routeName: 'EditableTopTab',
    component: EditableTopTab,
  },
  {
    id: 30,
    title: 'samples.contacts.title',
    description: 'samples.contacts.desc',
    routeName: 'Contacts',
    component: Contacts,
  },
  {
    id: 35,
    title: 'samples.native.title',
    description: 'samples.native.desc',
    routeName: 'Native',
    component: Native,
  },
  {
    id: 40,
    title: 'samples.share.title',
    description: 'samples.share.desc',
    routeName: 'Share',
    component: Share,
  },
  {
    id: 45,
    title: 'samples.animation.title',
    description: 'samples.animation.desc',
    routeName: 'Animated',
    component: Animated,
  },
  {
    id: 50,
    title: 'samples.aMap.title',
    description: 'samples.aMap.desc',
    hidden: true,
    routeName: 'AMap',
    component: AMap,
  },
];

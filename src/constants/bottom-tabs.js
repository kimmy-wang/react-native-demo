import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Samples from '../pages/Samples';
import ProductCategory from '../pages/ProductCategory';
import WebView from '../pages/WebView';
import Settings from '../pages/Settings';

export default {
  Samples: {
    Comp: Samples,
    IconComp: AntDesign,
  },
  ProductCategory: {
    Comp: ProductCategory,
    IconComp: AntDesign,
  },
  WebView: {
    Comp: WebView,
    IconComp: MaterialCommunityIcons,
  },
  Settings: {
    Comp: Settings,
    IconComp: MaterialCommunityIcons,
  },
};

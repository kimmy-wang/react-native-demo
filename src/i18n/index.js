import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import translationEn from './en';
import translationZh from './zh';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb('en'),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: translationEn,
      },
      zh: {
        translation: translationZh,
      },
    },
  });

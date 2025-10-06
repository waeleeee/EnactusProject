import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './ar.json';
import fr from './fr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      fr: { translation: fr }
    },
    lng: 'ar', // default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import zh from './locales/zh.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh }
  },
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback if language not found
  interpolation: { escapeValue: false } // React already escapes values
});

export default i18n;

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {SystemPhrases} from './modules/localization/systemPhrases';
import {SystemLanguageCode} from './modules/localization/localization.types';
import {STORAGE_KEYS} from './modules/storage/storage.consts';
import {translation as en} from './locales/en';
import {translation as he} from './locales/he';

// Import JSON files manually or use HTTP backend for dynamic loading
const resources: Record<SystemLanguageCode, {translation: SystemPhrases}> = {
  en: {
    translation: en,
  },
  he: {
    translation: he,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'en', // Default language
  fallbackLng: 'en',
  interpolation: {escapeValue: false},
});

export default i18n;

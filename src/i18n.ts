import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {SystemPhrases} from './modules/localization/systemPhrases';
import {SystemLanguageCode} from './modules/localization/localization.types';
import {STORAGE_KEYS} from './modules/storage/storage.consts';

// Import JSON files manually or use HTTP backend for dynamic loading
const resources: Record<SystemLanguageCode, {translation: SystemPhrases}> = {
  en: {
    translation: {
      menus: {
        home: 'Home',
        dashboard: 'Dashboard',
        help: 'Request Help',
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Logout',
        login: 'Login',
        signup: 'Sign Up',
      },
    },
  },
  he: {
    translation: {
      menus: {
        home: 'בית',
        dashboard: 'לוח בקרה',
        help: 'בקשת עזרה',
        profile: 'פרופיל',
        settings: 'הגדרות',
        logout: 'התנתקות',
        login: 'התחברות',
        signup: 'הרשמה',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'en', // Default language
  fallbackLng: 'en',
  interpolation: {escapeValue: false},
});

export default i18n;

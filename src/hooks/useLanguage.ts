import {useCallback, useEffect, useState} from 'react';
import {SystemLanguage, systemLanguages} from '@/modules/localization/localization.types';
import {STORAGE_KEYS} from '@/modules/storage/storage.consts';
import {useTranslation} from 'react-i18next';

export default function useLanguage() {
  const [language, setLanguage] = useState<SystemLanguage>(
    systemLanguages[localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'en'],
  );
  const {i18n} = useTranslation();

  const updateLanguage = useCallback(
    (language: SystemLanguage) => {
      setLanguage(language);
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, language.code);
      i18n.changeLanguage(language.code);
    },
    [i18n],
  );

  useEffect(() => {
    if (language.isRTL) {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }
  }, [language.code, language.isRTL]);

  return {language, updateLanguage};
}

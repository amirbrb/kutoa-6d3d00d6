import {useEffect, useState} from 'react';
import {
  SystemLanguage,
  SystemLanguageCode,
  systemLanguages,
} from '@/modules/localization/localization.types';

export default function useLanguage() {
  const [language, setLanguage] = useState<SystemLanguage>(systemLanguages.en);

  useEffect(() => {
    if (language.code === SystemLanguageCode.en) {
      setLanguage(systemLanguages.en);
    } else {
      setLanguage(systemLanguages.he);
    }

    if (language.isRTL) {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }
  }, [language.code, language.isRTL]);

  return {language, setLanguage};
}

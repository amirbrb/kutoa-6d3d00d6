import {useTranslation} from 'react-i18next';
import '../i18n'; // Import i18n configuration
import {SystemPhrases} from '@/modules/localization/systemPhrases';
import {DeepKeys} from '@/utils/deepKeyOf';
import useLanguage from './useLanguage';
import {STORAGE_KEYS} from '@/modules/storage/storage.consts';
export default function useSystemPhrase() {
  const {t} = useTranslation();
  const {language} = useLanguage();
  const phrasesObj = JSON.parse(JSON.stringify(localStorage.getItem(STORAGE_KEYS.LANGUAGE)));

  const translate = (key: DeepKeys<SystemPhrases>) => {
    return t(key);
  };

  return {
    translate,
  };
}

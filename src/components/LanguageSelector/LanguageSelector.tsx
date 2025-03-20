import {useState} from 'react';
import styles from './LanguageSelector.module.css';
import {SystemLanguage, systemLanguages} from '@/modules/localization/localization.types';

interface LanguageSelectorProps {
  onLanguageChange: (language: SystemLanguage) => void;
  currentLanguage: SystemLanguage;
}

function LanguageSelector({onLanguageChange, currentLanguage}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentFlag = systemLanguages[currentLanguage.code]?.flag || systemLanguages[0].flag;

  return (
    <div className={styles.languageSelector}>
      <button
        className={styles.languageButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <span className={styles.flag}>{currentFlag}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {Object.values(systemLanguages).map((language) => (
            <button
              key={language.code}
              className={styles.languageOption}
              onClick={() => {
                onLanguageChange(language);
                setIsOpen(false);
              }}
            >
              <span className={styles.flag}>{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;

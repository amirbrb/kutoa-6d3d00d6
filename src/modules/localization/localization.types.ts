export interface SystemLanguage {
  code: SystemLanguageCode;
  name: string;
  flag: string;
  isRTL: boolean;
}

export enum SystemLanguageCode {
  en = 'en',
  he = 'he',
}

export const systemLanguages: Record<string, SystemLanguage> = {
  [SystemLanguageCode.en]: {
    code: SystemLanguageCode.en,
    name: 'English',
    flag: '🇺🇸',
    isRTL: false,
  },
  [SystemLanguageCode.he]: {
    code: SystemLanguageCode.he,
    name: 'עברית',
    flag: '🇮🇱',
    isRTL: true,
  },
};

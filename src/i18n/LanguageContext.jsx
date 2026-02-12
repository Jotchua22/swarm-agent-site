import { createContext, useContext, useState, useMemo } from 'react';
import { translations } from './translations';
import { tokenomicsTranslations } from './tokenomics-translations';
import { whitepaperTranslations } from './whitepaper-translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = useMemo(() => ({
    ...translations[lang],
    tokenomics: tokenomicsTranslations[lang],
    whitepaper: whitepaperTranslations[lang],
  }), [lang]);
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

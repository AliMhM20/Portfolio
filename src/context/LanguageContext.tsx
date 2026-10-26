import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Language, SiteContent } from '../types/portfolio';
import { contentFA, contentEN } from '../data/content';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRtl: boolean;
  content: SiteContent;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_design1_lang') as Language | null;
      if (saved === 'fa' || saved === 'en') return saved;
    }
    return 'fa'; // Default to Persian
  });

  const isRtl = language === 'fa';
  const content = isRtl ? contentFA : contentEN;

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

    if (isRtl) {
      root.style.fontFamily = "'Sahel', sans-serif";
    } else {
      root.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
    }

    localStorage.setItem('portfolio_design1_lang', language);
  }, [language, isRtl]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'fa' ? 'en' : 'fa'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, isRtl, content }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

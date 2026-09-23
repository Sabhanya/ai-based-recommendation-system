import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../translations/en';
import { te } from '../translations/te';

const LanguageContext = createContext();

const dictionaries = { en, te };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('croply_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('croply_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'te' : 'en'));
  };

  /**
   * Helper to retrieve nested translation key with parameter interpolation
   * Example: t('results.modalTitle', { crop: 'Rice' })
   */
  const t = (path, params = {}) => {
    const dict = dictionaries[language] || dictionaries.en;
    const fallbackDict = dictionaries.en;

    const keys = path.split('.');
    let value = keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), dict);

    if (value === null || value === undefined) {
      // Try fallback
      value = keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), fallbackDict);
    }

    if (typeof value === 'string') {
      return Object.keys(params).reduce((str, paramKey) => {
        return str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), params[paramKey]);
      }, value);
    }

    return value || path;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isTelugu: language === 'te',
        isEnglish: language === 'en',
        t,
        dict: dictionaries[language] || dictionaries.en
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// src/context/LanguageContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Create context
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Available languages
  const supportedLanguages = ['en', 'hi', 'mr', 'te'];
  
  // Initial language from user preference (stored in localStorage) or browser language
  const getUserLanguage = () => {
    const storedLanguage = localStorage.getItem('sevak_language');
    
    if (storedLanguage && supportedLanguages.includes(storedLanguage)) {
      return storedLanguage;
    }
    
    const userProfile = localStorage.getItem('sevak_user');
    if (userProfile) {
      const { preferences } = JSON.parse(userProfile);
      if (preferences?.language && supportedLanguages.includes(preferences.language)) {
        return preferences.language;
      }
    }
    
    const browserLang = navigator.language.split('-')[0];
    if (supportedLanguages.includes(browserLang)) {
      return browserLang;
    }
    
    return 'hi'; // Default to Hindi for rural Indian context
  };
  
  const [language, setLanguageState] = useState(getUserLanguage());
  
  // Update language in storage when it changes
  const setLanguage = (lang) => {
    if (!supportedLanguages.includes(lang)) {
      console.warn(`Language ${lang} is not supported`);
      return;
    }
    
    localStorage.setItem('sevak_language', lang);
    setLanguageState(lang);
  };
  
  // Update document language attribute
  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);
  
  return (
    <LanguageContext.Provider 
      value={{
        language,
        setLanguage,
        supportedLanguages
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
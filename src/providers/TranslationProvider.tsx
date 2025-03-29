'use client'

import { I18nextProvider } from 'react-i18next'
import { i18n } from '../app/i18n/client'
import { useEffect, useState } from 'react'

export default function TranslationProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [isLanguageInitialized, setIsLanguageInitialized] = useState(false);

  useEffect(() => {
    const savedLanguage = typeof window !== 'undefined' 
      ? localStorage.getItem('selectedLanguage')
      : null;
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage).finally(() => {
        setIsLanguageInitialized(true);
      });
    } else {
      setIsLanguageInitialized(true);
    }
  }, []);

  if (!isLanguageInitialized) {
    return null; 
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
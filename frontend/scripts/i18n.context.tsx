import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import i18n from '@/scripts/i18n';

type ContextType = {
  t: (scope: string, options?: object) => string;
  locale: string;
  setLocale: (newLocale: string) => void;
};

const I18nContext = createContext<ContextType>({
  t: (key) => key,
  locale: i18n.locale,
  setLocale: () => {},
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState(i18n.locale);

  const contextValue = useMemo(() => ({
    t: (scope: string, options?: object) => i18n.t(scope, { locale, ...options }),
    locale,
    setLocale: (newLocale: string) => {
      i18n.locale = newLocale;
      setLocale(newLocale);
    },
  }), [locale]);

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
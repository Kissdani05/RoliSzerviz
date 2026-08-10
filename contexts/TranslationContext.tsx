"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { translations, Locale, TranslationKey } from "../lib/translations";

interface TranslationContextType {
  locale: Locale;
  t: (key: TranslationKey) => string;
  changeLocale: (newLocale: Locale) => void;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>("hu");

  useEffect(() => {
    // Always use Hungarian as default, ignore browser/cookie/localStorage
    setLocale("hu");
    localStorage.setItem("preferredLanguage", "hu");
    document.cookie = `lang=hu;path=/;max-age=31536000`;
  }, []);

  const changeLocale = (newLocale: Locale) => {
    if (translations[newLocale]) {
      setLocale(newLocale);
      localStorage.setItem("preferredLanguage", newLocale);
      document.cookie = `lang=${newLocale};path=/;max-age=31536000`; // Expires in 1 year

      // Only touch the tab title / meta description when the visitor actively
      // switches language. Doing this on every mount used to immediately
      // overwrite the carefully written, keyword-rich <title> and
      // <meta name="description"> that Next's Metadata API renders on the
      // server (see app/layout.tsx) with a shorter, less SEO-friendly
      // version — which is what search engines saw when they rendered the
      // page's JavaScript.
      document.title = translations[newLocale]["oldalcim"] || document.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && translations[newLocale]["meta_leiras"]) {
        metaDescription.setAttribute("content", translations[newLocale]["meta_leiras"]);
      }
    }
  };

  const t = (key: TranslationKey): string => {
    return translations[locale]?.[key] || translations["hu"]?.[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ locale, t, changeLocale }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};

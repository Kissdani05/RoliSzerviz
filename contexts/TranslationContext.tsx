"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { translations, Locale, TranslationKey } from "../lib/translations";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

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
    }
  };

  const t = (key: TranslationKey): string => {
    return translations[locale]?.[key] || translations["hu"]?.[key] || key;
  };

  // Update meta tags and title on locale change or pathname change
  useEffect(() => {
    document.title = t("oldalcim");
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("meta_leiras"));
    }
  }, [locale, t, pathname]);

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

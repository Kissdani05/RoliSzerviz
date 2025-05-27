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

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>("hu");
  const pathname = usePathname();

  useEffect(() => {
    const savedLang =
      (localStorage.getItem("preferredLanguage") as Locale) ||
      (document.cookie.replace(
        /(?:(?:^|.*;\s*)lang\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      ) as Locale) ||
      (typeof navigator !== "undefined" &&
        (navigator.language.substring(0, 2) as Locale));
    if (translations[savedLang]) {
      setLocale(savedLang);
    } else {
      setLocale("hu"); // Default to Hungarian if saved language is invalid
    }
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

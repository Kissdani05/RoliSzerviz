"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "../contexts/TranslationContext";
import { Locale } from "../lib/translations";

const LanguageSelector: React.FC = () => {
  const { locale, changeLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const flags: Record<Locale, string> = {
    hu: "/logok/magyar.webp",
    en: "/logok/angol.webp",
    de: "/logok/nemet.webp",
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (newLocale: Locale) => {
    changeLocale(newLocale);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="language-selector-container">
      <div className="language-selector" ref={dropdownRef}>
        <div
          className="current-flag"
          id="currentLanguageFlag"
          onClick={toggleDropdown}
        >
          <Image
            src={flags[locale]}
            alt={`${locale} flag`}
            width={24}
            height={24}
            className="flag-icon"
          />
        </div>
        {isOpen && (
          <div className="language-dropdown show">
            {(Object.keys(flags) as Locale[]).map((lang) => (
              <div
                key={lang}
                className="flag-option"
                onClick={() => handleLanguageChange(lang)}
              >
                <Image
                  src={flags[lang]}
                  alt={`${lang} flag`}
                  width={24}
                  height={24}
                  className="flag-icon"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;

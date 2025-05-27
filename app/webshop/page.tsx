"use client"; // Required for useTranslation and LanguageSelector

import Link from "next/link";
import { useTranslation } from "../../contexts/TranslationContext"; // Adjusted path
import LanguageSelector from "../../components/LanguageSelector"; // Adjusted path

export default function WebshopPage() {
  const { t } = useTranslation();

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="logo">{t("ROLI SZERVIZ")}</div>
          <nav className="nav" id="mainNav">
            <Link href="/" className="webshop-btn">
              {t("Szerviz")}
            </Link>
            <div className="contact-icons">
              <a href="tel:+36302542292" className="phone">
                <i className="fas fa-phone"></i> +36 30 254 2292
              </a>
              <div className="social-icons">
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="TikTok">
                  <i className="fab fa-tiktok"></i>
                </a>
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <LanguageSelector />
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section className="coming-soon">
        <div className="container">
          <div className="coming-soon-content">
            <h1 className="coming-soon-title">{t("Hamarosan")}</h1>
            <p className="coming-soon-text">
              {t("Webshopunk hamarosan elérhető lesz")}
            </p>
            <Link href="/" className="btn btn-primary">
              {t("Vissza a főoldalra")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

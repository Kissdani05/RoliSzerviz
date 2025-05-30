"use client"; // Required for useTranslation and LanguageSelector

import Link from "next/link";
// import Image from "next/image"; // No longer needed directly here for product placeholder
import { useTranslation } from "../../contexts/TranslationContext"; // Adjusted path
import LanguageSelector from "../../components/LanguageSelector"; // Adjusted path
import {
  Phone,
  Instagram,
  Youtube,
  Facebook,
  PackageSearch,
} from "lucide-react"; // Added PackageSearch

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
                <Phone size={18} /> {/* Lucide Phone icon */}
                +36 30 254 2292
              </a>
              <div className="social-icons">
                <a href="#" aria-label="Instagram">
                  <Instagram size={20} /> {/* Lucide Instagram icon */}
                </a>
                <a href="#" aria-label="TikTok">
                  <Youtube size={20} /> {/* Lucide Youtube icon */}
                </a>
                <a href="#" aria-label="Facebook">
                  <Facebook size={20} /> {/* Lucide Facebook icon */}
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
      {/* Placeholder for Webshop content - To be developed */}
      
    </>
  );
}

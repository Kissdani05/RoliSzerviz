"use client"; // Required for useTranslation and LanguageSelector

import Link from "next/link";
// import Image from "next/image"; // No longer needed directly here for product placeholder
import { useTranslation } from "../../contexts/TranslationContext"; // Adjusted path
import LanguageSelector from "../../components/LanguageSelector"; // Adjusted path
import {
  Phone,
  Instagram,
  Facebook,
} from "lucide-react"; // Added PackageSearch
import Image from "next/image";

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
                <Phone size={18} />
                +36 30 254 2292
              </a>
              <div className="social-icons">
                <a href="https://www.instagram.com/roliszerviz.hu/" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://www.tiktok.com/@roliszerviz" aria-label="TikTok">
                  <Image src="/logok/Tiktok Icon.png" alt="TikTok" width={20} height={20} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </a>
                <a href="https://www.facebook.com/Roliszerviz.huDebrecen?locale=hu_HU" aria-label="Facebook">
                  <Facebook size={20} />
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

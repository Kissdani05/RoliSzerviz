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
      <section className="webshop-content py-12">
        <div className="container">
          <h2 className="section-title text-center mb-8">{t("Termékeink")}</h2>
          {/* Add a translation key for "Termékeink" if needed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Example Product Card - Repeat for each product */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="product-card bg-gray-800 p-4 rounded-lg shadow-lg text-center flex flex-col justify-between"
              >
                <div className="product-image-placeholder bg-gray-700 w-full h-48 rounded mb-4 flex items-center justify-center">
                  <PackageSearch size={48} className="text-gray-500" />{" "}
                  {/* Corrected Placeholder Icon */}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("Termék neve")} {item}
                  </h3>{" "}
                  {/* Added t() for product name */}
                  <p className="text-primary-color font-bold mb-3">10.000 Ft</p>
                  <button className="btn btn-primary w-full">
                    {t("Kosárba")}
                  </button>{" "}
                  {/* Added t() for button */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import PriceModal from "../components/PriceModal";
import BookingModal from "../components/BookingModal";
import { useTranslation } from "../contexts/TranslationContext";
import LanguageSelector from "../components/LanguageSelector";
import { Phone, Instagram, Facebook } from "lucide-react"; // Import Lucide icons

export default function Home() {
  const { t } = useTranslation();
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const openPriceModal = () => setIsPriceModalOpen(true);
  const closePriceModal = () => setIsPriceModalOpen(false);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="logo">{t("ROLI SZERVIZ")}</div>
          <nav className="nav" id="mainNav">
            <a href="/webshop" className="webshop-btn">
              {t("Webshop")}
            </a>
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

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                {t("ÜDVÖZLÜNK")}{" "}
                <span>
                  <br /> {t("A ROLI SZERVIZNÉL!")}
                </span>
              </h1>
              <p className="hero-subtitle">
                {t("Elektromos roller és kerékpár szerviz Debrecenben")}
              </p>
              <p className="hero-description">
                {t(
                  "Gyors és professzionális megoldás minden típusú elektromos járműhöz, kényelmes háztól házig szállítással."
                )}
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary" onClick={openPriceModal}>
                  {t("Árlista")}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={openBookingModal}
                >
                  {t("Időpontfoglalás")}
                </button>
              </div>
            </div>
            <div className="hero-image">
              <Image
                src="/roller.png"
                alt="Elektromos roller és kerékpár"
                width={500}
                height={300}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">{t("Ügyfeleink véleménye")}</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>{t("testimonial1")}</p>
              </div>
              <div className="testimonial-author">
                <div className="author-name">{t("author1")}</div>
                <div className="author-date">{t("date1")}</div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>{t("testimonial2")}</p>
              </div>
              <div className="testimonial-author">
                <div className="author-name">{t("author2")}</div>
                <div className="author-date">{t("date2")}</div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>{t("testimonial3")}</p>
              </div>
              <div className="testimonial-author">
                <div className="author-name">{t("author3")}</div>
                <div className="author-date">{t("date3")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <div className="container">
          <div className="video-container">
            <h2 className="video-title">{t("Szerelj velunk otthon!")}</h2>
            <div className="video-wrapper">
              {/* Replace VIDEO_ID with your actual YouTube video ID */}
              <iframe
                src="https://www.youtube.com/embed/VIDEO_ID"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Reklam */}
      {/*
      <div className="ad-container">
        <div className="ad-title">{t("Ajánlatunk")}</div>
        <div className="ad-content">
          <div className="ad-image">
            <Image
              src="/roller.png"
              alt="Speciális akció"
              width={100}
              height={100}
              loading="lazy"
            />
          </div>
          <div className="ad-text">
            {t("Most 10% kedvezmény minden szervizre!")}
          </div>
          <button
            className="ad-button"
            onClick={openBookingModal} // Assuming this button should also open booking modal
          >
            {t("Igénylem")}
          </button>
        </div>
      </div>
      */}

      <PriceModal isOpen={isPriceModalOpen} onClose={closePriceModal} />
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </>
  );
}

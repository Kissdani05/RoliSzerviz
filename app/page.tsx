"use client";

import Image from "next/image";
import React, { useState } from "react";
import PriceModal from "../components/PriceModal";
import BookingModal from "../components/BookingModal";
import { useTranslation } from "../contexts/TranslationContext";
import LanguageSelector from "../components/LanguageSelector";
import { Phone, Instagram, Facebook } from "lucide-react"; // Import Lucide icons

export default function Home() {
  const { t } = useTranslation();
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // State for testimonial expansion (one per testimonial)
  const [testimonialExpanded, setTestimonialExpanded] = useState([false, false, false]);

  const openPriceModal = () => setIsPriceModalOpen(true);
  const closePriceModal = () => setIsPriceModalOpen(false);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  return (
    <>
      <head>
        <title>ROLISZERVIZ</title>
        {/* Meta tags are now handled in layout.tsx for SEO and deduplication */}
      </head>
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
                  <Image src="/logok/Tiktok Icon.webp" alt="TikTok" width={20} height={20} style={{ display: 'inline', verticalAlign: 'middle' }} />
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
              <p className="hero-subtitle2">
                {t("Háztól házig szerviz az alapdíjban!")}
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

      <section className="seo-description" style={{ background: '#181818', color: '#fff', padding: '2.5rem 0', margin: '0', borderRadius: '0.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', maxWidth: '100vw' }}>
        <div className="container" style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 700 }}>Miért válassza a RoliSzervizt Debrecenben?</h2>
          <p style={{ fontSize: '1.15rem', marginBottom: '1.2rem', lineHeight: 1.7 }}>
            A <strong>RoliSzerviz</strong> Debrecen egyik legmegbízhatóbb <strong>elektromos roller szerviz</strong> szolgáltatója, ahol gyors, precíz és ügyfélközpontú javítást kínálunk minden típusú elektromos rollerhez. Szervizünk fő profilja a <strong>roller szerviz Debrecen</strong> területén, ahol a háztól házig szállítás kényelmét is biztosítjuk ügyfeleinknek. Nálunk nem kell sorban állni vagy időt vesztegetni, hiszen a javítandó rollert otthonából szállítjuk el, majd a javítás után vissza is visszük Önnek.
          </p>
          <h3 style={{ color: 'var(--primary-color)', fontSize: '1.3rem', margin: '1.5rem 0 0.7rem 0' }}>Szolgáltatásaink</h3>
          <p style={{ fontSize: '1.08rem', marginBottom: '1.2rem', lineHeight: 1.7 }}>
            Vállaljuk elektromos rollerek teljes körű karbantartását, gumiszerelését, fék javítását, elektromos hibák feltárását és javítását, valamint alkatrészcserét. Minden munkánkra garanciát vállalunk, és kizárólag minőségi alkatrészekkel dolgozunk. A <strong>roller szerviz</strong> Debrecenben nálunk gyors, átlátható és korrekt árazású.
          </p>
          <h3 style={{ color: 'var(--primary-color)', fontSize: '1.3rem', margin: '1.5rem 0 0.7rem 0' }}>Miért előnyös a háztól házig szerviz?</h3>
          <p style={{ fontSize: '1.08rem', marginBottom: '1.2rem', lineHeight: 1.7 }}>
            A háztól házig szerviz azt jelenti, hogy Önnek semmit sem kell tennie: csak leadja a megrendelést, mi pedig elhozzuk a rollert, elvégezzük a szükséges javításokat, majd visszaszállítjuk. Ez a szolgáltatás Debrecenben és környékén is elérhető, így időt és energiát spórolhat meg.
          </p>
          <h3 style={{ color: 'var(--primary-color)', fontSize: '1.3rem', margin: '1.5rem 0 0.7rem 0' }}>Kapcsolat és időpontfoglalás</h3>
          <p style={{ fontSize: '1.08rem', marginBottom: 0, lineHeight: 1.7 }}>
            Ha <strong>elektromos roller szervizt Debrecenben</strong> keres, válassza a RoliSzervizt! Foglaljon időpontot online, vagy vegye fel velünk a kapcsolatot telefonon. Szervizünk célja, hogy minden ügyfél elégedetten és biztonságosan használhassa elektromos rollerét Debrecenben.
          </p>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">{t("Ügyfeleink véleménye")}</h2>
          <div className="testimonials-grid">
            {[1, 2, 3].map((i, idx) => {
              const text = t(`testimonial${i}`);
              const author = t(`author${i}`);
              const date = t(`date${i}`);
              let preview = '';
              if (i === 2) {
                // 2. vélemény: első sortörésig vagy max 80 karakterig
                const idxNew = text.indexOf('\n');
                preview = idxNew !== -1 ? text.slice(0, idxNew + 1) : text.slice(0, 80);
              } else if (i === 3) {
                // 3. vélemény: első mondat vagy felkiáltójel
                const exclamIdx = text.indexOf('!');
                if (exclamIdx !== -1) {
                  preview = text.slice(0, exclamIdx + 1);
                } else {
                  const match = text.match(/[.!?]/);
                  if (match && match.index !== undefined) {
                    preview = text.slice(0, match.index + 1);
                  } else {
                    preview = text;
                  }
                }
              } else {
                // 1. vélemény: első mondat
                const match = text.match(/[.!?]/);
                if (match && match.index !== undefined) {
                  preview = text.slice(0, match.index + 1);
                } else {
                  preview = text;
                }
              }
              preview = preview.trim();
              const needsMore = text.trim() !== preview.trim();
              const expanded = testimonialExpanded[idx];
              return (
                <div className="testimonial-card" key={i}>
                  <div className="testimonial-content">
                    <p style={{ whiteSpace: 'pre-line' }}>
                      {expanded || !needsMore ? text : preview}
                      {needsMore && !expanded && (
                        <span
                          style={{ color: '#111', cursor: 'pointer', fontWeight: 'bold', marginLeft: 8 }}
                          onClick={() => setTestimonialExpanded(exp => exp.map((v, j) => j === idx ? true : v))}
                        >
                          {t('több')}
                        </span>
                      )}
                      {needsMore && expanded && (
                        <span
                          style={{ color: '#111', cursor: 'pointer', fontWeight: 'bold', marginLeft: 8 }}
                          onClick={() => setTestimonialExpanded(exp => exp.map((v, j) => j === idx ? false : v))}
                        >
                          {t('kevesebb')}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-name">{author}</div>
                    <div className="author-date">{date}</div>
                  </div>
                </div>
              );
            })}
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

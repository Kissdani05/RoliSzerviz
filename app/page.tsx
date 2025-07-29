"use client";

import Image from "next/image";
import Head from "next/head";
import React, { useState, useRef, useEffect } from "react";
import PriceModal from "../components/PriceModal";
import BookingModal from "../components/BookingModal";
import { useTranslation } from "../contexts/TranslationContext";
import LanguageSelector from "../components/LanguageSelector";
import { Phone, Instagram, Facebook } from "lucide-react"; // Import Lucide icons
import FAQ from "../components/FAQ"; // Import the FAQ component
import ContactSection from "../components/ContactSection";
import CommonIssues from "../components/CommonIssues";

import ServiceCards from "../components/ServiceCards";
import WhyUs from "../components/WhyUs";
import Testimonials from "../components/Testimonials";


export default function Home() {
  const { t } = useTranslation();
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);


  const priceBtnRef = useRef<HTMLButtonElement>(null);
  const bookingBtnRef = useRef<HTMLButtonElement>(null);
  const seoRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const youtubeRef = useRef<HTMLElement>(null);
  const whyusRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const issuesRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);

  const openPriceModal = () => setIsPriceModalOpen(true);
  const closePriceModal = () => setIsPriceModalOpen(false);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  // Aktív szekció követése
  const [activeSection, setActiveSection] = useState<string>("top");

  // Villogtatás (flash) funkció
  const flashButtons = () => {
    // Double flash for both buttons
    if (priceBtnRef.current) {
      priceBtnRef.current.classList.add("flash");
      setTimeout(() => {
        if (priceBtnRef.current) priceBtnRef.current.classList.remove("flash");
        setTimeout(() => {
          if (priceBtnRef.current) priceBtnRef.current.classList.add("flash");
          setTimeout(() => {
            if (priceBtnRef.current) priceBtnRef.current.classList.remove("flash");
          }, 800);
        }, 120);
      }, 800);
    }
    if (bookingBtnRef.current) {
      bookingBtnRef.current.classList.add("flash");
      setTimeout(() => {
        if (bookingBtnRef.current) bookingBtnRef.current.classList.remove("flash");
        setTimeout(() => {
          if (bookingBtnRef.current) bookingBtnRef.current.classList.add("flash");
          setTimeout(() => {
            if (bookingBtnRef.current) bookingBtnRef.current.classList.remove("flash");
          }, 800);
        }, 120);
      }, 800);
    }
  };

  // (scrollSectionToCenter removed, was unused)

  // Helper: scroll section title to top (headerHeight px offset)
  const scrollSectionTitleToTop = (sectionRef: React.RefObject<HTMLElement | null>, headerHeight: number = 70) => {
    if (!sectionRef.current) return;
    const h2 = sectionRef.current.querySelector('h2');
    if (h2) {
      const rect = h2.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // Scroll so the h2 is just below the nav bar (e.g. 2px extra space)
      const top = rect.top + scrollTop - headerHeight + 2;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      // fallback: scroll section to top
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavClick = (target: "top" | "seo" | "testimonials" | "youtube" | "faq" | "whyus" | "services" | "issues") => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;
    // Desktop nav bar height (px): adjust if needed
    const desktopHeaderHeight = 250;
    if (target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      flashButtons();
    } else if (target === "seo") {
      if (isMobile) {
        scrollSectionTitleToTop(seoRef);
      } else {
        scrollSectionTitleToTop(seoRef, desktopHeaderHeight);
      }
    } else if (target === "testimonials") {
      if (isMobile) {
        scrollSectionTitleToTop(testimonialsRef);
      } else {
        scrollSectionTitleToTop(testimonialsRef, desktopHeaderHeight);
      }
    } else if (target === "youtube") {
      if (isMobile) {
        scrollSectionTitleToTop(youtubeRef);
      } else {
        scrollSectionTitleToTop(youtubeRef, desktopHeaderHeight);
      }
    } else if (target === "faq") {
      if (isMobile) {
        scrollSectionTitleToTop(faqRef);
      } else {
        scrollSectionTitleToTop(faqRef, desktopHeaderHeight);
      }
    } else if (target === "whyus") {
      if (isMobile) {
        scrollSectionTitleToTop(whyusRef);
      } else {
        scrollSectionTitleToTop(whyusRef, desktopHeaderHeight);
      }
    } else if (target === "services") {
      if (isMobile) {
        scrollSectionTitleToTop(servicesRef);
      } else {
        scrollSectionTitleToTop(servicesRef, desktopHeaderHeight);
      }
    } else if (target === "issues") {
      if (isMobile) {
        scrollSectionTitleToTop(issuesRef);
      } else {
        scrollSectionTitleToTop(issuesRef, desktopHeaderHeight);
      }
    }
  };

  // Scroll spy: figyeli, hogy melyik szekció van a viewport közepén
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { name: "whyus", ref: whyusRef },
        { name: "services", ref: servicesRef },
        { name: "testimonials", ref: testimonialsRef },
        { name: "youtube", ref: youtubeRef },
        { name: "issues", ref: issuesRef },
        { name: "faq", ref: faqRef },
        { name: "kapcsolat", ref: contactSectionRef },
      ];
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const center = scrollY + viewportHeight / 2;
      let found = "top";
      for (let i = 0; i < sections.length; i++) {
        const ref = sections[i].ref;
        if (ref && ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const sectionTop = rect.top + scrollY;
          const sectionBottom = sectionTop + rect.height;
          if (center >= sectionTop && center < sectionBottom) {
            found = sections[i].name;
            break;
          }
        }
      }
      // If center is above first section, highlight 'top'
      if (found === "top") {
        if (sections[0].ref && sections[0].ref.current) {
          const firstSectionTop = sections[0].ref.current.getBoundingClientRect().top + scrollY;
          if (center < firstSectionTop) {
            setActiveSection("top");
          } else {
            setActiveSection(sections[0].name);
          }
        } else {
          setActiveSection("top");
        }
      } else {
        setActiveSection(found);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobil hamburger menü állapot
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <link rel="canonical" href="https://roliszerviz.hu/" />
      </Head>
      <main>
      <header className="header">
        <div className="container">
          {/* Mobil nézet: logo balra, hamburger jobbra */}
          <div className="mobile-header">
            {/* Logo and hamburger menu in one line, both vertically centered and responsive */}
            <div className="logo mobile-logo" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t("ROLI SZERVIZ")}</div>
            <button
              className="hamburger-btn"
              aria-label="Menü megnyitása"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="hamburger-icon">
                {/* Hamburger ikon */}
                <svg width="100%" height="100%" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="6" width="28" height="3.2" rx="1.6" fill="#f47b20" />
                  <rect y="13" width="28" height="3.2" rx="1.6" fill="#f47b20" />
                  <rect y="20" width="28" height="3.2" rx="1.6" fill="#f47b20" />
                </svg>
              </span>
            </button>
          </div>
          {/* Hamburger menü tartalma mobilon */}
          {menuOpen && (
            <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)} />
          )}
          <nav
            className={`mobile-menu${menuOpen ? ' open' : ''}`}
            aria-label="Mobil menü"
          >
            {/* X button removed as requested */}
            {/* Phone and Webshop directly below the X button */}
            <div className="mobile-menu-top">
              <a href="tel:+36302542292" className="phone mobile-phone">
                <Phone size={18} />
                +36 30 254 2292
              </a>
              <a href="/webshop" className="webshop-btn mobile-webshop">{t("Webshop")}</a>
            </div>
            {/* Social icons below phone and webshop */}
            <div className="mobile-social-icons">
              <a href="https://www.facebook.com/Roliszerviz.huDebrecen?locale=hu_HU" aria-label="Facebook" className="social-icon">
                <Facebook size={24} color="#181818" style={{ width: 'min(24px, 6vw)', height: 'min(24px, 6vw)' }} />
              </a>
              <a href="https://www.instagram.com/roliszerviz.hu/" aria-label="Instagram" className="social-icon">
                <Instagram size={24} color="#181818" style={{ width: 'min(24px, 6vw)', height: 'min(24px, 6vw)' }} />
              </a>
              <a href="https://www.tiktok.com/@roliszerviz" aria-label="TikTok" className="social-icon">
                <Image src="/logok/Tiktok Icon.webp" alt="TikTok logó – RoliSzerviz közösségi média" width={26} height={26} className="tiktok-img" />
              </a>
            </div>
            <div className="mobile-lang"><LanguageSelector /></div>
      {/* NavBar CSS classes for mobile and desktop */}
      <style>{`
        .mobile-header {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: min(3vw, 0.7rem) min(2vw, 0.5rem);
          background: var(--secondary-color);
          box-shadow: 0 2px 12px rgba(244,123,32,0.07);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1200;
          max-width: 100vw;
          min-height: min(62px, 16vw);
          height: min(62px, 16vw);
        }
        .mobile-logo {
          font-weight: 700;
          font-size: min(1.18rem, 5vw);
          color: #f47b20;
          text-align: center;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0;
        }
        .hamburger-btn {
          background: none;
          border: none;
          padding: min(0.5rem, 2vw);
          cursor: pointer;
          display: flex;
          align-items: center;
          z-index: 1001;
        }
        .hamburger-icon {
          width: min(28px, 7vw);
          height: min(28px, 7vw);
          display: inline-block;
        }
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.18);
          z-index: 1000;
        }
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100vw;
          width: min(80vw, 340px);
          height: 100vh;
          background: var(--secondary-color);
          color: #fff;
          box-shadow: 0 0 32px rgba(244,123,32,0.07);
          z-index: 2000;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: max(20px, min(2.2rem, 7vw)) max(20px, min(1.2rem, 4vw)) max(20px, min(1.2rem, 4vw)) max(20px, min(1.2rem, 4vw));
          transition: right 0.22s cubic-bezier(.7,.2,.3,1);
        }
        .mobile-menu.open {
          right: 0;
        }
        .mobile-menu-top {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 0.7rem;
        }
        .mobile-phone {
          font-weight: 500;
          font-size: 1.08rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.5rem;
          color: #f47b20;
        }
        .mobile-webshop {
          font-weight: 600;
          font-size: 1.08rem;
          margin-bottom: 0.5rem;
          color: #f47b20;
        }
        .mobile-social-icons {
          display: flex;
          gap: 0.7rem;
          margin-bottom: 1.1rem;
        }
        .social-icon {
          background: #fff;
          border-radius: 50%;
          width: min(40px, 10vw);
          height: min(40px, 10vw);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tiktok-img {
          display: inline;
          vertical-align: top;
          filter: brightness(0);
          width: min(26px, 7vw);
          height: min(26px, 7vw);
        }
        .mobile-lang {
          margin-bottom: 1.1rem;
        }
      `}</style>
            <div className="mobile-nav-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', width: '100%', alignItems: 'center' }}>
              <button type="button" className={activeSection === "top" ? "nav-btn active" : "nav-btn"} onClick={() => { handleNavClick("top"); setMenuOpen(false); }}>{t("nav_booking")}</button>
              <button type="button" className={activeSection === "services" ? "nav-btn active" : "nav-btn"} onClick={() => { handleNavClick("services"); setMenuOpen(false); }}>{t("Szolgáltatásaink")}</button>
              <button type="button" className={activeSection === "whyus" ? "nav-btn active" : "nav-btn"} onClick={() => { handleNavClick("whyus"); setMenuOpen(false); }}>{t("Miért mi?")}</button>
              <button type="button" className={activeSection === "testimonials" ? "nav-btn active" : "nav-btn"} onClick={() => { handleNavClick("testimonials"); setMenuOpen(false); }}>{t("Vélemény")}</button>
              <button type="button" className={activeSection === "youtube" ? "nav-btn active" : "nav-btn"} onClick={() => { handleNavClick("youtube"); setMenuOpen(false); }}>{t("YouTube")}</button>
              <button type="button" className={activeSection === "issues" ? "nav-btn active" : "nav-btn"} onClick={() => { handleNavClick("issues"); setMenuOpen(false); }}>{t("Gyakori hibák")}</button>
              <button type="button" className={activeSection === "faq" ? "nav-btn active" : "nav-btn"} onClick={() => { handleNavClick("faq"); setMenuOpen(false); }}>{t("GYIK")}</button>
              <button type="button" className={activeSection === "kapcsolat" ? "nav-btn active" : "nav-btn"} onClick={() => {
                const contactSection = document.querySelector('.contact-section');
                if (contactSection) {
                  const h2 = contactSection.querySelector('h2');
                  if (h2) {
                    const headerHeight = 70;
                    const rect = h2.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const top = rect.top + scrollTop - headerHeight - 8;
                    window.scrollTo({ top, behavior: 'smooth' });
                  } else {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  setTimeout(() => setActiveSection('kapcsolat'), 400);
                } else {
                  setActiveSection('kapcsolat');
                }
                setMenuOpen(false);
              }}>{t("Kapcsolatok")}</button>
            </div>
            <style>{`
              .mobile-menu {
                font-size: 0.98rem;
              }
              .mobile-nav-buttons .nav-btn {
                width: 100%;
                margin: 0;
                border-radius: 2rem;
                padding: 0.38rem 0.7rem;
                font-weight: 600;
                font-size: 0.93rem;
                background: #fff;
                color: #f47b20;
                border: none;
                box-shadow: 0 2px 8px rgba(244,123,32,0.08);
                cursor: pointer;
                transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
                outline: none;
                white-space: nowrap;
                display: block;
                text-align: left;
              }
              .mobile-nav-buttons .nav-btn.active,
              .mobile-nav-buttons .nav-btn:hover {
                background: #f47b20;
                color: #fff;
                box-shadow: 0 4px 16px rgba(244,123,32,0.18);
                transform: translateY(-2px) scale(1.04);
              }
            `}</style>
          </nav>
          {/* Desktop nézet: eredeti nav csak desktopon */}
          <div className="desktop-header" style={{ display: 'block', width: '100%' }}>
            {/* Eredeti desktop nav bar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '2rem', width: '100%' }}>
                <div className="logo" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t("ROLI SZERVIZ")}</div>
                <a href="/webshop" className="webshop-btn" style={{ fontWeight: 600, fontSize: '1.08rem' }}>{t("Webshop")}</a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <a href="tel:+36302542292" className="phone" style={{ fontWeight: 500, fontSize: '1.08rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Phone size={18} />
                    +36 30 254 2292
                  </a>
                  <div className="social-icons" style={{ display: 'flex', gap: '0.7rem', marginLeft: '1.2rem' }}>
                    <a href="https://www.facebook.com/Roliszerviz.huDebrecen?locale=hu_HU" aria-label="Facebook">
                      <Facebook size={20} />
                    </a>
                    <a href="https://www.instagram.com/roliszerviz.hu/" aria-label="Instagram">
                      <Instagram size={20} />
                    </a>
                    <a href="https://www.tiktok.com/@roliszerviz" aria-label="TikTok">
                      <Image src="/logok/Tiktok Icon.webp" alt="TikTok logó – RoliSzerviz közösségi média" width={24} height={24} style={{ display: 'inline', verticalAlign: 'middle' }} />
                    </a>
                    <LanguageSelector />
                  </div>
                </div>
              </div>
              {/* Second row: nav buttons, always centered below */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '0.7rem' }}>
                <nav className="nav" id="mainNav" style={{ width: '100%' }}>
                  <div className="main-nav-buttons" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.7rem',
                    padding: '0.3rem 0',
                    width: '100%',
                    maxWidth: '100vw',
                    boxSizing: 'border-box',
                  }}>
                    <button type="button" className={activeSection === "top" ? "nav-btn active" : "nav-btn"} onClick={() => handleNavClick("top")}>{t("nav_booking")}</button>
                    <button type="button" className={activeSection === "services" ? "nav-btn active" : "nav-btn"} onClick={() => handleNavClick("services")}>{t("Szolgáltatásaink")}</button>
                    <button type="button" className={activeSection === "whyus" ? "nav-btn active" : "nav-btn"} onClick={() => handleNavClick("whyus")}>{t("Miért mi?")}</button>
                    <button type="button" className={activeSection === "testimonials" ? "nav-btn active" : "nav-btn"} onClick={() => handleNavClick("testimonials")}>{t("Vélemény")}</button>
                    <button type="button" className={activeSection === "youtube" ? "nav-btn active" : "nav-btn"} onClick={() => handleNavClick("youtube")}>{t("YouTube")}</button>
                    <button type="button" className={activeSection === "issues" ? "nav-btn active" : "nav-btn"} onClick={() => handleNavClick("issues")}>{t("Gyakori hibák")}</button>
                    <button type="button" className={activeSection === "faq" ? "nav-btn active" : "nav-btn"} onClick={() => handleNavClick("faq")}>{t("GYIK")}</button>
                    <button type="button" className={activeSection === "kapcsolat" ? "nav-btn active" : "nav-btn"} onClick={() => {
                      const contactSection = document.querySelector('.contact-section');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        setActiveSection('kapcsolat');
                      }
                    }}>{t("Kapcsolatok")}</button>
                  </div>
                  <style>{`
                    .nav-btn {
                      background: #fff;
                      color: #f47b20;
                      font-weight: 600;
                      font-size: 1.04rem;
                      border-radius: 2rem;
                      border: none;
                      padding: 0.55rem 1.3rem;
                      margin: 0;
                      box-shadow: 0 2px 8px rgba(244,123,32,0.08);
                      cursor: pointer;
                      transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
                      outline: none;
                      white-space: nowrap;
                      display: inline-block;
                    }
                    .nav-btn.active {
                      background: #f47b20;
                      color: #fff;
                      box-shadow: 0 4px 16px rgba(244,123,32,0.18);
                      transform: translateY(-2px) scale(1.04);
                    }
                    .nav-btn:hover {
                      background: #f47b20;
                      color: #fff;
                      box-shadow: 0 4px 16px rgba(244,123,32,0.18);
                      transform: translateY(-2px) scale(1.04);
                    }
                    @media (max-width: 900px) {
                      .main-nav-buttons {
                        gap: 0.4rem !important;
                      }
                      .nav-btn {
                        font-size: 0.98rem;
                        padding: 0.45rem 0.9rem;
                      }
                    }
                    @media (max-width: 600px) {
                      .main-nav-buttons {
                        flex-wrap: wrap !important;
                        gap: 0.3rem !important;
                      }
                      .nav-btn {
                        font-size: 0.93rem;
                        padding: 0.38rem 0.7rem;
                      }
                    }
                  `}</style>
                </nav>
              </div>
            </div>
          </div>
          <style>{`
            @media (max-width: 900px) {
              .desktop-header {
                display: none !important;
              }
              .mobile-header {
                display: flex !important;
              }
              .mobile-menu {
                display: flex !important;
              }
            }
            @media (min-width: 901px) {
              .desktop-header {
                display: block !important;
              }
              .mobile-header, .mobile-menu {
                display: none !important;
              }
            }
          `}</style>
        </div>
      </header>

      <section className="hero" style={{ marginTop: '0px' }}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                {t("ROLI SZERVIZ")}
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
                <button ref={priceBtnRef} className="btn btn-primary" onClick={openPriceModal}>
                  {t("Árlista")}
                </button>
                <button
                  ref={bookingBtnRef}
                  className="btn btn-secondary"
                  onClick={openBookingModal}
                >
                  {t("booking_button")}
                </button>
              </div>
            </div>
            <div className="hero-image">
              <Image
                src="/roller.webp"
                alt="Elektromos roller szerviz Debrecen – RoliSzerviz műhely, elektromos roller javítás Debrecenben"
                width={500}
                height={300}
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 900px) {
          .hero {
            margin-top: 62px !important;
          }
        }
        html, body {
          overflow-x: hidden !important;
          max-width: 100vw !important;
        }
      `}</style>

      <section ref={servicesRef} className="section-fade"><ServiceCards /></section>
      <section ref={whyusRef} className="section-fade"><WhyUs /></section>
      <style>{`
        @media (max-width: 700px) {
          .section-fade {
            display: flex !important;
            flex-direction: column !important;
          }
          .service-cards, .whyus-cards, .testimonials-cards {
            flex-direction: column !important;
            gap: 1.1rem !important;
          }
          .whyus-cards, .testimonials-cards {
            margin-left: 20px !important;
            margin-right: 20px !important;
          }
        }
      `}</style>

      {/* Floating navigation buttons */}
      {/* The old floating navigation buttons have been removed */}

      {/* Mobil CTA sáv */}
      <div className="mobile-cta-bar" style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100vw',
        background: 'linear-gradient(90deg, #f47b20 80%, #ffb86c 100%)',
        boxShadow: '0 -2px 16px rgba(0,0,0,0.13)',
        zIndex: 100,
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.7rem 0.5rem',
      }}>
        <button
          className="btn btn-primary"
          style={{
            background: '#fff',
            color: '#f47b20',
            fontWeight: 700,
            fontSize: '1.1rem',
            borderRadius: '2rem',
            boxShadow: '0 2px 8px rgba(244,123,32,0.10)',
            padding: '0.7rem 2.2rem',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={openBookingModal}
        >
          {t("booking_button")}
        </button>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .mobile-cta-bar {
            display: flex !important;
          }
        }
      `}</style>

      <section id="testimonials" ref={testimonialsRef}>
        <div className="section-fade"><Testimonials /></div>
      </section>

      {/* Video Section */}
      <section className="video-section" id="youtube" ref={youtubeRef}>
        <div className="section-fade">
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
      <div id="booking">
        <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
      </div>

      <section ref={issuesRef} className="faq-section" id="issues" style={{ background: '#181818', color: '#fff', padding: '2.5rem 0 0 0', margin: '0', borderRadius: '0.5rem 0.5rem 0 0', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', maxWidth: '100vw' }}>
        <div className="section-fade"><CommonIssues /></div>
      </section>
      <section ref={faqRef} className="faq-section" id="faq" style={{ background: '#181818', color: '#fff', padding: '2.5rem 0 2.5rem 0', margin: '0', borderRadius: '0 0 0.5rem 0.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', maxWidth: '100vw', marginTop: '0' }}>
        <div className="section-fade container" style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 700 }}>{t('faq_section_title')}</h2>
          <FAQ openPriceModal={openPriceModal} />
        </div>
      </section>
      <ContactSection ref={contactSectionRef} />
      </main>
    </>
  );
}

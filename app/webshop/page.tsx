"use client"; // Required for useTranslation

import Link from "next/link";
import Head from "next/head";
import { useTranslation } from "../../contexts/TranslationContext"; // Adjusted path

export default function WebshopPage() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <link rel="canonical" href="https://roliszerviz.hu/webshop" />
      </Head>
      <header className="header">
        <div className="container">
          <div className="logo" style={{ textAlign: 'center', width: '100%' }}>{t("ROLI SZERVIZ")}</div>
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
      <style>{`
        @media (max-width: 700px) {
          main {
            width: 100vw !important;
            margin: 0 !important;
            max-width: 100vw !important;
            background: transparent !important;
          }
          .container {
            margin-left: 20px !important;
            margin-right: 20px !important;
            width: auto !important;
            max-width: calc(100vw - 40px) !important;
            box-sizing: border-box;
          }
        }
        @media (min-width: 701px) {
          html, body {
            overflow-x: hidden !important;
          }
        }
      `}</style>
    </>
  );
}

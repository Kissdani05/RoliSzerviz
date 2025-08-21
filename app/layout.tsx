import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TranslationProvider } from "../contexts/TranslationContext";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elektromos roller szerviz Debrecen – RoliSzerviz | Roller javítás, e-roller szerviz, háztól-házig szállítás",
  description: "Elektromos roller és e-bike szerviz Debrecenben, háztól-házig szállítással. Gyors javítás, garanciával, időpontfoglalás online.",
  keywords: [
    "roller szervíz debrecen",
    "elektromos roller szerviz debrecen",
    "debrecen roller szervíz",
    "roller szerviz debrecen",
    "elektromos roller debrecen",
    "roller debrecen",
    "elektromos roller szervíz",
    "roller szervíz",
    "roller bolt debrecen",
    "debrecen elektromos roller",
    "elektromos roller szervíz debrecen",
    "roller szerviz",
    "debrecen roller",
    "debrecen roller szerviz",
    "kerékpár szerviz debrecen",
    "xiaomi roller szerviz debrecen",
    "ninebot roller szerviz debrecen"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <head>
        <link rel="icon" href="/roller.webp" type="image/webp" />
  <link rel="canonical" href="https://roliszerviz.hu/" />
  <link rel="alternate" hrefLang="hu" href="https://roliszerviz.hu/" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="Elektromos roller szerviz Debrecenben, háztól-házig szállítással. Gyors javítás, időpontfoglalás online." />
        <meta property="og:title" content="Elektromos roller szerviz Debrecen – RoliSzerviz" />
        <meta property="og:description" content="Gyors, elektromos roller szerviz Debrecenben, háztól-házig szállítással. Időpontfoglalás online!" />
        <meta property="og:image" content="https://roliszerviz.hu/roller.webp" />
        <meta property="og:url" content="https://roliszerviz.hu/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RoliSzerviz" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Elektromos roller szerviz Debrecen – RoliSzerviz" />
        <meta name="twitter:description" content="Gyors, garanciális elektromos roller szerviz Debrecenben, háztól-házig szállítással. Időpontfoglalás online!" />
        <meta name="twitter:image" content="https://roliszerviz.hu/roller.webp" />
        <script type="application/ld+json" suppressHydrationWarning>{`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "RoliSzerviz",
            "image": "https://roliszerviz.hu/roller.webp",
            "@id": "https://roliszerviz.hu/",
            "url": "https://roliszerviz.hu/",
            "telephone": "+36-30-254-2292",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Debrecen",
              "addressCountry": "HU"
            },
            "serviceArea": "Debrecen és környéke",
            "description": "Elektromos roller és kerékpár szerviz Debrecenben, háztól házig szolgáltatással.",
            "openingHours": "Mo-Sa 09:00-18:00"
          }
        `}</script>
        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NRMQFDNNR4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NRMQFDNNR4');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TranslationProvider>{children}</TranslationProvider>
        <Analytics />
      </body>
    </html>
  );
}

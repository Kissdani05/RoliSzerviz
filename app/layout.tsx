import type { Metadata } from "next";
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
  title: "RoliSzerviz – Elektromos roller szerviz Debrecen | Roller szerviz, elektromos roller javítás",
  description: "Professzionális elektromos roller szerviz Debrecenben. Gyors, megbízható javítás háztól házig szállítással.",
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
    "electric scooter repair near me",
    "debrecen roller szerviz"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TranslationProvider>{children}</TranslationProvider>
        <Analytics />
      </body>
    </html>
  );
}

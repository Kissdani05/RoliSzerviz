import type { Metadata } from "next";

// page.tsx here is a client component, so it can't export its own metadata —
// without this layout it silently inherited the homepage's title/description
// verbatim, which is what showed up under the "Webshop" sitelink.
export const metadata: Metadata = {
  title: "Webshop – Hamarosan | RoliSzerviz",
  description:
    "A RoliSzerviz webshopja hamarosan elérhető lesz. Addig is keresd fel elektromos roller és e-bike szervizünket Debrecenben.",
  alternates: {
    canonical: "https://roliszerviz.hu/webshop",
  },
  openGraph: {
    title: "Webshop – Hamarosan | RoliSzerviz",
    description: "A RoliSzerviz webshopja hamarosan elérhető lesz.",
    url: "https://roliszerviz.hu/webshop",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

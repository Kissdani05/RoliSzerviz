import type { Metadata } from "next";

// This route is a paid-ad landing page — a near-duplicate of the homepage
// with the same inherited title/description. It exists for campaign traffic,
// not organic search, so keep it out of Google's index to avoid duplicate
// content diluting the main roliszerviz.hu listing.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

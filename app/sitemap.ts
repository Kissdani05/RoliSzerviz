import type { MetadataRoute } from "next";

// robots.txt (public/robots.txt) points crawlers at /sitemap.xml, but no
// route generated that file — Search Console was fetching a 404. Next's
// App Router turns this into a real /sitemap.xml at build/request time.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://roliszerviz.hu";
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/webshop`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

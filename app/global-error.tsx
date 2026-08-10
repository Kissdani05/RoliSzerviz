"use client";

import { useEffect } from "react";

// Catches errors thrown inside the root layout itself. Next.js requires this
// component to render its own <html>/<body> because it fully replaces the
// root layout when triggered — without it, a crash here fell back to the
// generic "Application error: a client-side exception has occurred" page
// with no title/description, which is what search engines were indexing.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="hu">
      <head>
        <title>Átmeneti hiba – RoliSzerviz</title>
        <meta name="robots" content="noindex" />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "3rem 1.5rem",
          color: "#fff",
          background: "#0e0e0e",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1 style={{ color: "#f47b20", fontSize: "1.8rem", marginBottom: "1rem" }}>
          Átmeneti hiba történt
        </h1>
        <p style={{ maxWidth: 480, marginBottom: "2rem", color: "#ccc" }}>
          Elnézést a kellemetlenségért. Kérjük, próbáld meg újratölteni az
          oldalt. Ha a hiba továbbra is fennáll, keress minket telefonon:
          {" "}
          <a href="tel:+36302542292" style={{ color: "#f47b20" }}>
            +36 30 254 2292
          </a>
          .
        </p>
        <button
          onClick={() => reset()}
          style={{
            background: "#f47b20",
            color: "#fff",
            border: "none",
            borderRadius: "2rem",
            padding: "0.7rem 1.6rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Újrapróbálkozás
        </button>
      </body>
    </html>
  );
}

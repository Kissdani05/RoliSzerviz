"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error so it shows up in Vercel/monitoring instead of silently failing.
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "3rem 1.5rem",
        color: "#fff",
        background: "#0e0e0e",
      }}
    >
      <h1 style={{ color: "#f47b20", fontSize: "1.8rem", marginBottom: "1rem" }}>
        Váratlan hiba történt
      </h1>
      <p style={{ maxWidth: 480, marginBottom: "2rem", color: "#ccc" }}>
        Elnézést a kellemetlenségért. Az oldal betöltése közben hiba lépett fel.
        Próbáld meg újratölteni az oldalt, vagy térj vissza a főoldalra.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
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
        <Link
          href="/"
          style={{
            background: "#fff",
            color: "#f47b20",
            borderRadius: "2rem",
            padding: "0.7rem 1.6rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Vissza a főoldalra
        </Link>
      </div>
    </div>
  );
}

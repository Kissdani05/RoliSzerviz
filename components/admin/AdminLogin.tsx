"use client";

import React, { useState } from "react";
import { adminFetch, errorMessage } from "./adminApi";

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await adminFetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      window.location.reload();
    } catch (loginError) {
      setError(errorMessage(loginError));
      setIsSubmitting(false);
    }
  };

  return (
    <main className="adm adm-login">
      <form className="adm-card adm-login-card" onSubmit={handleSubmit}>
        <h1 className="adm-login-brand">ROLISZERVIZ</h1>
        <p className="adm-muted">Admin felület</p>
        <label className="adm-field">
          <span>Jelszó</span>
          <input
            className="adm-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            autoFocus
            required
          />
        </label>
        {error && <p className="adm-error" role="alert">{error}</p>}
        <button className="adm-btn adm-btn-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Belépés..." : "Belépés"}
        </button>
      </form>
    </main>
  );
};

export default AdminLogin;

"use client"; // Add this for useState and useEffect

import React, { useState, useEffect } from "react";
import { useTranslation } from "../contexts/TranslationContext";

interface PriceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PriceModal: React.FC<PriceModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [isRendered, setIsRendered] = useState(isOpen);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      // Timeout to allow the modal to be in the DOM before adding 'show' class for transition
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false); // Start fade-out animation
      // Timeout to allow fade-out animation to complete before unmounting
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300); // Should match the CSS transition duration for opacity
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${showContent ? "show" : ""}`}
      style={{ display: "flex" }} // Ensure modal is part of layout for animation
      onClick={handleBackdropClick}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{t("Árlista")}</h2>
        <div className="price-table">
          <div className="price-item">
            <h3>{t("Gumiszerelés, defektfajítás")}</h3>
            <p>{t("(anyagdíjat nem tartalmaz)")}</p>
            <span className="price">6.000 {t("Ft")}–{t("-tól")}</span>
          </div>
          <div className="price-item">
            <h3>{t("Fék beállítás, szerelés, légtelenítés")}</h3>
            <p>{t("(anyagdíjat nem tartalmaz)")}</p>
            <span className="price">4.000 {t("Ft")}–{t("-tól")}</span>
          </div>
          <div className="price-item">
            <h3>{t("Karbantartás")}</h3>
            <p>
              {t(
                "(átvizsgálás, csavarok meghúzása, zsírozás, fék beállítás bovdenek ellenőrzése , stb, anyagdíjat nem tartalmaz)"
              )}
            </p>
            <span className="price">6.000 {t("Ft")}–{t("-tól")}</span>
          </div>
          <div className="price-item">
            <h3>{t("Elektromos hibafeltárás, javítás")}</h3>
            <p>{t("(anyagdíjat nem tartalmaz)")}</p>
            <span className="price">5.000 {t("Ft")}-{t("-tól")}</span>
          </div>
          <div className="price-item">
            <h3>{t("Csuklószerkezet javítás")}</h3>
            <p>{t("(anyagdíjat nem tartalmaz)")}</p>
            <span className="price">6.000 {t("Ft")}-{t("-tól")}</span>
          </div>
          <div className="price-item">
            <h3>{t("Csapágycsere")}</h3>
            <p>{t("kerekenként, (anyagdíjat nem tartalmaz)")}</p>
            <span className="price">6.000 {t("Ft")}-{t("-tól")}</span>
          </div>
          <div className="price-item">
            <h3>{t("Gumi defektmentesítés, defektmentesítő folyadékkal")}</h3>
            <p>{t("kerekenként (8″ – 29″-os kerékig)")}</p>
            <span className="price">3.000 {t("Ft")}–6.000 {t("Ft")}{t("-ig")}</span>
          </div>
          <div className="price-item">
            <h3>{t("Alkatrész csere, egyéb javítás óradíj")}</h3>
            <p>{t("(anyagdíjat nem tartalmaz)")}</p>
            <span className="price">6.000 {t("Ft")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceModal;

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
          <div className="price-item" style={{background: '#ff9100'}}><b>{t("price_home_service")}</b> {t("price_home_service_value")}</div>
          <div className="price-item"><b>{t("price_tire_repair")}</b> <span style={{background:'#ff9100',color:'#222',padding:'2px 8px',borderRadius:'6px',fontWeight:600}}>{t("price_tire_repair_value")}</span> <span style={{fontSize:'0.97em'}}>{t("price_tire_repair_note")}</span></div>
          <div className="price-item"><b>{t("price_brake_adjust")}</b> <span style={{background:'#ff9100',color:'#222',padding:'2px 8px',borderRadius:'6px',fontWeight:600}}>{t("price_brake_adjust_value")}</span> <span style={{fontSize:'0.97em'}}>{t("price_brake_adjust_note")}</span></div>
          <div className="price-item"><b>{t("price_full_maintenance")}</b> <span style={{background:'#ff9100',color:'#222',padding:'2px 8px',borderRadius:'6px',fontWeight:600}}>{t("price_full_maintenance_value")}</span><br/>
            <span style={{fontSize:'0.97em'}}>{t("price_full_maintenance_note")}</span>
          </div>
          <div className="price-item"><b>{t("price_inspection")}</b> <span style={{background:'#ff9100',color:'#222',padding:'2px 8px',borderRadius:'6px',fontWeight:600}}>{t("price_inspection_value")}</span><br/>
            <span style={{fontSize:'0.97em'}}>{t("price_inspection_note")}</span>
          </div>
          <div className="price-item"><b>{t("price_electrical")}</b> <span style={{background:'#ff9100',color:'#222',padding:'2px 8px',borderRadius:'6px',fontWeight:600}}>{t("price_electrical_value")}</span> <span style={{fontSize:'0.97em'}}>{t("price_electrical_note")}</span></div>
          <div className="price-item"><b>{t("price_folding")}</b> <span style={{background:'#ff9100',color:'#222',padding:'2px 8px',borderRadius:'6px',fontWeight:600}}>{t("price_folding_value")}</span> <span style={{fontSize:'0.97em'}}>{t("price_folding_note")}</span></div>
          <div className="price-item"><b>{t("price_bearing")}</b> <span style={{background:'#ff9100',color:'#222',padding:'2px 8px',borderRadius:'6px',fontWeight:600}}>{t("price_bearing_value")}</span> <span style={{fontSize:'0.97em'}}>{t("price_bearing_note")}</span></div>
          <div className="price-item"><b>{t("price_tire_sealant")}</b> <span style={{background:'#ff9100',color:'#222',padding:'2px 8px',borderRadius:'6px',fontWeight:600}}>{t("price_tire_sealant_value")}</span></div>
          <div className="price-item"><b>{t("price_parts")}</b> <span style={{background:'#ff9100',color:'#222',padding:'2px 8px',borderRadius:'6px',fontWeight:600}}>{t("price_parts_value")}</span> <span style={{fontSize:'0.97em'}}>{t("price_parts_note")}</span></div>
        </div>
        <div style={{marginTop: '0.5rem', fontSize: '1.01em', color: '#111'}}>
          {t("price_note")}
        </div>
      </div>
    </div>
  );
};
<style jsx>{`
  @media (max-width: 767px) {
    .modal-content, .price-table, .price-item, .price, h3, p {
      word-break: break-word !important;
      overflow-wrap: anywhere !important;
      white-space: normal !important;
      max-width: 100vw !important;
    }
  }
`}</style>
export default PriceModal;

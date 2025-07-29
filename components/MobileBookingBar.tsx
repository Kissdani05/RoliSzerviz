import React from "react";
import { useTranslation } from "../contexts/TranslationContext";

const MobileBookingBar = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();
  return (
    <div style={{
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      background: "#fff",
      boxShadow: "0 -2px 12px rgba(0,0,0,0.08)",
      padding: "0.7rem 1.2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <button
        type="button"
        style={{
          background: "#f47b20",
          color: "#fff",
          fontWeight: 600,
          fontSize: "1.08rem",
          borderRadius: "2rem",
          border: "none",
          padding: "0.7rem 2.2rem",
          boxShadow: "0 2px 8px rgba(244,123,32,0.12)",
          cursor: "pointer",
          outline: "none",
          whiteSpace: "nowrap"
        }}
        onClick={onClick}
      >
        {t("booking_button")}
      </button>
    </div>
  );
};

export default MobileBookingBar;

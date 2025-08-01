import React from "react";

import { useTranslation } from "../contexts/TranslationContext";

interface BookingNotificationProps {
  message?: string;
  type: "success" | "error";
  onClose: () => void;
  mobile?: boolean;
}

const BookingNotification: React.FC<BookingNotificationProps> = ({ message, type, onClose, mobile }) => {
  const { t } = useTranslation();
  let displayMessage = message;
  if (!message) {
    if (type === "success") {
      displayMessage = t("booking_success_notification");
    } else {
      displayMessage = t("booking_error_notification");
    }
  }
  return (
    <div
      className={`booking-notification ${type} ${mobile ? "mobile" : "desktop"}`}
      style={{
        position: "fixed",
        zIndex: 3000,
        right: mobile ? undefined : 24,
        top: mobile ? undefined : 82,
        left: mobile ? 0 : undefined,
        bottom: mobile ? 62 : undefined,
        width: mobile ? "100vw" : "auto",
        maxWidth: mobile ? "100vw" : 340,
        background: type === "success" ? "#e6fff2" : "#ffe6e6",
        color: type === "success" ? "#1a7f37" : "#c00",
        boxShadow: "0 2px 16px rgba(0,0,0,0.13)",
        borderRadius: mobile ? "0 0 1rem 1rem" : "0.7rem",
        padding: mobile ? "1.1rem 1.2rem" : "0.9rem 1.2rem 0.9rem 1.2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontWeight: 600,
        fontSize: mobile ? "1.08rem" : "1.02rem",
      }}
    >
      <span style={{ flex: 1 }}>{displayMessage}</span>
      <button
        aria-label="Értesítés bezárása"
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: type === "success" ? "#1a7f37" : "#c00",
          fontSize: "1.5rem",
          fontWeight: 700,
          marginLeft: "1.2rem",
          cursor: "pointer",
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default BookingNotification;

import React from "react";

interface BookingToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const BookingToast: React.FC<BookingToastProps> = ({ message, type, onClose }) => {
  return (
    <div className={`booking-toast ${type}`}> 
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Bezárás">&times;</button>
      <style jsx>{`
        .booking-toast {
          position: fixed;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          min-width: 220px;
          max-width: 90vw;
          background: #fff;
          color: #181818;
          border-radius: 1rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.13);
          padding: 1rem 2.2rem 1rem 1.2rem;
          font-size: 1.08rem;
          font-weight: 600;
          z-index: 99999;
          display: flex;
          align-items: center;
          gap: 1.2rem;
          animation: fadeInToast 0.3s;
        }
        .booking-toast.success {
          border-left: 6px solid #4BB543;
        }
        .booking-toast.error {
          border-left: 6px solid #e74c3c;
        }
        .toast-message {
          flex: 1;
        }
        .toast-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #888;
          cursor: pointer;
          margin-left: 1rem;
        }
        @keyframes fadeInToast {
          from { opacity: 0; transform: translateY(40px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default BookingToast;

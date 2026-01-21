"use client";

import React, { createContext, useContext, useState } from "react";

interface BookingNotificationContextType {
  notification: { message: string; type: "success" | "error" } | null;
  setNotification: (n: { message: string; type: "success" | "error" } | null) => void;
}

const BookingNotificationContext = createContext<BookingNotificationContextType | undefined>(undefined);

export const BookingNotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  return (
    <BookingNotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </BookingNotificationContext.Provider>
  );
};

export const useBookingNotification = () => {
  const context = useContext(BookingNotificationContext);
  if (!context) {
    throw new Error("useBookingNotification must be used within BookingNotificationProvider");
  }
  return context;
};

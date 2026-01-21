"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Home from "../page";
import BookingModal from "@/components/BookingModal";
import { useBookingNotification } from "@/contexts/BookingNotificationContext";

export default function BookingPage() {
  const router = useRouter();
  const { setNotification } = useBookingNotification();
  const [canGoBack, setCanGoBack] = useState(false);

  // Check if we can go back to previous page
  useEffect(() => {
    // If history length > 1, we have a previous page
    if (typeof window !== "undefined" && window.history.length > 1) {
      setCanGoBack(true);
    }
  }, []);

  const handleClose = () => {
    if (canGoBack) {
      router.back();
    } else {
      // If no history, redirect to home
      router.push("/");
    }
  };

  const handleBookingNotification = (n: { message: string; type: "success" | "error" }) => {
    setNotification(n);
    // After 500ms, close the modal
    setTimeout(() => {
      handleClose();
    }, 500);
  };

  return (
    <>
      <Home />
      <BookingModal 
        isOpen={true} 
        onClose={handleClose}
        setNotification={handleBookingNotification}
      />
    </>
  );
}

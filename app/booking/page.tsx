"use client";

import { useRouter } from "next/navigation";
import Home from "../page";
import BookingModal from "@/components/BookingModal";
import { useBookingNotification } from "@/contexts/BookingNotificationContext";

export default function BookingPage() {
  const router = useRouter();
  const { setNotification } = useBookingNotification();

  const handleBookingNotification = (n: { message: string; type: "success" | "error" }) => {
    setNotification(n);
    // After 500ms, close the modal
    setTimeout(() => {
      router.back();
    }, 500);
  };

  return (
    <>
      <Home />
      <BookingModal 
        isOpen={true} 
        onClose={() => router.back()}
        setNotification={handleBookingNotification}
      />
    </>
  );
}

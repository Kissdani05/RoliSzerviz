"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Home from "../page";
import BookingModal from "@/components/BookingModal";
import BookingNotification from "@/components/BookingNotification";

export default function BookingPage() {
  const router = useRouter();
  const [bookingNotification, setBookingNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  return (
    <>
      <Home />
      <BookingModal 
        isOpen={true} 
        onClose={() => router.back()}
        setNotification={setBookingNotification}
      />
      {bookingNotification && (
        <BookingNotification
          message={bookingNotification.message}
          type={bookingNotification.type}
          onClose={() => setBookingNotification(null)}
        />
      )}
    </>
  );
}

"use client";

import { useRouter } from "next/navigation";
import Home from "../page";
import BookingModal from "@/components/BookingModal";

export default function BookingPage() {
  const router = useRouter();

  return (
    <>
      <Home />
      <BookingModal 
        isOpen={true} 
        onClose={() => router.back()}
      />
    </>
  );
}

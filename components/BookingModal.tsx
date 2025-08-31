// filepath: /Users/ezy/Projects/Others/dani/next-roliszerviz/components/BookingModal.tsx
"use client"; // Add this for useState and useEffect

import React, { useState, useEffect, useRef } from "react";
// BookingToast import removed
import { useTranslation } from "../contexts/TranslationContext";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  setNotification?: (n: { message: string; type: "success" | "error" }) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, setNotification }) => {
  const { t } = useTranslation();
  const [isRendered, setIsRendered] = useState(isOpen);
  const [showContent, setShowContent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    email: "",
    phone: "",
    postalCode: "",
    shippingAddress: "",
    differentBilling: false,
    billingPostalCode: "",
    billingAddress: "",
    billingCity: "",
    services: [] as string[],
    bookingDate: "",
    bookingFrom: "",
    bookingTo: "",
    message: "",
    otherService: "",
  });

  const [showOtherServiceInput, setShowOtherServiceInput] = useState(false);
  const [showBillingAddressInput, setShowBillingAddressInput] = useState(false);
  const [availableFromHours, setAvailableFromHours] = useState<number[]>([]);
  const [availableToHours, setAvailableToHours] = useState<number[]>([]);
  const phoneLinkRef = useRef<HTMLAnchorElement>(null);

  // Toast logic removed

  const updateToHours = React.useCallback((selectedFrom: number) => {
    const toHours: number[] = [];
    if (!isNaN(selectedFrom)) {
      for (let h = selectedFrom + 1; h <= 17; h++) {
        toHours.push(h);
      }
    }
    setAvailableToHours(toHours);
    if (toHours.length > 0) {
      setFormData((prev) => ({ ...prev, bookingTo: toHours[0].toString() }));
    } else {
      setFormData((prev) => ({ ...prev, bookingTo: "" }));
    }
  }, []);

  const updateAvailableHours = React.useCallback((date: string) => {
    const now = new Date();
    const isToday = now.toISOString().split("T")[0] === date;
    const currentHour = now.getHours();
    const fromHours: number[] = [];
    for (let h = 9; h <= 16; h++) {
      if (isToday && h <= currentHour) continue;
      fromHours.push(h);
    }
    setAvailableFromHours(fromHours);
    if (fromHours.length > 0) {
      setFormData((prev) => ({
        ...prev,
        bookingFrom: fromHours[0].toString(),
      }));
      updateToHours(fromHours[0]);
    } else {
      setFormData((prev) => ({ ...prev, bookingFrom: "", bookingTo: "" }));
      setAvailableToHours([]);
    }
  }, [updateToHours]);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 10);

      // Initialize date and time when modal opens
      const now = new Date();
      const currentHour = now.getHours();
      const currentDate = now.toISOString().split("T")[0];
      let minDate = currentDate;
      if (currentHour >= 16) {
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        minDate = tomorrow.toISOString().split("T")[0];
      }
      setFormData((prev) => ({ ...prev, bookingDate: minDate }));
      updateAvailableHours(minDate);

      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, updateAvailableHours]);

  // Flash the phone number twice when modal opens
  useEffect(() => {
    if (isOpen && showContent && phoneLinkRef.current) {
      const el = phoneLinkRef.current;
      // Reset animation by toggling the class
      el.classList.remove('flash');
      // Force reflow to restart animation reliably
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      void el.offsetWidth;
      el.classList.add('flash');
      // Clean up class after animation ends (0.8s x 2 = 1.6s)
      const endTimer = setTimeout(() => {
        el.classList.remove('flash');
      }, 1700);
      return () => clearTimeout(endTimer);
    }
  }, [isOpen, showContent]);

  // Ensure these useEffects also run when isOpen changes and formData.bookingDate is set
  useEffect(() => {
    if (isOpen && formData.bookingDate) {
      updateAvailableHours(formData.bookingDate);
    }
  }, [isOpen, formData.bookingDate, updateAvailableHours]);

  useEffect(() => {
    if (isOpen && formData.bookingFrom) {
      updateToHours(parseInt(formData.bookingFrom));
    }
  }, [isOpen, formData.bookingFrom, updateToHours]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === "differentBilling") {
        setShowBillingAddressInput(checked);
        setFormData((prev) => ({
          ...prev,
          differentBilling: checked,
          billingPostalCode: checked ? prev.billingPostalCode : "",
          billingAddress: checked ? prev.billingAddress : "",
          billingCity: checked ? prev.billingCity : "",
        }));
      } else if (name === "services") {
        const serviceValue = (e.target as HTMLInputElement).value;
        setFormData((prev) => ({
          ...prev,
          services: checked
            ? [...prev.services, serviceValue]
            : prev.services.filter((service) => service !== serviceValue),
        }));
        if (serviceValue === "Egyéb") {
          setShowOtherServiceInput(checked);
          if (!checked) {
            setFormData((prev) => ({ ...prev, otherService: "" }));
          }
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      postalCode,
      shippingAddress,
      differentBilling,
      billingPostalCode,
      billingAddress,
      billingCity,
      services,
      bookingDate,
      bookingFrom,
      bookingTo,
      message,
      otherService,
    } = formData;

    const fromHour = parseInt(bookingFrom);
    const toHour = parseInt(bookingTo);

    if (isNaN(fromHour) || isNaN(toHour) || toHour <= fromHour) {
      alert("Kérjük, válasszon legalább 1 órás időtartamot (pl. 10:00 - 11:00)!");
      return;
    }

    if (services.length === 0) {
      alert("Kérjük, válasszon legalább egy szolgáltatást!");
      return;
    }

    if (services.includes("Egyéb") && !otherService) {
      alert("Kérjük, írja le, milyen szolgáltatásra van szüksége!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Kérjük, érvényes email címet adjon meg!");
      return;
    }

    const phoneRegex = /^(\+36|06)[0-9]{1,2}[0-9]{3,4}[0-9]{3,4}$/;
    if (!phoneRegex.test(phone)) {
      alert("Kérjük, érvényes magyar telefonszámot adjon meg!");
      return;
    }

    const postalCodeRegex = /^[0-9]{4}$/;
    if (!postalCodeRegex.test(postalCode)) {
      alert("Kérjük, érvényes irányítószámot adjon meg!");
      return;
    }

    if (differentBilling && !postalCodeRegex.test(billingPostalCode)) {
      alert("Kérjük, érvényes számlázási irányítószámot adjon meg!");
      return;
    }

    const selectedServices = services.map((service) =>
      service === "Egyéb" ? `Egyéb: ${otherService}` : service
    );

    const timeRange = `${bookingFrom}:00 - ${bookingTo}:00`;

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          city: formData.city,
          email,
          phone,
          postalCode,
          shippingAddress,
          differentBilling,
          billingPostalCode,
          billingAddress,
          billingCity,
          services: selectedServices,
          date: bookingDate,
          time: timeRange,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification?.({ message: "", type: "success" });
        onClose();
        setFormData({
          name: "",
          city: "",
          email: "",
          phone: "",
          postalCode: "",
          shippingAddress: "",
          differentBilling: false,
          billingPostalCode: "",
          billingAddress: "",
          billingCity: "",
          services: [],
          bookingDate: "",
          bookingFrom: "",
          bookingTo: "",
          message: "",
          otherService: "",
        });
        setShowOtherServiceInput(false);
        setShowBillingAddressInput(false);
      } else {
        setNotification?.({ message: data.error || "", type: "error" });
      }
    } catch (error) {
      console.error("Hiba:", error);
      setNotification?.({ message: "", type: "error" });
    }
  };

  if (!isRendered) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* BookingToast removed: no popup for booking success/failure */}
      <div
        className={`modal ${showContent ? "show" : ""}`}
        style={{ display: "flex" }}
        onClick={handleBackdropClick}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2 style={{ marginTop: 32 }}>{t("Időpontfoglalás")}</h2>
          {/* Intro note under H2 */}
          <div className="booking-intro" style={{ textAlign: 'center', marginTop: 6 }}>
            <div className="booking-intro-card">
              <p className="booking-intro-main">{t("choose_any_booking_option")}</p>
              <small className="booking-intro-sub">({t("no_walkin_notice")})</small>
            </div>
          </div>
          {/* Centered Phone and Messenger, same width */}
          <div className="contact-cta" style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 12 }}>
            <div className="contact-cta-wrap" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', width: 'fit-content', gap: 8 }}>
              <a
                href="tel:+36302542292"
                className="phone-link"
                ref={phoneLinkRef}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#f47b20', textDecoration: 'none', fontWeight: 600, fontSize: '1.08rem', border: '2px solid #f47b20', borderRadius: 10, padding: '6px 12px' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 2 }}>
                  <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.23.72 3.28a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c1.05.35 2.15.59 3.28.72a2 2 0 0 1 1.72 2z" stroke="#f47b20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                +36 30 254 2292
              </a>
              <a
                href="https://m.me/Roliszerviz.huDebrecen/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Messenger üzenet küldése"
                className="messenger-link"
                style={{ width: '100%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: 8, color: '#0084FF', textDecoration: 'none', fontWeight: 600, border: '2px solid #0084FF', borderRadius: 10, padding: '6px 12px' }}
              >
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#0084FF"/>
                  <g>
                    <g transform="translate(-0.5,-1.5)">
                      <path d="M23 12c-1.5-1.5-3.5-2.5-7-2.5-5 0-8.5 3.7-8.5 8.2 0 2.5 1 4.5 2.7 6l-0.6 2.2c-0.1 0.4 0.3 0.8 0.7 0.7l2.3-0.7c1.2 0.3 2.4 0.5 3.7 0.5 5 0 8.5-3.7 8.5-8.2 0-2.1-0.8-4-2.3-5.2z" fill="#fff"/>
                      <g transform="translate(-1.2,1.2)">
                        <path d="M13.5 19.5l2.2-3.7c0.2-0.3 0.6-0.4 0.9-0.2l2.1 1.3c0.2 0.1 0.5 0.1 0.7-0.1l2.7-2.2c0.3 0.2 0.7 0.1 0.6 0.5l-2.2 3.7c-0.2 0.3-0.6 0.4-0.9 0.2l-2.1-1.3c-0.2 0.1-0.5 0.1-0.7 0.1l-2.7 2.2c-0.3 0.2-0.7-0.1-0.6-0.5z" fill="#39B1FF"/>
                      </g>
                    </g>
                  </g>
                </svg>
                <span>{t("Messenger")}</span>
              </a>
            </div>
          </div>
          <style>{`
            @keyframes phoneFlash {
              0% { box-shadow: 0 0 0 0 rgba(244,123,32,0); transform: scale(1); }
              50% { box-shadow: 0 0 0 8px rgba(244,123,32,0.18); transform: scale(1.015); }
              100% { box-shadow: 0 0 0 0 rgba(244,123,32,0); transform: scale(1); }
            }
            .phone-link.flash {
              animation: phoneFlash 0.8s ease-in-out 2;
              border-color: #f47b20;
            }

            .booking-intro-card {
              position: relative;
              border: 2px solid rgba(244,123,32,0.22);
              background: linear-gradient(0deg, rgba(244,123,32,0.05), rgba(244,123,32,0.05));
              border-radius: 12px;
              padding: 12px 14px;
              max-width: 720px;
              margin: 8px auto 10px;
            }
            .booking-intro-card::before {
              content: "";
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              width: 4px;
              background: #f47b20;
              border-radius: 12px 0 0 12px;
            }
            .booking-intro-main {
              margin: 4px 0 2px;
              font-weight: 600;
              color: #1a1a1a;
            }
            .booking-intro-sub {
              color: #555;
            }
            @media (max-width: 600px) {
              .booking-intro-card {
                padding: 10px 12px;
                margin: 8px 12px 10px;
              }
              .booking-intro-main {
                font-size: 0.98rem;
              }
            }
          `}</style>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t("Név")}<span style={{color: 'var(--primary-color)', marginLeft: 4}}>*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">{t("Email cím")}<span style={{color: 'var(--primary-color)', marginLeft: 4}}>*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">{t("Telefonszám")}<span style={{color: 'var(--primary-color)', marginLeft: 4}}>*</span></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">{t("Város")}<span style={{color: 'var(--primary-color)', marginLeft: 4}}>*</span></label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">{t("Irányítószám")}<span style={{color: 'var(--primary-color)', marginLeft: 4}}>*</span></label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                pattern="[0-9]{4}"
                maxLength={4}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="shippingAddress">{t("Szállítási cím")}<span style={{color: 'var(--primary-color)', marginLeft: 4}}>*</span></label>
              <input
                type="text"
                id="shippingAddress"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="differentBilling"
                  name="differentBilling"
                  checked={formData.differentBilling}
                  onChange={handleChange}
                />
                <label htmlFor="differentBilling">
                  {t("Számlázási cím eltér a szállítási címtől")}
                </label>
              </div>
            </div>
            {showBillingAddressInput && (
              <div className="billing-address-group">
                <div className="form-group">
                  <label htmlFor="billingPostalCode">
                    {t("Számlázási irányítószám")}
                  </label>
                  <input
                    type="text"
                    id="billingPostalCode"
                    name="billingPostalCode"
                    value={formData.billingPostalCode}
                    onChange={handleChange}
                    pattern="[0-9]{4}"
                    maxLength={4}
                    required={formData.differentBilling}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="billingAddress">{t("Számlázási cím")}</label>
                  <input
                    type="text"
                    id="billingAddress"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    required={formData.differentBilling}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="billingCity">{t("Város")}</label>
                  <input
                    type="text"
                    id="billingCity"
                    name="billingCity"
                    value={formData.billingCity}
                    onChange={handleChange}
                    required={formData.differentBilling}
                  />
                </div>
              </div>
            )}
            <div className="form-group">
              <label>{t("Szolgáltatások")}</label>
              <div className="services-checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="service1"
                    name="services"
                    value="Gumiszerelés, defektfajítás"
                    checked={formData.services.includes("Gumiszerelés, defektfajítás")}
                    onChange={handleChange}
                  />
                  <label htmlFor="service1">{t("Gumiszerelés, defektfajítás")}</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="service2"
                    name="services"
                    value="Fék beállítás, szerelés, légtelenítés"
                    checked={formData.services.includes("Fék beállítás, szerelés, légtelenítés")}
                    onChange={handleChange}
                  />
                  <label htmlFor="service2">{t("Fék beállítás, szerelés, légtelenítés")}</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="service3"
                    name="services"
                    value="Karbantartás"
                    checked={formData.services.includes("Karbantartás")}
                    onChange={handleChange}
                  />
                  <label htmlFor="service3">{t("Karbantartás")}</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="service4"
                    name="services"
                    value="Elektromos hibafeltárás, javítás"
                    checked={formData.services.includes("Elektromos hibafeltárás, javítás")}
                    onChange={handleChange}
                  />
                  <label htmlFor="service4">{t("Elektromos hibafeltárás, javítás")}</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="service5"
                    name="services"
                    value="Csapágycsere"
                    checked={formData.services.includes("Csapágycsere")}
                    onChange={handleChange}
                  />
                  <label htmlFor="service5">{t("Csapágycsere")}</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="service6"
                    name="services"
                    value="Gumi defektmentesítés, defektmentesítő folyadékkal"
                    checked={formData.services.includes("Gumi defektmentesítés, defektmentesítő folyadékkal")}
                    onChange={handleChange}
                  />
                  <label htmlFor="service6">{t("Gumi defektmentesítés, defektmentesítő folyadékkal")}</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="service7"
                    name="services"
                    value="Alkatrész csere, egyéb javítás óradíj"
                    checked={formData.services.includes("Alkatrész csere, egyéb javítás óradíj")}
                    onChange={handleChange}
                  />
                  <label htmlFor="service7">{t("Alkatrész csere, egyéb javítás óradíj")}</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="service8"
                    name="services"
                    value="Egyéb"
                    className="other-checkbox"
                    checked={formData.services.includes("Egyéb")}
                    onChange={handleChange}
                  />
                  <label htmlFor="service8">{t("Egyéb")}</label>
                </div>
                {showOtherServiceInput && (
                  <div className="form-group other-service-group">
                    <label htmlFor="otherService">
                      {t("Kérjük, írja le, milyen szolgáltatásra van szüksége")}
                    </label>
                    <input
                      type="text"
                      id="otherService"
                      name="otherService"
                      value={formData.otherService}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="bookingDate">{t("Válassz napot")}</label>
              <input
                type="date"
                id="bookingDate"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                required
                min={(() => {
                  const now = new Date();
                  const year = now.getFullYear();
                  const month = (now.getMonth() + 1).toString().padStart(2, '0');
                  const day = now.getDate().toString().padStart(2, '0');
                  return `${year}-${month}-${day}`;
                })()}
                style={{ color: formData.bookingDate && new Date(formData.bookingDate) < new Date(new Date().toISOString().split('T')[0]) ? '#aaa' : undefined, background: formData.bookingDate && new Date(formData.bookingDate) < new Date(new Date().toISOString().split('T')[0]) ? '#eee' : undefined }}
              />
            </div>

            <div className="form-group">
              <label>{t("Időpont: -tól -ig")}</label>
              <div style={{ display: "flex", gap: "1rem" }}>
                <select
                  id="bookingFrom"
                  name="bookingFrom"
                  value={formData.bookingFrom}
                  onChange={handleChange}
                  required
                >
                  {availableFromHours.map((hour) => {
                    const isPast = formData.bookingDate === new Date().toISOString().split("T")[0] && hour <= new Date().getHours();
                    return (
                      <option
                        key={hour}
                        value={hour}
                        disabled={isPast}
                        style={isPast ? { color: '#aaa', background: '#eee' } : {}}
                      >
                        {hour}:00
                      </option>
                    );
                  })}
                </select>
                <select
                  id="bookingTo"
                  name="bookingTo"
                  value={formData.bookingTo}
                  onChange={handleChange}
                  required
                >
                  {availableToHours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}:00
                    </option>
                  ))}
                </select>
              </div>
              <small>
                {t("Csak 9:00 és 17:00 között lehet foglalni, minimum 1 óra")}
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="message">{t("Üzenet (opcionális)")}</label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              {t("booking_button")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;

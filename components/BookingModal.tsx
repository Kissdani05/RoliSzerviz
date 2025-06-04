// filepath: /Users/ezy/Projects/Others/dani/next-roliszerviz/components/BookingModal.tsx
"use client"; // Add this for useState and useEffect

import React, { useState, useEffect } from "react";
import { useTranslation } from "../contexts/TranslationContext";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
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
      alert(
        "Kérjük, válasszon legalább 1 órás időtartamot (pl. 10:00 - 11:00)!"
      );
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
          services: selectedServices,
          date: bookingDate,
          time: timeRange,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Köszönjük időpontfoglalását!");
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
        alert(data.error || "Hiba történt az időpontfoglalás során.");
      }
    } catch (error) {
      console.error("Hiba:", error);
      alert("Hiba történt az időpontfoglalás során.");
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
    <div
      className={`modal ${showContent ? "show" : ""}`}
      style={{ display: "flex" }}
      onClick={handleBackdropClick}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{t("Időpontfoglalás")}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{t("Név")}</label>
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
            <label htmlFor="email">{t("Email cím")}</label>
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
            <label htmlFor="phone">{t("Telefonszám")}</label>
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
            <label htmlFor="city">{t("Város")}</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder={t("Város")}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">{t("Irányítószám")}</label>
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
            <label htmlFor="shippingAddress">{t("Szállítási cím")}</label>
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
                  value="Háztól házig szerviz"
                  checked={formData.services.includes("Háztól házig szerviz")}
                  onChange={handleChange}
                />
                <label htmlFor="service1">{t("Háztól házig szerviz")}</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="service2"
                  name="services"
                  value="Gumiszerelés, defektfajítás"
                  checked={formData.services.includes(
                    "Gumiszerelés, defektfajítás"
                  )}
                  onChange={handleChange}
                />
                <label htmlFor="service2">
                  {t("Gumiszerelés, defektfajítás")}
                </label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="service3"
                  name="services"
                  value="Fék beállítás"
                  checked={formData.services.includes("Fék beállítás")}
                  onChange={handleChange}
                />
                <label htmlFor="service3">{t("Fék beállítás")}</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="service4"
                  name="services"
                  value="Karbantartás"
                  checked={formData.services.includes("Karbantartás")}
                  onChange={handleChange}
                />
                <label htmlFor="service4">{t("Karbantartás")}</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="service5"
                  name="services"
                  value="Elektromos javítás"
                  checked={formData.services.includes("Elektromos javítás")}
                  onChange={handleChange}
                />
                <label htmlFor="service5">{t("Elektromos javítás")}</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="service6"
                  name="services"
                  value="Egyéb"
                  className="other-checkbox"
                  checked={formData.services.includes("Egyéb")}
                  onChange={handleChange}
                />
                <label htmlFor="service6">{t("Egyéb")}</label>
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
                    required={formData.services.includes("Egyéb")}
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
            {t("Időpont lefoglalása")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;

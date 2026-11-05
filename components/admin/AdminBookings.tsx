"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Booking } from "../../lib/bookingStore";
import {
  Availability,
  DEFAULT_AVAILABILITY,
  getDayHours,
  toDateKey,
} from "../../lib/bookingDates";
import BookingCalendar from "../BookingCalendar";
import { adminFetch, errorMessage, formatDate } from "./adminApi";

type View = "open" | "upcoming" | "history";

const STATUS_LABELS: Record<Booking["status"], string> = {
  pending: "Függőben",
  accepted: "Elfogadva",
  proposed: "Új időpont ajánlva",
  client_accepted: "Ügyfél elfogadta",
  client_rejected: "Ügyfél elutasította",
  rejected: "Elutasítva",
};

const VIEWS: { id: View; label: string }[] = [
  { id: "open", label: "Teendők" },
  { id: "upcoming", label: "Közelgő" },
  { id: "history", label: "Előzmények" },
];

const isConfirmed = (booking: Booking) =>
  booking.status === "accepted" || booking.status === "client_accepted";

const appointment = (booking: Booking) =>
  booking.status === "client_accepted" && booking.newDate
    ? { date: booking.newDate, time: booking.newTime ?? "" }
    : { date: booking.originalDate, time: booking.originalTime };

function viewOf(booking: Booking, today: string): View {
  if (booking.status === "pending" || booking.status === "proposed") return "open";
  if (isConfirmed(booking) && appointment(booking).date >= today) return "upcoming";
  return "history";
}

const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availability, setAvailability] = useState<Availability>(DEFAULT_AVAILABILITY);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<View>("open");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  const load = useCallback(async () => {
    try {
      const [{ bookings: loaded }, schedule] = await Promise.all([
        adminFetch<{ bookings: Booking[] }>("/api/admin/bookings"),
        adminFetch<Availability>("/api/availability"),
      ]);
      setBookings(loaded);
      setAvailability(schedule);
    } catch (error) {
      setNotice({ type: "error", text: errorMessage(error) });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const today = toDateKey(new Date());

  const counts = useMemo(() => {
    const result: Record<View, number> = { open: 0, upcoming: 0, history: 0 };
    bookings.forEach((booking) => {
      result[viewOf(booking, today)] += 1;
    });
    return result;
  }, [bookings, today]);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    const direction = view === "history" ? -1 : 1;
    return bookings
      .filter((booking) => viewOf(booking, today) === view)
      .filter(
        (booking) =>
          !query ||
          [booking.name, booking.email, booking.phone].some((value) =>
            value?.toLowerCase().includes(query)
          )
      )
      .sort(
        (a, b) =>
          direction * appointment(a).date.localeCompare(appointment(b).date)
      );
  }, [bookings, search, today, view]);

  const runAction = async (id: string, body: object, successText: string) => {
    setNotice(null);
    try {
      const { emailSent } = await adminFetch<{ emailSent: boolean }>(
        `/api/admin/bookings/${encodeURIComponent(id)}`,
        { method: "POST", body: JSON.stringify(body) }
      );
      setNotice(
        emailSent
          ? { type: "ok", text: successText }
          : { type: "error", text: "A foglalás mentve, de az e-mail nem ment ki az ügyfélnek." }
      );
      setOpenId(null);
      await load();
    } catch (error) {
      setNotice({ type: "error", text: errorMessage(error) });
    }
  };

  const removeBooking = async (id: string) => {
    setNotice(null);
    try {
      await adminFetch(`/api/admin/bookings/${encodeURIComponent(id)}`, { method: "DELETE" });
      setNotice({ type: "ok", text: "Foglalás törölve." });
      setOpenId(null);
      await load();
    } catch (error) {
      setNotice({ type: "error", text: errorMessage(error) });
    }
  };

  return (
    <>
      <div className="adm-toolbar">
        <div className="adm-segment" role="group" aria-label="Foglalások szűrése">
          {VIEWS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={view === id ? "active" : ""}
              aria-pressed={view === id}
              onClick={() => setView(id)}
            >
              {label} <span className="adm-count">{counts[id]}</span>
            </button>
          ))}
        </div>
        <input
          className="adm-input adm-search"
          type="search"
          placeholder="Keresés név, e-mail vagy telefon alapján"
          aria-label="Keresés"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {notice && (
        <p className={notice.type === "ok" ? "adm-success" : "adm-error"} role="status">
          {notice.text}
        </p>
      )}

      {isLoading ? (
        <p className="adm-muted">Betöltés...</p>
      ) : visible.length === 0 ? (
        <div className="adm-card adm-empty">Nincs itt foglalás.</div>
      ) : (
        <ul className="adm-booking-list">
          {visible.map((booking) => (
            <BookingRow
              key={booking.id}
              booking={booking}
              availability={availability}
              isOpen={openId === booking.id}
              onToggle={() => setOpenId(openId === booking.id ? null : booking.id)}
              onAction={runAction}
              onDelete={removeBooking}
            />
          ))}
        </ul>
      )}
    </>
  );
};

interface BookingRowProps {
  booking: Booking;
  availability: Availability;
  isOpen: boolean;
  onToggle: () => void;
  onAction: (id: string, body: object, successText: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const BookingRow: React.FC<BookingRowProps> = ({
  booking,
  availability,
  isOpen,
  onToggle,
  onAction,
  onDelete,
}) => {
  const [isBusy, setIsBusy] = useState(false);
  const [isProposing, setIsProposing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { date, time } = appointment(booking);

  const act = async (work: () => Promise<void>) => {
    setIsBusy(true);
    await work();
    setIsBusy(false);
  };

  return (
    <li className="adm-card adm-booking">
      <button
        type="button"
        className="adm-booking-head"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="adm-booking-when">
          <strong>{formatDate(date)}</strong>
          <span className="adm-muted">{time}</span>
        </span>
        <span className="adm-booking-who">
          <strong>{booking.name}</strong>
          <span className="adm-muted adm-ellipsis">{booking.services.join(", ")}</span>
        </span>
        <span className={`adm-status status-${booking.status}`}>
          {STATUS_LABELS[booking.status]}
        </span>
        <ChevronDown size={18} className={`adm-chevron ${isOpen ? "open" : ""}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="adm-booking-body">
          <dl className="adm-details">
            <div><dt>E-mail</dt><dd><a href={`mailto:${booking.email}`}>{booking.email}</a></dd></div>
            <div><dt>Telefon</dt><dd><a href={`tel:${booking.phone}`}>{booking.phone}</a></dd></div>
            <div>
              <dt>Átvétel</dt>
              <dd>
                {booking.inShop
                  ? "Az ügyfél behozza az üzletbe"
                  : `${booking.city}, ${booking.postalCode} ${booking.shippingAddress}`}
              </dd>
            </div>
            {booking.differentBilling && (
              <div>
                <dt>Számlázási cím</dt>
                <dd>{`${booking.billingCity ?? ""} ${booking.billingPostalCode ?? ""} ${booking.billingAddress ?? ""}`.trim()}</dd>
              </div>
            )}
            <div><dt>Szolgáltatások</dt><dd>{booking.services.join(", ")}</dd></div>
            {booking.message && <div><dt>Üzenet</dt><dd>{booking.message}</dd></div>}
            {booking.newDate && (
              <>
                <div><dt>Eredeti időpont</dt><dd>{formatDate(booking.originalDate)} {booking.originalTime}</dd></div>
                <div><dt>Ajánlott időpont</dt><dd>{formatDate(booking.newDate)} {booking.newTime}</dd></div>
              </>
            )}
          </dl>

          {isProposing && (
            <ProposeForm
              availability={availability}
              isBusy={isBusy}
              onSubmit={(newDate, fromHour, toHour) =>
                act(() =>
                  onAction(
                    booking.id,
                    { action: "propose", date: newDate, fromHour, toHour },
                    "Az új időpont javaslatot elküldtük az ügyfélnek."
                  )
                )
              }
            />
          )}

          <div className="adm-actions">
            {booking.status === "pending" && (
              <>
                <button
                  type="button"
                  className="adm-btn adm-btn-primary"
                  disabled={isBusy}
                  onClick={() => act(() => onAction(booking.id, { action: "accept" }, "Foglalás elfogadva, az ügyfelet értesítettük."))}
                >
                  Elfogadom
                </button>
                <button
                  type="button"
                  className="adm-btn"
                  disabled={isBusy}
                  onClick={() => setIsProposing(!isProposing)}
                >
                  Új időpontot ajánlok
                </button>
                <button
                  type="button"
                  className="adm-btn"
                  disabled={isBusy}
                  onClick={() => act(() => onAction(booking.id, { action: "reject" }, "Foglalás elutasítva, az ügyfelet értesítettük."))}
                >
                  Elutasítom
                </button>
              </>
            )}
            {confirmDelete ? (
              <button
                type="button"
                className="adm-btn adm-btn-danger adm-push"
                disabled={isBusy}
                onClick={() => act(() => onDelete(booking.id))}
              >
                Biztosan törlöd? Nem vonható vissza
              </button>
            ) : (
              <button
                type="button"
                className="adm-btn adm-btn-ghost adm-push"
                onClick={() => setConfirmDelete(true)}
              >
                Törlés
              </button>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

interface ProposeFormProps {
  availability: Availability;
  isBusy: boolean;
  onSubmit: (date: string, fromHour: number, toHour: number) => void;
}

const ProposeForm: React.FC<ProposeFormProps> = ({ availability, isBusy, onSubmit }) => {
  const today = toDateKey(new Date());
  const [date, setDate] = useState("");
  const [fromHour, setFromHour] = useState(0);
  const [toHour, setToHour] = useState(0);
  const hours = getDayHours(date, availability);

  const range = (from: number, to: number) =>
    Array.from({ length: Math.max(to - from, 0) }, (_, i) => from + i);

  const pickDate = (picked: string) => {
    const dayHours = getDayHours(picked, availability);
    setDate(picked);
    if (dayHours) {
      setFromHour(dayHours.fromHour);
      setToHour(dayHours.fromHour + 1);
    }
  };

  return (
    <div className="adm-propose">
      <BookingCalendar
        value={date}
        minDate={today}
        availability={availability}
        labelledBy="adm-propose-title"
        onChange={pickDate}
      />
      <div className="adm-propose-side">
        <h3 id="adm-propose-title">Új időpont</h3>
        {hours ? (
          <>
            <div className="adm-row">
              <label className="adm-field">
                <span>Kezdés</span>
                <select
                  className="adm-input"
                  value={fromHour}
                  onChange={(e) => {
                    const from = Number(e.target.value);
                    setFromHour(from);
                    setToHour(Math.max(toHour, from + 1));
                  }}
                >
                  {range(hours.fromHour, hours.toHour).map((h) => (
                    <option key={h} value={h}>{h}:00</option>
                  ))}
                </select>
              </label>
              <label className="adm-field">
                <span>Vége</span>
                <select
                  className="adm-input"
                  value={toHour}
                  onChange={(e) => setToHour(Number(e.target.value))}
                >
                  {range(fromHour + 1, hours.toHour + 1).map((h) => (
                    <option key={h} value={h}>{h}:00</option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="button"
              className="adm-btn adm-btn-primary"
              disabled={isBusy}
              onClick={() => onSubmit(date, fromHour, toHour)}
            >
              Javaslat küldése az ügyfélnek
            </button>
          </>
        ) : (
          <p className="adm-muted">Válassz napot a naptárban.</p>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;

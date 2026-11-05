"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { BlockedDate } from "../../lib/availability";
import { DayHours, toDateKey } from "../../lib/bookingDates";
import { adminFetch, errorMessage, formatDate } from "./adminApi";

interface AvailabilityState {
  weekly: DayHours[];
  blockedDates: BlockedDate[];
}

// Displayed from Monday, stored like Date.getDay() where 0 = Sunday
const WEEKDAYS: { index: number; label: string }[] = [
  { index: 1, label: "Hétfő" },
  { index: 2, label: "Kedd" },
  { index: 3, label: "Szerda" },
  { index: 4, label: "Csütörtök" },
  { index: 5, label: "Péntek" },
  { index: 6, label: "Szombat" },
  { index: 0, label: "Vasárnap" },
];

const HOURS = Array.from({ length: 25 }, (_, hour) => hour);

const AdminAvailability: React.FC = () => {
  const [weekly, setWeekly] = useState<DayHours[] | null>(null);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newReason, setNewReason] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [notice, setNotice] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  const apply = (state: AvailabilityState) => {
    setWeekly(state.weekly);
    setBlockedDates(state.blockedDates);
  };

  useEffect(() => {
    adminFetch<AvailabilityState>("/api/admin/availability")
      .then(apply)
      .catch((error) => setNotice({ type: "error", text: errorMessage(error) }));
  }, []);

  const updateDay = (index: number, changes: Partial<DayHours>) => {
    setWeekly((current) =>
      current!.map((day, i) => (i === index ? { ...day, ...changes } : day))
    );
    setIsDirty(true);
    setNotice(null);
  };

  const send = async (url: string, options: RequestInit, successText: string) => {
    setNotice(null);
    try {
      apply(await adminFetch<AvailabilityState>(url, options));
      setNotice({ type: "ok", text: successText });
      return true;
    } catch (error) {
      setNotice({ type: "error", text: errorMessage(error) });
      return false;
    }
  };

  const saveWeekly = async () => {
    const saved = await send(
      "/api/admin/availability",
      { method: "PUT", body: JSON.stringify({ weekly }) },
      "A heti nyitvatartás mentve."
    );
    if (saved) setIsDirty(false);
  };

  const addBlocked = async (e: React.FormEvent) => {
    e.preventDefault();
    const saved = await send(
      "/api/admin/availability",
      { method: "POST", body: JSON.stringify({ date: newDate, reason: newReason }) },
      "A nap zárolva."
    );
    if (saved) {
      setNewDate("");
      setNewReason("");
    }
  };

  const today = toDateKey(new Date());
  const upcomingBlocked = blockedDates.filter(({ date }) => date >= today);

  if (!weekly) {
    return notice ? <p className="adm-error">{notice.text}</p> : <p className="adm-muted">Betöltés...</p>;
  }

  return (
    <div className="adm-stack">
      {notice && (
        <p className={notice.type === "ok" ? "adm-success" : "adm-error"} role="status">
          {notice.text}
        </p>
      )}

      <section className="adm-card">
        <h2 className="adm-card-title">Heti nyitvatartás</h2>
        <p className="adm-muted adm-card-sub">
          Az ügyfelek csak a nyitott napokra, ezeken az órákon belül foglalhatnak.
        </p>
        <div className="adm-week">
          {WEEKDAYS.map(({ index, label }) => {
            const day = weekly[index];
            return (
              <div key={index} className={`adm-week-row ${day.isOpen ? "" : "closed"}`}>
                <label className="adm-switch">
                  <input
                    type="checkbox"
                    checked={day.isOpen}
                    onChange={(e) => updateDay(index, { isOpen: e.target.checked })}
                  />
                  <span className="adm-switch-track" aria-hidden="true" />
                  <span className="adm-week-day">{label}</span>
                </label>
                {day.isOpen ? (
                  <div className="adm-week-hours">
                    <select
                      className="adm-input"
                      aria-label={`${label} nyitás`}
                      value={day.fromHour}
                      onChange={(e) => updateDay(index, { fromHour: Number(e.target.value) })}
                    >
                      {HOURS.slice(0, 24).map((hour) => (
                        <option key={hour} value={hour}>{hour}:00</option>
                      ))}
                    </select>
                    <span className="adm-muted">–</span>
                    <select
                      className="adm-input"
                      aria-label={`${label} zárás`}
                      value={day.toHour}
                      onChange={(e) => updateDay(index, { toHour: Number(e.target.value) })}
                    >
                      {HOURS.slice(1).map((hour) => (
                        <option key={hour} value={hour}>{hour}:00</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <span className="adm-muted">Zárva</span>
                )}
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="adm-btn adm-btn-primary"
          disabled={!isDirty}
          onClick={saveWeekly}
        >
          Nyitvatartás mentése
        </button>
      </section>

      <section className="adm-card">
        <h2 className="adm-card-title">Zárolt napok</h2>
        <p className="adm-muted adm-card-sub">
          Egy-egy napot itt tudsz kivenni a foglalhatók közül, például szabadság vagy ünnep miatt.
        </p>
        <form className="adm-inline-form" onSubmit={addBlocked}>
          <label className="adm-field">
            <span>Dátum</span>
            <input
              className="adm-input"
              type="date"
              min={today}
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              required
            />
          </label>
          <label className="adm-field adm-grow">
            <span>Megjegyzés (nem látszik az ügyfélnek)</span>
            <input
              className="adm-input"
              type="text"
              maxLength={120}
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
            />
          </label>
          <button type="submit" className="adm-btn adm-btn-primary">Zárolás</button>
        </form>

        {upcomingBlocked.length === 0 ? (
          <p className="adm-muted">Nincs zárolt nap.</p>
        ) : (
          <ul className="adm-blocked-list">
            {upcomingBlocked.map(({ date, reason }) => (
              <li key={date}>
                <strong>{formatDate(date)}</strong>
                <span className="adm-muted adm-grow">{reason}</span>
                <button
                  type="button"
                  className="adm-icon-btn"
                  aria-label={`${formatDate(date)} feloldása`}
                  onClick={() =>
                    send(
                      `/api/admin/availability?date=${date}`,
                      { method: "DELETE" },
                      "A nap újra foglalható."
                    )
                  }
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminAvailability;

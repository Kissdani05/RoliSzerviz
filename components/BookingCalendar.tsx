"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "../contexts/TranslationContext";
import { Availability, fromDateKey, getDayHours, toDateKey } from "../lib/bookingDates";

interface BookingCalendarProps {
  value: string;
  minDate: string;
  availability: Availability;
  labelledBy: string;
  onChange: (date: string) => void;
}

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  value,
  minDate,
  availability,
  labelledBy,
  onChange,
}) => {
  const { t, locale } = useTranslation();
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(fromDateKey(value || minDate))
  );

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Weeks start on Monday
  const leadingBlanks = (visibleMonth.getDay() + 6) % 7;
  const todayKey = toDateKey(new Date());
  const isFirstMonth =
    visibleMonth.getTime() <= startOfMonth(fromDateKey(minDate)).getTime();

  const fullDateFormat = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 2024-01-01 was a Monday
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    weekdayFormat.format(new Date(2024, 0, 1 + i))
  );

  const changeMonth = (delta: number) =>
    setVisibleMonth(new Date(year, month + delta, 1));

  return (
    <div className="booking-calendar" role="group" aria-labelledby={labelledBy}>
      <div className="booking-calendar-header">
        <button
          type="button"
          className="booking-calendar-nav"
          onClick={() => changeMonth(-1)}
          disabled={isFirstMonth}
          aria-label={t("calendar_prev_month")}
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <span className="booking-calendar-month" aria-live="polite">
          {new Intl.DateTimeFormat(locale, { year: "numeric", month: "long" }).format(visibleMonth)}
        </span>
        <button
          type="button"
          className="booking-calendar-nav"
          onClick={() => changeMonth(1)}
          aria-label={t("calendar_next_month")}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="booking-calendar-weekdays" aria-hidden="true">
        {weekdays.map((weekday, i) => (
          <span key={weekday} className={availability.weekly[(i + 1) % 7].isOpen ? "" : "closed"}>
            {weekday}
          </span>
        ))}
      </div>

      <div className="booking-calendar-days">
        {Array.from({ length: leadingBlanks }, (_, i) => (
          <span key={`blank-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(year, month, i + 1);
          const dateKey = toDateKey(date);
          const closed = !getDayHours(dateKey, availability);
          const selected = dateKey === value;
          const classNames = [
            "booking-calendar-day",
            closed ? "closed" : "",
            dateKey === todayKey ? "today" : "",
            selected ? "selected" : "",
          ].filter(Boolean).join(" ");

          return (
            <button
              key={dateKey}
              type="button"
              className={classNames}
              onClick={() => onChange(dateKey)}
              disabled={closed || dateKey < minDate}
              aria-label={fullDateFormat.format(date)}
              aria-pressed={selected}
              aria-current={dateKey === todayKey ? "date" : undefined}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="booking-calendar-footer">
        <span className="booking-calendar-selected" aria-live="polite">
          {value ? fullDateFormat.format(fromDateKey(value)) : ""}
        </span>
        <span className="booking-calendar-legend">
          <span className="booking-calendar-swatch" aria-hidden="true" />
          {t("closed_day_notice")}
        </span>
      </div>
    </div>
  );
};

export default BookingCalendar;

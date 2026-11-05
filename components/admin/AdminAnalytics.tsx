"use client";

import React, { useEffect, useState } from "react";
import type { AdminAnalytics as Analytics, CountRow } from "../../lib/adminAnalytics";
import AdminBarChart, { ChartRow } from "./AdminBarChart";
import { adminFetch, errorMessage, formatMoney } from "./adminApi";

const PERIODS = [3, 6, 12];

const COLOR_BOOKINGS = "#3987e5";
const COLOR_INCOME = "#199e70";
const COLOR_EXPENSE = "#d95926";

const monthDate = (month: string) => new Date(`${month}-01T12:00:00`);

const monthLabel = (month: string) =>
  new Intl.DateTimeFormat("hu-HU", { month: "short" })
    .format(monthDate(month))
    .replace(".", "")
    .slice(0, 3);

const fullMonthLabel = (month: string) =>
  new Intl.DateTimeFormat("hu-HU", { year: "numeric", month: "long" }).format(monthDate(month));

const compactMoney = (value: number) => {
  if (value >= 1_000_000) return `${value / 1_000_000} M`;
  if (value >= 1_000) return `${value / 1_000} e`;
  return String(value);
};

const AdminAnalytics: React.FC = () => {
  const [months, setMonths] = useState(12);
  const [data, setData] = useState<Analytics | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    adminFetch<Analytics>(`/api/admin/analytics?months=${months}`)
      .then((loaded) => {
        if (!cancelled) setData(loaded);
      })
      .catch((loadError) => setError(errorMessage(loadError)));
    return () => {
      cancelled = true;
    };
  }, [months]);

  if (error) return <p className="adm-error" role="alert">{error}</p>;
  if (!data) return <p className="adm-muted">Betöltés...</p>;

  const { totals } = data;
  const toRows = (pick: (row: Analytics["months"][number]) => number[]): ChartRow[] =>
    data.months.map((row) => ({
      label: monthLabel(row.month),
      fullLabel: fullMonthLabel(row.month),
      values: pick(row),
    }));

  return (
    <div className="adm-stack">
      <div className="adm-toolbar">
        <div className="adm-segment" role="group" aria-label="Időszak">
          {PERIODS.map((period) => (
            <button
              key={period}
              type="button"
              className={months === period ? "active" : ""}
              aria-pressed={months === period}
              onClick={() => setMonths(period)}
            >
              {period} hónap
            </button>
          ))}
        </div>
      </div>

      <div className="adm-tiles">
        <div className="adm-tile"><span>Foglalások</span><strong>{totals.bookings}</strong></div>
        <div className="adm-tile"><span>Függőben most</span><strong>{totals.pending}</strong></div>
        <div className="adm-tile"><span>Közelgő munka</span><strong>{totals.upcoming}</strong></div>
        <div className="adm-tile">
          <span>Elfogadási arány</span>
          <strong>{totals.acceptanceRate === null ? "–" : `${totals.acceptanceRate}%`}</strong>
        </div>
      </div>

      <div className="adm-tiles">
        <div className="adm-tile"><span>Bevétel</span><strong>{formatMoney(totals.income)}</strong></div>
        <div className="adm-tile"><span>Kiadás</span><strong>{formatMoney(totals.expense)}</strong></div>
        <div className="adm-tile">
          <span>Eredmény</span>
          <strong>{formatMoney(totals.income - totals.expense)}</strong>
        </div>
      </div>

      <div className="adm-chart-grid-2">
        <section className="adm-card">
          <AdminBarChart
            title="Foglalások havonta"
            series={[{ name: "Foglalások", color: COLOR_BOOKINGS }]}
            rows={toRows((row) => [row.bookings])}
            formatValue={String}
          />
        </section>
        <section className="adm-card">
          <AdminBarChart
            title="Bevétel és kiadás havonta"
            series={[
              { name: "Bevétel", color: COLOR_INCOME },
              { name: "Kiadás", color: COLOR_EXPENSE },
            ]}
            rows={toRows((row) => [row.income, row.expense])}
            formatValue={formatMoney}
            formatAxis={compactMoney}
          />
        </section>
        <section className="adm-card">
          <CountBars title="Legkeresettebb szolgáltatások" rows={data.services} />
        </section>
        <section className="adm-card">
          <CountBars title="Foglalások állapota" rows={data.statuses} />
        </section>
      </div>
    </div>
  );
};

const CountBars: React.FC<{ title: string; rows: CountRow[] }> = ({ title, rows }) => {
  const max = Math.max(...rows.map((row) => row.count), 1);
  return (
    <figure className="adm-chart">
      <figcaption className="adm-card-title">{title}</figcaption>
      {rows.length === 0 ? (
        <p className="adm-muted">Ebben az időszakban nincs adat.</p>
      ) : (
        <ul className="adm-hbars">
          {rows.map((row) => (
            <li key={row.label}>
              <span className="adm-hbar-label">{row.label}</span>
              <span className="adm-hbar-track">
                <span
                  className="adm-hbar-fill"
                  style={{ width: `${(row.count / max) * 100}%`, background: COLOR_BOOKINGS }}
                />
              </span>
              <span className="adm-hbar-value">{row.count}</span>
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
};

export default AdminAnalytics;

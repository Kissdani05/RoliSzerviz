"use client";

import React, { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import type { Transaction, TransactionType } from "../../lib/transactions";
import { toDateKey } from "../../lib/bookingDates";
import { adminFetch, errorMessage, formatDate, formatMoney } from "./adminApi";

const DEFAULT_CATEGORIES: Record<TransactionType, string[]> = {
  income: ["Javítás", "Karbantartás", "Alkatrész eladás", "Kiszállás"],
  expense: ["Alkatrész", "Üzemanyag", "Bérleti díj", "Szerszám", "Marketing"],
};

const AdminFinance: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [month, setMonth] = useState(() => toDateKey(new Date()).slice(0, 7));
  const [type, setType] = useState<TransactionType>("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(() => toDateKey(new Date()));
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    adminFetch<{ transactions: Transaction[] }>("/api/admin/transactions")
      .then(({ transactions: loaded }) => setTransactions(loaded))
      .catch((loadError) => setError(errorMessage(loadError)))
      .finally(() => setIsLoading(false));
  }, []);

  const visible = useMemo(
    () => transactions.filter((transaction) => !month || transaction.date.startsWith(month)),
    [transactions, month]
  );

  const sumOf = (wanted: TransactionType) =>
    visible
      .filter((transaction) => transaction.type === wanted)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  const income = sumOf("income");
  const expense = sumOf("expense");

  const categoryOptions = useMemo(() => {
    const used = transactions
      .filter((transaction) => transaction.type === type)
      .map((transaction) => transaction.category);
    return [...new Set([...DEFAULT_CATEGORIES[type], ...used])];
  }, [transactions, type]);

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      const { transaction } = await adminFetch<{ transaction: Transaction }>(
        "/api/admin/transactions",
        {
          method: "POST",
          body: JSON.stringify({
            type,
            amount: Number(amount),
            category,
            description,
            date,
          }),
        }
      );
      setTransactions((current) =>
        [transaction, ...current].sort(
          (a, b) => b.date.localeCompare(a.date) || b.id - a.id
        )
      );
      setAmount("");
      setCategory("");
      setDescription("");
    } catch (saveError) {
      setError(errorMessage(saveError));
    } finally {
      setIsSaving(false);
    }
  };

  const removeItem = async (id: number) => {
    setError("");
    try {
      await adminFetch(`/api/admin/transactions/${id}`, { method: "DELETE" });
      setTransactions((current) => current.filter((transaction) => transaction.id !== id));
    } catch (removeError) {
      setError(errorMessage(removeError));
    }
  };

  return (
    <div className="adm-stack">
      <section className="adm-card">
        <h2 className="adm-card-title">Új tétel</h2>
        <form className="adm-finance-form" onSubmit={addItem}>
          <div className="adm-segment" role="group" aria-label="Tétel típusa">
            <button
              type="button"
              className={type === "income" ? "active" : ""}
              aria-pressed={type === "income"}
              onClick={() => setType("income")}
            >
              Bevétel
            </button>
            <button
              type="button"
              className={type === "expense" ? "active" : ""}
              aria-pressed={type === "expense"}
              onClick={() => setType("expense")}
            >
              Kiadás
            </button>
          </div>
          <label className="adm-field">
            <span>Összeg (Ft)</span>
            <input
              className="adm-input"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
          <label className="adm-field">
            <span>Kategória</span>
            <input
              className="adm-input"
              type="text"
              list="adm-categories"
              maxLength={60}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <datalist id="adm-categories">
              {categoryOptions.map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </label>
          <label className="adm-field">
            <span>Dátum</span>
            <input
              className="adm-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label className="adm-field adm-finance-note">
            <span>Megjegyzés (nem kötelező)</span>
            <input
              className="adm-input"
              type="text"
              maxLength={200}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button type="submit" className="adm-btn adm-btn-primary" disabled={isSaving}>
            {isSaving ? "Mentés..." : "Hozzáadás"}
          </button>
        </form>
      </section>

      {error && <p className="adm-error" role="alert">{error}</p>}

      <div className="adm-toolbar">
        <label className="adm-field adm-field-inline">
          <span>Hónap</span>
          <input
            className="adm-input"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </label>
        {month && (
          <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setMonth("")}>
            Összes hónap
          </button>
        )}
      </div>

      <div className="adm-tiles">
        <div className="adm-tile"><span>Bevétel</span><strong>{formatMoney(income)}</strong></div>
        <div className="adm-tile"><span>Kiadás</span><strong>{formatMoney(expense)}</strong></div>
        <div className="adm-tile"><span>Eredmény</span><strong>{formatMoney(income - expense)}</strong></div>
      </div>

      {isLoading ? (
        <p className="adm-muted">Betöltés...</p>
      ) : visible.length === 0 ? (
        <div className="adm-card adm-empty">Ebben az időszakban nincs tétel.</div>
      ) : (
        <div className="adm-card adm-table-card">
          <table className="adm-table adm-finance-table">
            <thead>
              <tr>
                <th>Dátum</th>
                <th>Típus</th>
                <th>Kategória</th>
                <th>Megjegyzés</th>
                <th className="adm-num">Összeg</th>
                <th aria-label="Műveletek" />
              </tr>
            </thead>
            <tbody>
              {visible.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="adm-tx-date">{formatDate(transaction.date)}</td>
                  <td className="adm-tx-type">
                    <span className={`adm-type adm-type-${transaction.type}`}>
                      {transaction.type === "income" ? "Bevétel" : "Kiadás"}
                    </span>
                  </td>
                  <td className="adm-tx-category">{transaction.category}</td>
                  <td className="adm-tx-note adm-muted">{transaction.description}</td>
                  <td className="adm-tx-amount adm-num">
                    {transaction.type === "income" ? "+" : "−"}
                    {formatMoney(transaction.amount)}
                  </td>
                  <td className="adm-tx-delete adm-num">
                    <button
                      type="button"
                      className="adm-icon-btn"
                      aria-label={`${transaction.category} tétel törlése`}
                      onClick={() => removeItem(transaction.id)}
                    >
                      <X size={16} aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminFinance;

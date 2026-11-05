"use client";

import React, { useState } from "react";
import { BarChart3, CalendarClock, ClipboardList, LogOut, Wallet } from "lucide-react";
import AdminAnalytics from "./AdminAnalytics";
import AdminAvailability from "./AdminAvailability";
import AdminBookings from "./AdminBookings";
import AdminFinance from "./AdminFinance";
import { adminFetch } from "./adminApi";

const TABS = [
  { id: "bookings", label: "Foglalások", icon: ClipboardList, Component: AdminBookings },
  { id: "availability", label: "Foglalható időpontok", icon: CalendarClock, Component: AdminAvailability },
  { id: "finance", label: "Pénzügyek", icon: Wallet, Component: AdminFinance },
  { id: "analytics", label: "Analitika", icon: BarChart3, Component: AdminAnalytics },
];

const AdminApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const ActiveComponent = TABS.find((tab) => tab.id === activeTab)!.Component;

  const logout = async () => {
    await adminFetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <div className="adm adm-shell">
      <aside className="adm-sidebar">
        <div className="adm-brand">ROLISZERVIZ<span>Admin</span></div>
        <nav className="adm-nav" aria-label="Admin menü">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`adm-nav-item ${activeTab === id ? "active" : ""}`}
              aria-current={activeTab === id ? "page" : undefined}
              onClick={() => setActiveTab(id)}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <button type="button" className="adm-nav-item adm-logout" onClick={logout}>
          <LogOut size={18} aria-hidden="true" />
          <span>Kilépés</span>
        </button>
      </aside>
      <main className="adm-main">
        <h1 className="adm-title">{TABS.find((tab) => tab.id === activeTab)!.label}</h1>
        <ActiveComponent />
      </main>
    </div>
  );
};

export default AdminApp;

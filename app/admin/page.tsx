import type { Metadata } from "next";
import AdminApp from "../../components/admin/AdminApp";
import AdminLogin from "../../components/admin/AdminLogin";
import { isAdmin } from "../../lib/adminAuth";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin – RoliSzerviz",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  return (await isAdmin()) ? <AdminApp /> : <AdminLogin />;
}

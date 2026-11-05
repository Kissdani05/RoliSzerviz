// JSON fetch for the admin routes: throws the server's message on failure
export async function adminFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
    headers: options?.body ? { "Content-Type": "application/json" } : undefined,
    ...options,
  });
  // Session expired: back to the login screen
  if (response.status === 401 && !url.endsWith("/login")) {
    window.location.reload();
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Váratlan hiba történt.");
  }
  return data;
}

export const formatMoney = (amount: number) =>
  `${new Intl.NumberFormat("hu-HU").format(amount)} Ft`;

export const formatDate = (dateKey: string) =>
  dateKey.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$1. $2. $3.");

export const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

export const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Váratlan hiba történt.";

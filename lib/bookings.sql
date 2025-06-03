-- Bookings table for Vercel Postgres
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  status TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  postalCode TEXT NOT NULL,
  shippingAddress TEXT NOT NULL,
  differentBilling BOOLEAN NOT NULL,
  billingPostalCode TEXT,
  billingAddress TEXT,
  services TEXT NOT NULL, -- JSON stringified array
  message TEXT,
  modificationSent BOOLEAN NOT NULL,
  originalDate TEXT NOT NULL,
  originalTime TEXT NOT NULL,
  newDate TEXT,
  newTime TEXT
);

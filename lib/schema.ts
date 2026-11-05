import { getPool } from "./db";

// db/init.sql only runs on an empty volume, so tables added after the first
// deploy have to be created by the app itself.
const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS availability_weekly (
    weekday INTEGER PRIMARY KEY CHECK (weekday BETWEEN 0 AND 6),
    is_open BOOLEAN NOT NULL,
    from_hour INTEGER NOT NULL,
    to_hour INTEGER NOT NULL
  );
  INSERT INTO availability_weekly (weekday, is_open, from_hour, to_hour) VALUES
    (0, FALSE, 9, 17),
    (1, TRUE, 9, 17),
    (2, TRUE, 9, 17),
    (3, TRUE, 9, 17),
    (4, TRUE, 9, 17),
    (5, TRUE, 9, 17),
    (6, FALSE, 9, 17)
  ON CONFLICT (weekday) DO NOTHING;

  CREATE TABLE IF NOT EXISTS blocked_dates (
    date TEXT PRIMARY KEY,
    reason TEXT
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    amount INTEGER NOT NULL CHECK (amount > 0),
    category TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS admin_sessions (
    token_hash TEXT PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL
  );
`;

const globalForSchema = globalThis as unknown as { schemaReady?: Promise<void> };

export function ensureSchema(): Promise<void> {
  if (!globalForSchema.schemaReady) {
    globalForSchema.schemaReady = getPool()
      .query(SCHEMA_SQL)
      .then(() => undefined)
      .catch((error) => {
        // Let the next call try again
        globalForSchema.schemaReady = undefined;
        throw error;
      });
  }
  return globalForSchema.schemaReady;
}

import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getPool } from "./db";
import { ensureSchema } from "./schema";

const SESSION_COOKIE = "admin_session";
const SESSION_HOURS = 12;
const MAX_FAILED_LOGINS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

const sha256 = (value: string) => createHash("sha256").update(value).digest();

export function isPasswordCorrect(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  // Without a configured password nobody can log in
  if (!expected) return false;
  return timingSafeEqual(sha256(password), sha256(expected));
}

const failedLogins = new Map<string, { count: number; firstAt: number }>();

export function isLockedOut(ip: string): boolean {
  const entry = failedLogins.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.firstAt > LOCKOUT_MS) {
    failedLogins.delete(ip);
    return false;
  }
  return entry.count >= MAX_FAILED_LOGINS;
}

export function recordFailedLogin(ip: string): void {
  const entry = failedLogins.get(ip);
  if (entry) {
    entry.count += 1;
  } else {
    failedLogins.set(ip, { count: 1, firstAt: Date.now() });
  }
}

export function clearFailedLogins(ip: string): void {
  failedLogins.delete(ip);
}

// The proxy appends the real client address last, earlier entries can be spoofed
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",").pop()?.trim() || "local";
}

export async function startSession(): Promise<void> {
  await ensureSchema();
  const token = randomBytes(32).toString("base64url");
  const pool = getPool();
  await pool.query("DELETE FROM admin_sessions WHERE expires_at < now()");
  await pool.query(
    "INSERT INTO admin_sessions (token_hash, expires_at) VALUES ($1, now() + make_interval(hours => $2))",
    [sha256(token).toString("hex"), SESSION_HOURS]
  );
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
  });
}

export async function endSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await ensureSchema();
    await getPool().query("DELETE FROM admin_sessions WHERE token_hash = $1", [
      sha256(token).toString("hex"),
    ]);
  }
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    await ensureSchema();
    const { rowCount } = await getPool().query(
      "SELECT 1 FROM admin_sessions WHERE token_hash = $1 AND expires_at > now()",
      [sha256(token).toString("hex")]
    );
    return !!rowCount;
  } catch (error) {
    console.error("Error checking admin session:", error);
    return false;
  }
}

// Call at the top of every admin route: returns the response to send if denied
export async function requireAdmin(): Promise<NextResponse | null> {
  if (await isAdmin()) return null;
  return NextResponse.json({ error: "Nincs jogosultság." }, { status: 401 });
}

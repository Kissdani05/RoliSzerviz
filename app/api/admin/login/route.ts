import { NextResponse } from "next/server";
import {
  clearFailedLogins,
  getClientIp,
  isLockedOut,
  isPasswordCorrect,
  recordFailedLogin,
  startSession,
} from "../../../../lib/adminAuth";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isLockedOut(ip)) {
    return NextResponse.json(
      { error: "Túl sok sikertelen próbálkozás. Próbáld újra 15 perc múlva." },
      { status: 429 }
    );
  }

  const { password } = await request.json().catch(() => ({ password: "" }));
  if (typeof password !== "string" || !isPasswordCorrect(password)) {
    recordFailedLogin(ip);
    return NextResponse.json({ error: "Hibás jelszó." }, { status: 401 });
  }

  try {
    await startSession();
  } catch (error) {
    console.error("Error starting admin session:", error);
    return NextResponse.json(
      { error: "Az adatbázis nem érhető el." },
      { status: 500 }
    );
  }
  clearFailedLogins(ip);
  return NextResponse.json({ ok: true });
}

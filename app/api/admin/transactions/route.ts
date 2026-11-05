import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/adminAuth";
import { addTransaction, listTransactions } from "../../../../lib/transactions";

export const dynamic = "force-dynamic";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    return NextResponse.json({ transactions: await listTransactions() });
  } catch (error) {
    console.error("Error listing transactions:", error);
    return NextResponse.json(
      { error: "Nem sikerült betölteni a tételeket." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { type, amount, category, description, date } = await request.json();
  const cleanCategory = typeof category === "string" ? category.trim() : "";

  if (
    (type !== "income" && type !== "expense") ||
    !Number.isInteger(amount) ||
    amount <= 0 ||
    amount > 2_000_000_000 ||
    !cleanCategory ||
    typeof date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date)
  ) {
    return NextResponse.json(
      { error: "Adj meg pozitív egész összeget, kategóriát és dátumot." },
      { status: 400 }
    );
  }

  try {
    const transaction = await addTransaction({
      type,
      amount,
      category: cleanCategory,
      description: typeof description === "string" && description.trim() ? description.trim() : null,
      date,
    });
    return NextResponse.json({ transaction });
  } catch (error) {
    console.error("Error adding transaction:", error);
    return NextResponse.json(
      { error: "Nem sikerült menteni a tételt." },
      { status: 500 }
    );
  }
}

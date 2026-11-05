import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../../lib/adminAuth";
import { deleteTransaction } from "../../../../../lib/transactions";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = Number((await params).id);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Érvénytelen azonosító." }, { status: 400 });
  }
  await deleteTransaction(id);
  return NextResponse.json({ ok: true });
}

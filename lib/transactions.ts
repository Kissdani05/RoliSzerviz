import { getPool } from "./db";
import { ensureSchema } from "./schema";

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  category: string;
  description: string | null;
  date: string;
}

export async function listTransactions(): Promise<Transaction[]> {
  await ensureSchema();
  const { rows } = await getPool().query(
    "SELECT id, type, amount, category, description, date FROM transactions ORDER BY date DESC, id DESC"
  );
  return rows;
}

export async function addTransaction(
  transaction: Omit<Transaction, "id">
): Promise<Transaction> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `INSERT INTO transactions (type, amount, category, description, date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, type, amount, category, description, date`,
    [
      transaction.type,
      transaction.amount,
      transaction.category,
      transaction.description,
      transaction.date,
    ]
  );
  return rows[0];
}

export async function deleteTransaction(id: number): Promise<void> {
  await ensureSchema();
  await getPool().query("DELETE FROM transactions WHERE id = $1", [id]);
}

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NEON_DATABASE_URL || '');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get('account_id');

  try {
    let transactions;
    if (accountId) {
      transactions = await sql`
        SELECT * FROM transactions 
        WHERE account_id = ${accountId}
        ORDER BY transaction_date DESC
      `;
    } else {
      transactions = await sql`
        SELECT * FROM transactions 
        ORDER BY transaction_date DESC
      `;
    }

    const formatted = transactions.map((tx: any) => ({
      ...tx,
      amount: parseFloat(tx.amount),
      starting_balance: parseFloat(tx.starting_balance),
      ending_balance: parseFloat(tx.ending_balance),
    }));

    return Response.json(formatted);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return Response.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const {
      account_id,
      type,
      amount,
      transaction_date,
      starting_balance,
      ending_balance,
      months_duration,
    } = await request.json();

    if (!account_id || !type || !amount) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update account balance
    await sql`
      UPDATE accounts SET balance = ${ending_balance}, updated_at = now() WHERE id = ${account_id}
    `;

    // Create transaction record
    const result = await sql`
      INSERT INTO transactions 
      (account_id, type, amount, transaction_date, starting_balance, ending_balance, months_duration)
      VALUES (${account_id}, ${type}, ${amount}, ${transaction_date}, ${starting_balance}, ${ending_balance}, ${months_duration})
      RETURNING *
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return Response.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}

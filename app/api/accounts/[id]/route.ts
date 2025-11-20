import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || '');

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const account = await sql(
      `SELECT 
        a.id,
        a.account_number,
        a.balance,
        a.customer_id,
        a.deposito_type_id,
        c.name as customer_name,
        dt.name as deposito_type_name,
        dt.yearly_return,
        a.created_at
      FROM accounts a
      LEFT JOIN customers c ON a.customer_id = c.id
      LEFT JOIN deposito_types dt ON a.deposito_type_id = dt.id
      WHERE a.id = $1`,
      [params.id]
    );

    if (account.length === 0) {
      return Response.json({ error: 'Account not found' }, { status: 404 });
    }

    const acc = account[0];
    const formatted = {
      id: acc.id,
      account_number: acc.account_number,
      balance: parseFloat(acc.balance),
      customer_id: acc.customer_id,
      deposito_type_id: acc.deposito_type_id,
      customer: { name: acc.customer_name },
      deposito_type: { name: acc.deposito_type_name, yearly_return: acc.yearly_return },
      created_at: acc.created_at,
    };

    return Response.json(formatted);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch account' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { customer_id, deposito_type_id, balance } = await request.json();

    const result = await sql(
      `UPDATE accounts 
       SET customer_id = $1, deposito_type_id = $2, balance = $3, updated_at = now()
       WHERE id = $4 RETURNING *`,
      [customer_id, deposito_type_id, balance, params.id]
    );

    if (result.length === 0) {
      return Response.json({ error: 'Account not found' }, { status: 404 });
    }

    return Response.json(result[0]);
  } catch (error) {
    return Response.json({ error: 'Failed to update account' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await sql(
      'DELETE FROM accounts WHERE id = $1 RETURNING id',
      [params.id]
    );

    if (result.length === 0) {
      return Response.json({ error: 'Account not found' }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to delete account' }, { status: 500 });
  }
}

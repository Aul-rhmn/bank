import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NEON_DATABASE_URL || '');

function generateAccountNumber() {
  return `ACC${Date.now()}${Math.random().toString().slice(2, 5)}`;
}

export async function GET() {
  try {
    const accounts = await sql`
      SELECT 
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
      ORDER BY a.created_at DESC
    `;

    const formatted = accounts.map((acc: any) => ({
      id: acc.id,
      account_number: acc.account_number,
      balance: parseFloat(acc.balance),
      customer_id: acc.customer_id,
      deposito_type_id: acc.deposito_type_id,
      customer: { name: acc.customer_name },
      deposito_type: { name: acc.deposito_type_name, yearly_return: acc.yearly_return },
      created_at: acc.created_at,
    }));

    return Response.json(formatted);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return Response.json({ error: 'Failed to fetch accounts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { customer_id, deposito_type_id, balance } = await request.json();

    if (!customer_id || !deposito_type_id || balance === undefined) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const accountNumber = generateAccountNumber();

    const result = await sql`
      INSERT INTO accounts (customer_id, deposito_type_id, balance, account_number)
      VALUES (${customer_id}, ${deposito_type_id}, ${balance}, ${accountNumber})
      RETURNING *
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating account:', error);
    return Response.json({ error: 'Failed to create account' }, { status: 500 });
  }
}

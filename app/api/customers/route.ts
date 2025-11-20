import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NEON_DATABASE_URL || '');

export async function GET() {
  try {
    const customers = await sql`
      SELECT id, name, email, phone, address, created_at FROM customers ORDER BY created_at DESC
    `;
    return Response.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return Response.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, address } = await request.json();

    if (!name) {
      return Response.json({ error: 'Name is required' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO customers (name, email, phone, address) 
      VALUES (${name}, ${email || null}, ${phone || null}, ${address || null}) 
      RETURNING *
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating customer:', error);
    return Response.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}

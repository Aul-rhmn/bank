import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || '');

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customer = await sql(
      'SELECT id, name, email, phone, address, created_at FROM customers WHERE id = $1',
      [params.id]
    );

    if (customer.length === 0) {
      return Response.json({ error: 'Customer not found' }, { status: 404 });
    }

    return Response.json(customer[0]);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch customer' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, email, phone, address } = await request.json();

    const result = await sql(
      'UPDATE customers SET name = $1, email = $2, phone = $3, address = $4, updated_at = now() WHERE id = $5 RETURNING *',
      [name, email || null, phone || null, address || null, params.id]
    );

    if (result.length === 0) {
      return Response.json({ error: 'Customer not found' }, { status: 404 });
    }

    return Response.json(result[0]);
  } catch (error) {
    return Response.json({ error: 'Failed to update customer' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await sql(
      'DELETE FROM customers WHERE id = $1 RETURNING id',
      [params.id]
    );

    if (result.length === 0) {
      return Response.json({ error: 'Customer not found' }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to delete customer' }, { status: 500 });
  }
}

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || '');

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const type = await sql(
      'SELECT id, name, yearly_return, description, created_at FROM deposito_types WHERE id = $1',
      [params.id]
    );

    if (type.length === 0) {
      return Response.json({ error: 'Type not found' }, { status: 404 });
    }

    return Response.json(type[0]);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch type' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, yearly_return, description } = await request.json();

    const result = await sql(
      'UPDATE deposito_types SET name = $1, yearly_return = $2, description = $3, updated_at = now() WHERE id = $4 RETURNING *',
      [name, yearly_return, description || null, params.id]
    );

    if (result.length === 0) {
      return Response.json({ error: 'Type not found' }, { status: 404 });
    }

    return Response.json(result[0]);
  } catch (error) {
    return Response.json({ error: 'Failed to update type' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await sql(
      'DELETE FROM deposito_types WHERE id = $1 RETURNING id',
      [params.id]
    );

    if (result.length === 0) {
      return Response.json({ error: 'Type not found' }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to delete type' }, { status: 500 });
  }
}

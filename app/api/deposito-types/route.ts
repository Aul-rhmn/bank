import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NEON_DATABASE_URL || '');

export async function GET() {
  try {
    const types = await sql`
      SELECT id, name, yearly_return, description, created_at FROM deposito_types ORDER BY yearly_return ASC
    `;
    return Response.json(types);
  } catch (error) {
    console.error('Error fetching deposito types:', error);
    return Response.json({ error: 'Failed to fetch types' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, yearly_return, description } = await request.json();

    if (!name || yearly_return === undefined) {
      return Response.json({ error: 'Name and yearly_return are required' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO deposito_types (name, yearly_return, description) 
      VALUES (${name}, ${yearly_return}, ${description || null}) 
      RETURNING *
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating deposito type:', error);
    return Response.json({ error: 'Failed to create type' }, { status: 500 });
  }
}

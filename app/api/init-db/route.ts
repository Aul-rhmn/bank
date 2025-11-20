import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NEON_DATABASE_URL!);

export async function GET() {
  try {
    console.log('Starting database initialization...');

    // Create customers table
    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        phone VARCHAR(20),
        address TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      )
    `;
    console.log('Created customers table');

    // Create deposito_types table
    await sql`
      CREATE TABLE IF NOT EXISTS deposito_types (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL UNIQUE,
        yearly_return DECIMAL(5, 2) NOT NULL,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      )
    `;
    console.log('Created deposito_types table');

    // Create accounts table
    await sql`
      CREATE TABLE IF NOT EXISTS accounts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
        deposito_type_id UUID NOT NULL REFERENCES deposito_types(id) ON DELETE RESTRICT,
        balance DECIMAL(15, 2) NOT NULL DEFAULT 0,
        account_number VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      )
    `;
    console.log('Created accounts table');

    // Create transactions table
    await sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL CHECK (type IN ('deposit', 'withdraw')),
        amount DECIMAL(15, 2) NOT NULL,
        starting_balance DECIMAL(15, 2),
        ending_balance DECIMAL(15, 2),
        transaction_date DATE NOT NULL,
        months_duration INT DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      )
    `;
    console.log('Created transactions table');

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_accounts_customer_id ON accounts(customer_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_accounts_deposito_type_id ON accounts(deposito_type_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_transactions_account_id ON transactions(account_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date)`;
    console.log('Created indexes');

    // Seed default deposito types
    await sql`
      INSERT INTO deposito_types (name, yearly_return, description) VALUES
      ('Deposito Bronze', 3.00, 'Entry level savings with 3% yearly return'),
      ('Deposito Silver', 5.00, 'Standard savings with 5% yearly return'),
      ('Deposito Gold', 7.00, 'Premium savings with 7% yearly return')
      ON CONFLICT (name) DO NOTHING
    `;
    console.log('Seeded deposito types');

    return Response.json({
      success: true,
      message: 'Database initialized successfully',
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return Response.json(
      {
        success: false,
        message: 'Database initialization failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

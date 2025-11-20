import { neon } from '@neondatabase/serverless';

async function runMigration() {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    console.log('Running migrations...');
    
    // Read and execute migration files
    const fs = await import('fs');
    const path = await import('path');
    
    const scriptDir = path.dirname(new URL(import.meta.url).pathname);
    
    // Run create tables script
    const createTablesSQL = fs.readFileSync(path.join(scriptDir, '01_create_tables.sql'), 'utf-8');
    console.log('Executing 01_create_tables.sql...');
    await sql(createTablesSQL);
    console.log('✓ Tables created successfully');
    
    // Run seed deposito types
    const seedDepositoSQL = fs.readFileSync(path.join(scriptDir, '02_seed_deposito_types.sql'), 'utf-8');
    console.log('Executing 02_seed_deposito_types.sql...');
    await sql(seedDepositoSQL);
    console.log('✓ Deposito types seeded successfully');
    
    // Run sample data
    const sampleDataSQL = fs.readFileSync(path.join(scriptDir, '03_sample_data.sql'), 'utf-8');
    console.log('Executing 03_sample_data.sql...');
    await sql(sampleDataSQL);
    console.log('✓ Sample data inserted successfully');
    
    console.log('✓ All migrations completed successfully!');
    
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

runMigration();

-- Insert sample customer
INSERT INTO customers (name) VALUES
  ('John Doe'),
  ('Jane Smith'),
  ('Ahmad Wijaya')
ON CONFLICT DO NOTHING;

-- Get deposito type IDs (Bronze)
WITH bronze AS (
  SELECT id FROM deposito_types WHERE name = 'Deposito Bronze' LIMIT 1
),
customer AS (
  SELECT id FROM customers WHERE name = 'John Doe' LIMIT 1
)
INSERT INTO accounts (account_number, customer_id, deposito_type_id, balance)
SELECT 
  'ACC-' || to_char(CURRENT_TIMESTAMP, 'YYYYMMDDHH24MISS'),
  customer.id,
  bronze.id,
  1000000
FROM bronze, customer
ON CONFLICT (account_number) DO NOTHING;

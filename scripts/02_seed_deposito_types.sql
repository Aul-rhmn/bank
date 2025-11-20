-- Seed default deposito types
INSERT INTO deposito_types (name, yearly_return, description) VALUES
('Deposito Bronze', 3.00, 'Entry level savings with 3% yearly return'),
('Deposito Silver', 5.00, 'Standard savings with 5% yearly return'),
('Deposito Gold', 7.00, 'Premium savings with 7% yearly return')
ON CONFLICT (name) DO NOTHING;

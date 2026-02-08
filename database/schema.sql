-- Supabase SQL Setup for Panilap Eatery
-- Copy and paste this into your Supabase SQL Editor to create all tables

-- ============ USERS TABLE ============
CREATE TABLE users (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'employee')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ EMPLOYEES TABLE ============
CREATE TABLE employees (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    lastname TEXT NOT NULL,
    firstname TEXT NOT NULL,
    position TEXT NOT NULL,
    contact_number TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ INVENTORY TABLE ============
CREATE TABLE inventory (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL UNIQUE,
    category TEXT DEFAULT 'Other',
    price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    status TEXT DEFAULT 'In Stock' CHECK (status IN ('In Stock', 'Low Stock', 'Out of Stock')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ TRANSACTIONS TABLE ============
CREATE TABLE transactions (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    employee TEXT NOT NULL,
    items_detail JSONB NOT NULL,
    quantity INTEGER NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    status TEXT DEFAULT 'Completed' CHECK (status IN ('Completed', 'Pending', 'Cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ ACTION LOGS TABLE ============
CREATE TABLE action_logs (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    timestamp TEXT NOT NULL,
    type TEXT NOT NULL,
    item_name TEXT NOT NULL,
    quantity_changed INTEGER NOT NULL,
    previous_quantity INTEGER,
    remaining_quantity INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============ INSERT SAMPLE DATA ============

-- Insert sample users
INSERT INTO users (username, password, role) VALUES
('admin', 'admin123', 'admin'),
('employee', 'employee123', 'employee');

-- Insert sample employees
INSERT INTO employees (lastname, firstname, position, contact_number) VALUES
('Buma-at', 'Dwight Anthony', 'Cook', '09958744151'),
('Corpuz', 'Hervin Lei', 'Cashier', '09958744151'),
('Condonar', 'Jose III', 'Washer', '09958741512'),
('Morastil', 'Prince Maxy', 'Trainee', '09958744151');

-- Insert sample inventory
INSERT INTO inventory (name, category, price, quantity, status) VALUES
('Pork', 'Meat', 1000, 50, 'In Stock'),
('Chicken', 'Meat', 200, 79, 'In Stock'),
('Pastil', 'Dish', 20, 35, 'In Stock'),
('Rice', 'Staple', 150, 100, 'In Stock'),
('Adobo', 'Dish', 1200, 25, 'Low Stock');

-- ============ CREATE INDEXES ============
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transactions_employee ON transactions(employee);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_inventory_status ON inventory(status);
CREATE INDEX idx_action_logs_created_at ON action_logs(created_at);

-- ============ SET POLICIES ============
-- Enable Row Level Security (RLS) on tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for anon access (adjust based on your security needs)
CREATE POLICY "Allow anon select" ON users FOR SELECT USING (true);
CREATE POLICY "Allow anon select" ON employees FOR SELECT USING (true);
CREATE POLICY "Allow anon select" ON inventory FOR SELECT USING (true);
CREATE POLICY "Allow anon select" ON transactions FOR SELECT USING (true);
CREATE POLICY "Allow anon insert" ON transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon select" ON action_logs FOR SELECT USING (true);

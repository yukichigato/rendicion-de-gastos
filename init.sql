CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Custom types
CREATE TYPE workplace_status AS ENUM ('Jefe De Area', 'Trabajador', 'Contador');
CREATE TYPE workplace_area AS ENUM ('Otros', 'Ventas', 'Materiales', 'Procesos');
CREATE TYPE expense_type AS ENUM ('Materiales', 'Social', 'Estadías', 'Necesidades', 'Alimentación', 'Otros');

-- User/worker profile table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid(),
    profile_picture_url TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    rut TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    tel TEXT,
    email TEXT NOT NULL UNIQUE,
    "status" workplace_status NOT NULL DEFAULT 'Trabajador',
    area workplace_area NOT NULL DEFAULT 'Otros',
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- Expense report table
CREATE TABLE IF NOT EXISTS expense_report (
    id UUID DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL,
    title TEXT NOT NULL,
    details TEXT,
    "type" expense_type NOT NULL DEFAULT 'Otros',
    amount INTEGER NOT NULL CHECK (amount >= 0),
    backup_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (author_id) REFERENCES users(id)
);

-- Test values
INSERT INTO users ("name", rut, "password", email) 
    VALUES
        ('Juan Carlos Bodoque', '24500-03', '1234', 'contacto@bodoque.cl');

SELECT * FROM users;

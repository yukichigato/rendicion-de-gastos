CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Custom types
CREATE TYPE workplace_status        AS ENUM ('Admin', 'Jefe De Area', 'Trabajador', 'Contador');
CREATE TYPE workplace_area          AS ENUM ('Otros', 'Ventas', 'Materiales', 'Procesos');
CREATE TYPE expense_type            AS ENUM ('Materiales', 'Social', 'Estadías', 'Necesidades', 'Alimentación', 'Otros');
CREATE TYPE expense_report_status   AS ENUM ('Pending', 'Approved', 'Denied');

-- User/worker profile table
CREATE TABLE IF NOT EXISTS users (
    "id"            UUID DEFAULT gen_random_uuid(),
    "name"          TEXT NOT NULL,
    "rut"           TEXT NOT NULL UNIQUE,
    "password"      TEXT NOT NULL,
    "tel"           TEXT DEFAULT '',
    "email"         TEXT NOT NULL UNIQUE,
    "status"        workplace_status NOT NULL DEFAULT 'Trabajador',
    "area"          workplace_area NOT NULL DEFAULT 'Otros',
    "created_at"    TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- Expense report table
CREATE TABLE IF NOT EXISTS expense_report (
    "id"            UUID DEFAULT gen_random_uuid(),
    "author_id"     UUID NOT NULL,
    "type"          expense_type NOT NULL DEFAULT 'Otros',
    "amount"        INTEGER NOT NULL CHECK (amount >= 0) DEFAULT 0,
    "backup_url"    TEXT NOT NULL DEFAULT '',
    "created_at"    TIMESTAMP DEFAULT NOW(),
    "status"        expense_report_status NOT NULL DEFAULT 'Pending',
    "comment"       TEXT DEFAULT '',
    FOREIGN KEY (author_id) REFERENCES users(id)
);


-- Test values, Remove during prod
INSERT INTO users ("name", "rut", "password", "tel", "email", "status", "area") 
    VALUES
        ('Yukichi Gato', '12.345.678-9', '$2a$10$g6R5179Mf/zkHfq83Scj..QkRSZ3KrsfHTihowh7fTTzNIBasWH.S', '+56 9 1234 5678', 'yukichi@email.com', 'Admin', 'Otros');

SELECT * FROM users;

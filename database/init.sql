-- Hospital Scheduler Database Schema

CREATE TABLE IF NOT EXISTS operations (
    id SERIAL PRIMARY KEY,
    patient_name VARCHAR(255) NOT NULL,
    procedure_type VARCHAR(255) NOT NULL,
    scheduled_date TIMESTAMP NOT NULL,
    estimated_duration INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled',
    operating_room_id INTEGER,
    lead_surgeon_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS operating_rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    equipment TEXT,
    status VARCHAR(50) DEFAULT 'available'
);

CREATE TABLE IF NOT EXISTS staff (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    specialization VARCHAR(100)
);

-- Sample data
INSERT INTO operating_rooms (name, equipment) VALUES 
('OR-1', 'Basic surgical equipment'),
('OR-2', 'Advanced monitoring'),
('OR-3', 'Cardiac surgery equipment')
ON CONFLICT (name) DO NOTHING;

INSERT INTO staff (first_name, last_name, email, role, specialization) VALUES 
('John', 'Smith', 'john.smith@hospital.com', 'surgeon', 'Cardiac Surgery'),
('Maria', 'Johnson', 'maria.johnson@hospital.com', 'nurse', 'OR Nursing')
ON CONFLICT (email) DO NOTHING;

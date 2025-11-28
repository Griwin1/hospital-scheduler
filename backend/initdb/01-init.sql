CREATE TABLE IF NOT EXISTS operating_rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS staff (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO operating_rooms (name, description) VALUES
('OR-1', 'Main Operating Room - Cardio'),
('OR-2', 'Operating Room - Orthopedics'),
('OR-3', 'Operating Room - General Surgery'),
('OR-4', 'Emergency Operating Room');

INSERT INTO staff (first_name, last_name, role, specialization) VALUES
('Petko', 'Karagiozov', 'Gastro', 'Endoscopic sector'),
('Maria', 'Johnson', 'Surgeon', 'Orthopedics'),
('David', 'Brown', 'Anesthesiologist', 'General'),
('Sarah', 'Wilson', 'Nurse', 'OR Nurse'),
('Michael', 'Davis', 'Surgeon', 'General Surgery');

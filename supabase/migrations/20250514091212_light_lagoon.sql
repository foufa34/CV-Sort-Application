CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    specialization VARCHAR(255),
    years_of_experience INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cvs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    years_of_experience INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT valid_status CHECK (status IN ('PENDING', 'REVIEWED', 'SELECTED', 'REJECTED'))
);

-- Create admin user (password: admin123)
INSERT INTO users (id, email, password, name, role)
VALUES (
    gen_random_uuid(),
    'admin@cvsorter.com',
    '$2a$10$YEgJE8hN2Pz9KYQyPkPaK.8XqPFZMKEGFE4.1QJjymxKz.WiB5kHe',
    'Admin User',
    'ADMIN'
) ON CONFLICT DO NOTHING;
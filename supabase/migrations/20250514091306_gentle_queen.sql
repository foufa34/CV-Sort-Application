/*
  # CV Management System Schema

  1. New Tables
    - users: Store user information and roles
      - id (uuid, primary key)
      - email (text, unique)
      - name (text)
      - role (text)
      - specialization (text, optional)
      - years_of_experience (integer, optional)
      - created_at (timestamp with time zone)
    
    - cvs: Store CV metadata and file information
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - title (text)
      - file_url (text)
      - file_name (text)
      - file_size (integer)
      - specialization (text)
      - years_of_experience (integer)
      - status (text)
      - upload_date (timestamp with time zone)
      - metadata (jsonb)

  2. Security
    - Enable RLS on both tables
    - Add policies for user data access
    - Add policies for CV management
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'user',
  specialization text,
  years_of_experience integer,
  created_at timestamptz DEFAULT now()
);

-- Create CVs table
CREATE TABLE IF NOT EXISTS cvs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  file_url text NOT NULL,
  file_name text NOT NULL,
  file_size integer NOT NULL,
  specialization text NOT NULL,
  years_of_experience integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  upload_date timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT valid_status CHECK (status IN ('pending', 'reviewed', 'selected', 'rejected'))
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Policies for CVs table
CREATE POLICY "Users can read own CVs"
  ON cvs
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can insert own CVs"
  ON cvs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own CVs"
  ON cvs
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can delete own CVs"
  ON cvs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
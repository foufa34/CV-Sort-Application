/*
  # Add index to CVs table
  
  1. Changes
    - Add index on user_id column to improve query performance when filtering by user
*/

-- Add index on user_id for better query performance
CREATE INDEX IF NOT EXISTS cvs_user_id_idx ON cvs (user_id);
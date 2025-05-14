/*
  # Create job postings table and related schemas

  1. New Tables
    - `job_postings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `company` (text)
      - `postal_code` (text)
      - `city` (text)
      - `contract_type` (text)
      - `salary` (text)
      - `schedule` (text)
      - `start_date` (date)
      - `description` (text)
      - `requirements` (text)
      - `benefits` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on job_postings table
    - Add policies for job management
*/

CREATE TABLE IF NOT EXISTS job_postings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  company text NOT NULL,
  postal_code text NOT NULL,
  city text NOT NULL,
  contract_type text NOT NULL,
  salary text NOT NULL,
  schedule text NOT NULL,
  start_date date,
  description text NOT NULL,
  requirements text NOT NULL,
  benefits text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own job postings
CREATE POLICY "Users can read own job postings"
  ON job_postings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own job postings
CREATE POLICY "Users can insert own job postings"
  ON job_postings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own job postings
CREATE POLICY "Users can update own job postings"
  ON job_postings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_job_postings_updated_at
  BEFORE UPDATE
  ON job_postings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
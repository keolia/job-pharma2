/*
  # Fix email confirmation redirect URLs
  
  1. Changes
    - Add site URL configuration
    - Update redirect URLs to include all necessary paths
    - Increase email rate limits
  
  2. Security
    - No changes to security policies
*/

-- Update email configuration with proper site URL and redirects
DO $$ 
BEGIN
  -- Add site_url column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'config' 
    AND column_name = 'site_url'
  ) THEN
    ALTER TABLE auth.config ADD COLUMN site_url text;
  END IF;

  -- Add redirect_urls column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'config' 
    AND column_name = 'redirect_urls'
  ) THEN
    ALTER TABLE auth.config ADD COLUMN redirect_urls text[];
  END IF;
END $$;

-- Update configuration
UPDATE auth.config
SET
  site_url = 'http://localhost:5173',
  redirect_urls = ARRAY[
    'http://localhost:5173',
    'http://localhost:5173/recruiter',
    'http://localhost:5173/recruiter?confirmed=true',
    'http://localhost:3000',
    'http://localhost:3000/recruiter',
    'http://localhost:3000/recruiter?confirmed=true'
  ],
  smtp_max_frequency = 300, -- 5 minutes
  smtp_send_max_retries = 5;
/*
  # Fix test user cleanup and creation

  1. Changes
    - Improve test user cleanup to handle all related data
    - Add proper error handling
    - Add transaction support
    
  2. Security
    - Function runs with security definer
    - Only affects test users
*/

CREATE OR REPLACE FUNCTION clean_test_users()
RETURNS void AS $$
BEGIN
  -- Start transaction
  BEGIN
    -- Delete job postings first
    DELETE FROM public.job_postings
    WHERE user_id IN (
      SELECT id 
      FROM auth.users 
      WHERE user_metadata->>'company_name' = 'Pharmacie Test'
    );

    -- Delete profiles
    DELETE FROM public.profiles
    WHERE company_name = 'Pharmacie Test';

    -- Delete users last
    DELETE FROM auth.users 
    WHERE user_metadata->>'company_name' = 'Pharmacie Test';

    -- Commit transaction
    COMMIT;
  EXCEPTION WHEN OTHERS THEN
    -- Rollback on error
    ROLLBACK;
    RAISE EXCEPTION 'Failed to clean test users: %', SQLERRM;
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
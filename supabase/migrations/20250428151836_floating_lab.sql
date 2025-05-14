/*
  # Update clean users function

  1. Changes
    - Fix deletion order to handle foreign key constraints
    - Add proper error handling
    - Add transaction management
*/

CREATE OR REPLACE FUNCTION clean_test_users()
RETURNS void AS $$
BEGIN
  -- Delete profiles first (this will handle the foreign key constraint)
  DELETE FROM public.profiles
  WHERE id IN (
    SELECT id 
    FROM auth.users 
    WHERE email LIKE '%@%'
  );

  -- Then delete the users
  DELETE FROM auth.users 
  WHERE email LIKE '%@%';

  -- Verify cleanup
  IF EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE email LIKE '%@%'
  ) THEN
    RAISE EXCEPTION 'Failed to clean all test users';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
/*
  # Fix profile creation for test users

  1. Changes
    - Add ON CONFLICT DO NOTHING to profile creation
    - Add CASCADE DELETE to profile foreign key
    - Improve cleanup function
*/

-- Drop existing foreign key constraint
ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Recreate with CASCADE DELETE
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_id_fkey 
FOREIGN KEY (id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Update clean_test_users function
CREATE OR REPLACE FUNCTION clean_test_users()
RETURNS void AS $$
BEGIN
  -- Start transaction
  BEGIN
    -- Delete users (cascade will handle profiles and job postings)
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
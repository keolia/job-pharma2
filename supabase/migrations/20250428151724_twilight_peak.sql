/*
  # Clean test users function update

  1. Changes
    - Update clean_test_users function to properly delete users
    - Add cascade deletion for profiles
    - Add proper error handling
*/

CREATE OR REPLACE FUNCTION clean_test_users()
RETURNS void AS $$
DECLARE
  user_record RECORD;
BEGIN
  -- Supprimer les profils et utilisateurs existants
  FOR user_record IN 
    SELECT id 
    FROM auth.users 
    WHERE email LIKE '%@%'
  LOOP
    -- Supprimer d'abord le profil (cascade supprimera les données associées)
    DELETE FROM public.profiles WHERE id = user_record.id;
    
    -- Supprimer l'utilisateur
    DELETE FROM auth.users WHERE id = user_record.id;
  END LOOP;

  -- Vérification finale
  IF EXISTS (SELECT 1 FROM auth.users WHERE email LIKE '%@%') THEN
    RAISE EXCEPTION 'Failed to clean all test users';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
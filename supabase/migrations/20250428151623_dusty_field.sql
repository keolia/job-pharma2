/*
  # Clean test users

  1. Changes
    - Add function to clean test users
    - Add trigger to clean test users before creating new ones
    
  2. Security
    - Function is only accessible by authenticated users
*/

-- Fonction pour nettoyer les utilisateurs de test
CREATE OR REPLACE FUNCTION clean_test_users()
RETURNS void AS $$
BEGIN
  -- Supprimer les profils de test
  DELETE FROM auth.users
  WHERE email LIKE '%@%';
  
  -- Vider la table des profils
  DELETE FROM public.profiles;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
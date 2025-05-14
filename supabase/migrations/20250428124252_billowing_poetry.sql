/*
  # Correction des politiques RLS pour la table profiles
  
  1. Changements
    - Ajout d'une politique permettant l'insertion pour les utilisateurs authentifiés
    - Vérification que l'utilisateur ne peut insérer que son propre profil
*/

-- Ajouter la politique d'insertion pour profiles
CREATE POLICY "Les utilisateurs peuvent créer leur propre profil"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Vérifier et ajouter la politique de lecture si nécessaire
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND cmd = 'SELECT'
  ) THEN
    CREATE POLICY "Les utilisateurs peuvent lire leur propre profil"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);
  END IF;
END $$;
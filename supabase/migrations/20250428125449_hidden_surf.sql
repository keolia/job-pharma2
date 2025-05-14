/*
  # Correction des politiques de sécurité pour la création de profil
  
  1. Changements
    - Suppression des anciennes politiques
    - Création de nouvelles politiques plus permissives pour l'insertion
    - Maintien des politiques de lecture et mise à jour
*/

-- Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- S'assurer que RLS est activé
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Créer de nouvelles politiques
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can read own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
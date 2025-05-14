/*
  # Correction des politiques de sécurité pour la table profiles
  
  1. Changements
    - Suppression des anciennes politiques
    - Ajout de nouvelles politiques plus restrictives
    - Activation de RLS
*/

-- Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "enable_insert_for_authenticated_only" ON public.profiles;
DROP POLICY IF EXISTS "enable_select_for_authenticated_only" ON public.profiles;
DROP POLICY IF EXISTS "enable_update_for_authenticated_only" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- S'assurer que RLS est activé
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Créer de nouvelles politiques
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

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
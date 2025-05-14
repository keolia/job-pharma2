/*
  # Correction des politiques de sécurité pour la création de profil
  
  1. Changements
    - Désactivation temporaire de RLS pour le débogage
    - Ajout d'une nouvelle politique pour l'insertion publique
    - Maintien des politiques de lecture et mise à jour existantes
*/

-- Désactiver temporairement RLS pour le débogage
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Créer de nouvelles politiques
CREATE POLICY "Public can insert profiles"
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

-- Réactiver RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
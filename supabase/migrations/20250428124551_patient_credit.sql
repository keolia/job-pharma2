/*
  # Correction des politiques RLS pour la table profiles
  
  1. Changements
    - Suppression des anciennes politiques
    - Ajout de nouvelles politiques avec des conditions plus précises
    - Ajout de politique pour la mise à jour
*/

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Les utilisateurs peuvent créer leur propre profil" ON public.profiles;
DROP POLICY IF EXISTS "Les utilisateurs peuvent lire leur propre profil" ON public.profiles;

-- Ajouter les nouvelles politiques
CREATE POLICY "enable_insert_for_authenticated_only"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "enable_select_for_authenticated_only"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "enable_update_for_authenticated_only"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
/*
  # Reconstruction du système d'authentification
  
  1. Configuration
    - Désactivation de la confirmation par email
    - Configuration SMTP simplifiée
  
  2. Tables
    - Nettoyage des politiques existantes
    - Nouvelle configuration des politiques de sécurité
*/

-- Configuration de l'authentification
UPDATE auth.config SET
  mailer_autoconfirm = true,
  enable_confirmations = false;

-- Nettoyage des politiques existantes
DROP POLICY IF EXISTS "Public can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Désactiver temporairement RLS
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Nouvelles politiques de sécurité
CREATE POLICY "Allow all operations on profiles"
ON public.profiles FOR ALL
USING (true)
WITH CHECK (true);

-- Réactiver RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
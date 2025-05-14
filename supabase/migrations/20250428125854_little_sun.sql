/*
  # Reconstruction complète du système d'authentification
  
  1. Tables
    - Nettoyage complet des tables et politiques existantes
    - Nouvelle configuration des tables et politiques
  
  2. Configuration
    - Désactivation de la confirmation par email
    - Configuration simplifiée
*/

-- Nettoyage complet
DROP POLICY IF EXISTS "Allow all operations on profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Désactiver RLS temporairement
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Configuration de base
UPDATE auth.config SET
  mailer_autoconfirm = true,
  enable_confirmations = false;

-- Nouvelle politique unique
CREATE POLICY "Enable all operations"
ON public.profiles FOR ALL
USING (true)
WITH CHECK (true);

-- Réactiver RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
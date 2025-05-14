/*
  # Reconstruction du système d'authentification
  
  1. Configuration
    - Désactivation de la confirmation par email
    - Simplification des politiques
    - Mise à jour des triggers
  
  2. Sécurité
    - Activation de RLS
    - Politique unique pour toutes les opérations
*/

-- Nettoyage des politiques existantes
DROP POLICY IF EXISTS "Enable all operations" ON public.profiles;
DROP POLICY IF EXISTS "Public can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Configuration de base
UPDATE auth.config SET
  mailer_autoconfirm = true,
  enable_confirmations = false;

-- Désactiver RLS temporairement
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Trigger pour mettre à jour le profil lors de la création d'un utilisateur
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, company_name)
  VALUES (new.id, new.raw_user_meta_data->>'company_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- S'assurer que le trigger est créé
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Politique unique pour toutes les opérations
CREATE POLICY "Enable all operations"
ON public.profiles FOR ALL
USING (true)
WITH CHECK (true);

-- Réactiver RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
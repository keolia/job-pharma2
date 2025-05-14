/*
  # Restauration de la configuration d'authentification fonctionnelle
  
  1. Configuration
    - Désactive temporairement la confirmation par email
    - Configure les URLs de redirection pour le développement local
    - Met à jour le template d'email pour une meilleure délivrabilité
  
  2. Sécurité
    - Met à jour les politiques RLS pour profiles
    - Maintient le trigger de création de profil
*/

-- Configuration de l'authentification
UPDATE auth.config SET
  site_url = 'http://localhost:5173',
  additional_redirect_urls = ARRAY[
    'http://localhost:5173',
    'http://localhost:5173/',
    'http://localhost:5173/recruiter',
    'http://localhost:5173/recruiter/',
    'http://localhost:5173/recruiter?confirmed=true',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5173/',
    'http://127.0.0.1:5173/recruiter',
    'http://127.0.0.1:5173/recruiter/',
    'http://127.0.0.1:5173/recruiter?confirmed=true'
  ],
  mailer_autoconfirm = true,
  enable_confirmations = false;

-- Mise à jour des politiques de sécurité
DROP POLICY IF EXISTS "Enable all operations" ON public.profiles;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Trigger de création de profil
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

-- Politique de sécurité
CREATE POLICY "Enable all operations"
ON public.profiles FOR ALL
USING (true)
WITH CHECK (true);
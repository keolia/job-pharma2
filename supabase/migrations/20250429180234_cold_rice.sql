/*
  # Restauration de la configuration d'authentification

  1. Changements
    - Restauration des politiques RLS pour profiles
    - Configuration des paramètres d'authentification
    - Mise en place du trigger de création de profil
*/

-- Supprimer les politiques existantes
DROP POLICY IF EXISTS "Enable all operations" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- S'assurer que RLS est activé
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Créer les nouvelles politiques
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

-- Recréer le trigger de création de profil
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

-- Mettre à jour la configuration d'authentification
UPDATE auth.config SET
  site_url = 'http://localhost:5173',
  additional_redirect_urls = ARRAY[
    'http://localhost:5173',
    'http://localhost:5173/',
    'http://localhost:5173/recruiter',
    'http://localhost:5173/recruiter/',
    'http://localhost:5173/recruiter?confirmed=true'
  ],
  smtp_admin_email = 'noreply@pharma-job.com',
  smtp_host = 'smtp.resend.com',
  smtp_port = 465,
  smtp_user = 'resend',
  smtp_pass = 're_123456789',
  smtp_max_frequency = 0,
  smtp_sender_name = 'Pharma-Job',
  mailer_autoconfirm = false,
  enable_confirmations = true;
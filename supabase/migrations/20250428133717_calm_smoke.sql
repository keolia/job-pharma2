-- Mise à jour de la configuration d'authentification
UPDATE auth.config SET
  site_url = 'https://shiny-marigold-3fcbf9.netlify.app',
  additional_redirect_urls = ARRAY[
    'https://shiny-marigold-3fcbf9.netlify.app',
    'https://shiny-marigold-3fcbf9.netlify.app/',
    'https://shiny-marigold-3fcbf9.netlify.app/recruiter',
    'https://shiny-marigold-3fcbf9.netlify.app/recruiter/',
    'https://shiny-marigold-3fcbf9.netlify.app/recruiter?confirmed=true',
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

-- Désactiver temporairement RLS pour faciliter l'inscription
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Mettre à jour la politique de sécurité
DROP POLICY IF EXISTS "Enable all operations" ON public.profiles;
CREATE POLICY "Enable all operations"
ON public.profiles FOR ALL
USING (true)
WITH CHECK (true);

-- Réactiver RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
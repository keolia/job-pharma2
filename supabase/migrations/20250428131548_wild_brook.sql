/*
  # Configuration de l'envoi d'emails et de la confirmation

  1. Configuration SMTP
    - Configuration du serveur SMTP
    - Activation de la confirmation par email
    - Configuration des templates d'email

  2. Sécurité
    - Mise à jour des politiques de sécurité
    - Configuration du trigger de création de profil
*/

-- Configuration SMTP et confirmation email
UPDATE auth.config SET
  smtp_admin_email = 'no-reply@pharma-job.com',
  smtp_host = 'smtp.resend.com',
  smtp_port = 465,
  smtp_user = 'resend',
  smtp_pass = 're_123456789',
  smtp_max_frequency = 0,
  smtp_sender_name = 'Pharma-Job',
  mailer_autoconfirm = false,
  enable_confirmations = true;

-- Mise à jour du template d'email de confirmation
UPDATE auth.email_templates 
SET template = E'<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <style>\n    body { \n      font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; \n      line-height: 1.6; \n      color: #333; \n      margin: 0;\n      padding: 0;\n      background-color: #f9f9f9;\n    }\n    .container { \n      max-width: 600px; \n      margin: 0 auto; \n      padding: 20px;\n      background-color: #ffffff;\n      border-radius: 8px;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n    }\n    .button { \n      display: inline-block;\n      padding: 12px 24px;\n      background-color: #1abc9c;\n      color: white;\n      text-decoration: none;\n      border-radius: 4px;\n      margin: 20px 0;\n    }\n  </style>\n</head>\n<body>\n  <div class="container">\n    <h2>Confirmez votre compte Pharma-Job</h2>\n    <p>Pour finaliser votre inscription, cliquez sur le lien ci-dessous :</p>\n    <p><a href="{{ .ConfirmationURL }}" class="button">Confirmer mon compte</a></p>\n    <p>Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :</p>\n    <p>{{ .ConfirmationURL }}</p>\n  </div>\n</body>\n</html>',
  subject = 'Confirmez votre compte Pharma-Job'
WHERE template_type = 'confirmation';

-- Mise à jour des politiques de sécurité
DROP POLICY IF EXISTS "Enable all operations" ON public.profiles;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Trigger de création de profil
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, company_name)
  VALUES (new.id, new.raw_user_meta_data->>'company_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Création du trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Politique de sécurité
CREATE POLICY "Enable all operations"
ON public.profiles FOR ALL
USING (true)
WITH CHECK (true);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
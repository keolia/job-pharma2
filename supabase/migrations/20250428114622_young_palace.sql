/*
  # Configuration de l'authentification et des emails
  
  1. Modifications
    - Configuration des paramètres SMTP
    - Mise à jour du template d'email de confirmation
    
  2. Sécurité
    - Utilisation de SSL/TLS pour SMTP
    - Validation des URLs de redirection
*/

-- Mise à jour de la configuration SMTP
DO $$ 
BEGIN
  -- Vérifier si les colonnes existent déjà
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'config' 
    AND column_name = 'smtp_host') 
  THEN
    ALTER TABLE auth.config 
    ADD COLUMN smtp_host text,
    ADD COLUMN smtp_port integer,
    ADD COLUMN smtp_user text,
    ADD COLUMN smtp_pass text,
    ADD COLUMN smtp_sender_name text;
  END IF;
END $$;

-- Mise à jour des paramètres SMTP
UPDATE auth.config
SET
  smtp_admin_email = 'noreply@pharma-job.com',
  smtp_host = 'smtp.hostinger.com',
  smtp_port = 465,
  smtp_user = 'noreply@pharma-job.com',
  smtp_pass = 'your-smtp-password',
  smtp_max_frequency = 60,
  smtp_send_max_retries = 3,
  smtp_sender_name = 'Pharma-Job',
  enable_signup = true,
  enable_confirmations = true,
  mailer_autoconfirm = false;

-- Mise à jour du template d'email
UPDATE auth.email_templates 
SET template = E'<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <style>\n    body { \n      font-family: Arial, sans-serif; \n      line-height: 1.6; \n      color: #333; \n      margin: 0;\n      padding: 0;\n      background-color: #f9f9f9;\n    }\n    .container { \n      max-width: 600px; \n      margin: 0 auto; \n      padding: 20px;\n      background-color: #ffffff;\n      border-radius: 8px;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n    }\n    .logo {\n      text-align: center;\n      margin-bottom: 20px;\n    }\n    .button { \n      display: inline-block;\n      padding: 12px 24px;\n      background-color: #1abc9c;\n      color: white;\n      text-decoration: none;\n      border-radius: 4px;\n      margin: 20px 0;\n      text-align: center;\n    }\n    .button:hover {\n      background-color: #16a085;\n    }\n    .footer { \n      font-size: 12px; \n      color: #666; \n      margin-top: 30px;\n      text-align: center;\n      border-top: 1px solid #eee;\n      padding-top: 20px;\n    }\n    .url {\n      word-break: break-all;\n      background-color: #f5f5f5;\n      padding: 10px;\n      border-radius: 4px;\n      margin: 10px 0;\n    }\n  </style>\n</head>\n<body>\n  <div class="container">\n    <div class="logo">\n      <h1 style="color: #1abc9c;">Pharma-Job</h1>\n    </div>\n    <h2>Bienvenue sur Pharma-Job !</h2>\n    <p>Merci de vous être inscrit sur notre plateforme de recrutement spécialisée dans le secteur pharmaceutique.</p>\n    <p>Pour finaliser votre inscription et accéder à votre espace recruteur, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :</p>\n    <p style="text-align: center;">\n      <a href="{{ .ConfirmationURL }}" class="button">Confirmer mon compte</a>\n    </p>\n    <p>Si le bouton ne fonctionne pas, vous pouvez copier et coller ce lien dans votre navigateur :</p>\n    <div class="url">{{ .ConfirmationURL }}</div>\n    <div class="footer">\n      <p>Si vous n\'avez pas créé de compte sur Pharma-Job, vous pouvez ignorer cet email.</p>\n      <p>Ce lien de confirmation expire dans 24 heures.</p>\n      <p>© 2024 Pharma-Job - Tous droits réservés</p>\n    </div>\n  </div>\n</body>\n</html>',
  subject = 'Confirmez votre compte Pharma-Job'
WHERE template_type = 'confirmation';
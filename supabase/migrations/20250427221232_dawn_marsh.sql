/*
  # Update Email Configuration

  1. Changes
    - Add SMTP configuration columns if they don't exist
    - Update email template with styled HTML
*/

-- Add SMTP configuration columns if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'config' AND column_name = 'smtp_host') THEN
    ALTER TABLE auth.config 
    ADD COLUMN smtp_host text,
    ADD COLUMN smtp_port integer,
    ADD COLUMN smtp_user text,
    ADD COLUMN smtp_pass text,
    ADD COLUMN smtp_sender_name text;
  END IF;
END $$;

-- Update SMTP configuration
UPDATE auth.config
SET
  smtp_admin_email = 'noreply@pharma-job.com',
  smtp_host = 'smtp.hostinger.com',
  smtp_port = 465,
  smtp_user = 'noreply@pharma-job.com',
  smtp_pass = 'your-smtp-password',
  smtp_max_frequency = 60,
  smtp_send_max_retries = 3,
  smtp_sender_name = 'Pharma-Job';

-- Update confirmation email template with better styling
UPDATE auth.email_templates 
SET template = E'<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }\n    .container { max-width: 600px; margin: 0 auto; padding: 20px; }\n    .button { \n      display: inline-block;\n      padding: 12px 24px;\n      background-color: #1abc9c;\n      color: white;\n      text-decoration: none;\n      border-radius: 4px;\n      margin: 20px 0;\n    }\n    .footer { font-size: 12px; color: #666; margin-top: 30px; }\n  </style>\n</head>\n<body>\n  <div class="container">\n    <h2>Bienvenue sur Pharma-Job !</h2>\n    <p>Merci de vous être inscrit sur notre plateforme de recrutement spécialisée dans le secteur pharmaceutique.</p>\n    <p>Pour finaliser votre inscription et accéder à votre espace recruteur, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :</p>\n    <p>\n      <a href="{{ .ConfirmationURL }}" class="button">Confirmer mon compte</a>\n    </p>\n    <p>Si le bouton ne fonctionne pas, vous pouvez copier et coller ce lien dans votre navigateur :</p>\n    <p>{{ .ConfirmationURL }}</p>\n    <div class="footer">\n      <p>Si vous n\'avez pas créé de compte sur Pharma-Job, vous pouvez ignorer cet email.</p>\n      <p>Ce lien de confirmation expire dans 24 heures.</p>\n    </div>\n  </div>\n</body>\n</html>'
WHERE template_type = 'confirmation';
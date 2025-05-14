/*
  # Fix email confirmation setup

  1. Changes
    - Enable email confirmations
    - Set up email templates
    - Configure email settings
*/

-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Create auth.config table if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enable_signup boolean DEFAULT true,
  enable_confirmations boolean DEFAULT true,
  mailer_autoconfirm boolean DEFAULT false,
  smtp_admin_email text DEFAULT 'noreply@pharma-job.com',
  smtp_max_frequency integer DEFAULT 60,
  smtp_send_max_retries integer DEFAULT 3
);

-- Insert default config if not exists
INSERT INTO auth.config (
  enable_signup,
  enable_confirmations,
  mailer_autoconfirm,
  smtp_admin_email,
  smtp_max_frequency,
  smtp_send_max_retries
)
SELECT 
  true,
  true,
  false,
  'noreply@pharma-job.com',
  60,
  3
WHERE NOT EXISTS (SELECT 1 FROM auth.config);

-- Create auth.email_templates table if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_type text NOT NULL UNIQUE,
  template text NOT NULL,
  subject text NOT NULL
);

-- Delete existing confirmation template if exists
DELETE FROM auth.email_templates WHERE template_type = 'confirmation';

-- Insert confirmation email template
INSERT INTO auth.email_templates (template_type, template, subject)
VALUES (
  'confirmation',
  '
    <h2>Confirmez votre inscription sur Pharma-Job</h2>
    <p>Cliquez sur le lien ci-dessous pour confirmer votre compte :</p>
    <p><a href="{{ .ConfirmationURL }}">Confirmer mon compte</a></p>
    <p>Si vous n''avez pas créé de compte, ignorez cet email.</p>
    <p>Ce lien expire dans 24 heures.</p>
  ',
  'Confirmation de votre compte Pharma-Job'
);
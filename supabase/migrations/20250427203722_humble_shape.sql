/*
  # Configure SMTP settings for Gmail

  1. Changes
    - Set up SMTP configuration for Gmail using set_config
*/

-- Configure SMTP settings using set_config
SELECT set_config('auth.smtp.host', 'smtp.gmail.com', false);
SELECT set_config('auth.smtp.port', '587', false);
SELECT set_config('auth.smtp.user', 'contact@keolia-it.com', false);
SELECT set_config('auth.smtp.pass', '[VOTRE_MOT_DE_PASSE_APPLICATION]', false);
SELECT set_config('auth.smtp.sender_name', 'Pharma-Job', false);
SELECT set_config('auth.smtp.sender_email', 'contact@keolia-it.com', false);
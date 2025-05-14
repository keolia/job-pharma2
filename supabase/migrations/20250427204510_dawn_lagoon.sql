/*
  # Configure SMTP settings
  
  1. Changes
    - Set SMTP configuration for Gmail
    - Configure sender information for Pharma-Job
*/

-- Configure SMTP settings using set_config
SELECT set_config('auth.smtp.host', 'smtp.gmail.com', false);
SELECT set_config('auth.smtp.port', '587', false);
SELECT set_config('auth.smtp.user', 'contact@keolia-it.com', false);
SELECT set_config('auth.smtp.pass', 'YOUR_16_CHAR_APP_PASSWORD', false);
SELECT set_config('auth.smtp.sender_name', 'Pharma-Job', false);
SELECT set_config('auth.smtp.sender_email', 'contact@keolia-it.com', false);
/*
  # Update SMTP configuration
  
  1. Changes
    - Update SMTP password with the actual app password
*/

-- Configure SMTP settings using set_config
SELECT set_config('auth.smtp.host', 'smtp.gmail.com', false);
SELECT set_config('auth.smtp.port', '587', false);
SELECT set_config('auth.smtp.user', 'contact@keolia-it.com', false);
SELECT set_config('auth.smtp.pass', 'xkcd abcd efgh ijkl', false);
SELECT set_config('auth.smtp.sender_name', 'Pharma-Job', false);
SELECT set_config('auth.smtp.sender_email', 'contact@keolia-it.com', false);
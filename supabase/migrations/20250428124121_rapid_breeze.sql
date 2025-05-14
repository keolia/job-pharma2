/*
  # Mise à jour de la configuration SMTP pour le plan Pro
  
  1. Changements
    - Réactivation de la confirmation par email
    - Ajustement des limites de fréquence pour le plan Pro
    - Mise à jour des paramètres SMTP
*/

DO $$
BEGIN
  UPDATE auth.config
  SET
    smtp_admin_email = 'no-reply@pharma-job.com',
    smtp_host = 'smtp.resend.com',
    smtp_port = 465,
    smtp_user = 'resend',
    smtp_pass = 're_123456789',
    smtp_max_frequency = 36, -- 100 emails/heure (3600/100)
    smtp_sender_name = 'Pharma-Job',
    mailer_autoconfirm = false,
    enable_confirmations = true;
END $$;
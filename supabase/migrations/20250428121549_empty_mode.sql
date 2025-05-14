-- Réactiver la confirmation email
DO $$
BEGIN
  UPDATE auth.config
  SET
    mailer_autoconfirm = false,
    enable_confirmations = true,
    smtp_max_frequency = 0;
END $$;
-- Désactiver temporairement la confirmation email pour les tests
DO $$
BEGIN
  UPDATE auth.config
  SET
    mailer_autoconfirm = true,
    enable_confirmations = false;
END $$;
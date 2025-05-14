/*
  # Ajustement des paramètres de limitation de taux
  
  1. Changements
    - Désactivation temporaire de la limitation de taux
    - Désactivation de la confirmation par email
    - Activation de l'auto-confirmation
*/

DO $$
BEGIN
  UPDATE auth.config
  SET
    smtp_max_frequency = 0,
    mailer_autoconfirm = true,
    enable_confirmations = false;
END $$;
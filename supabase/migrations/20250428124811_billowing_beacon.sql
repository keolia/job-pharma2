/*
  # Ajustement des paramètres de limitation de taux
  
  1. Changements
    - Augmentation de la fréquence maximale des emails
    - Désactivation temporaire de la confirmation par email
*/

DO $$
BEGIN
  UPDATE auth.config
  SET
    smtp_max_frequency = 0,
    mailer_autoconfirm = true,
    enable_confirmations = false;
END $$;
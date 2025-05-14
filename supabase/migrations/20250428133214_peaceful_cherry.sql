/*
  # Correction des URLs de redirection pour l'authentification

  1. Configuration
    - Mise à jour des URLs de redirection autorisées
    - Configuration du site_url
    - Ajout des domaines autorisés
*/

-- Configuration des URLs de redirection
UPDATE auth.config SET
  site_url = 'http://localhost:5173',
  additional_redirect_urls = ARRAY[
    'http://localhost:5173',
    'http://localhost:5173/',
    'http://localhost:5173/recruiter',
    'http://localhost:5173/recruiter/',
    'http://localhost:5173/recruiter?confirmed=true',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5173/',
    'http://127.0.0.1:5173/recruiter',
    'http://127.0.0.1:5173/recruiter/',
    'http://127.0.0.1:5173/recruiter?confirmed=true'
  ],
  mailer_autoconfirm = false,
  enable_confirmations = true;
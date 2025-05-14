/*
  # Update authentication configuration
  
  1. Changes
    - Add callback URLs for Google OAuth
    - Configure redirect URLs
*/

UPDATE auth.config SET
  site_url = 'http://localhost:5173',
  additional_redirect_urls = ARRAY[
    'http://localhost:5173',
    'http://localhost:5173/',
    'http://localhost:5173/recruiter',
    'http://localhost:5173/recruiter/',
    'http://localhost:5173/recruiter?confirmed=true',
    'http://localhost:5173/auth/callback',
    'https://guodspbfkdihyycgfxon.supabase.co/auth/v1/callback'
  ],
  mailer_autoconfirm = false,
  enable_confirmations = true;
UPDATE auth.config SET
  site_url = 'http://localhost:5173',
  additional_redirect_urls = ARRAY[
    'http://localhost:5173',
    'http://localhost:5173/',
    'http://localhost:5173/recruiter',
    'http://localhost:5173/recruiter/',
    'http://localhost:5173/recruiter?confirmed=true',
    'http://localhost:5173/auth/callback',
    'http://localhost:5173/auth/v1/callback',
    'https://guodspbfkdihyycgfxon.supabase.co/auth/v1/callback',
    'https://guodspbfkdihyycgfxon.supabase.co'
  ],
  mailer_autoconfirm = false,
  enable_confirmations = true;
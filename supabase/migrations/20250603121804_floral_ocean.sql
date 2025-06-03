UPDATE auth.config SET
  site_url = 'https://guodspbfkdihyycgfxon.supabase.co',
  additional_redirect_urls = ARRAY[
    'http://localhost:5173',
    'http://localhost:5173/',
    'http://localhost:5173/recruiter',
    'http://localhost:5173/recruiter/',
    'http://localhost:5173/recruiter?confirmed=true',
    'http://localhost:5173/auth/callback',
    'http://localhost:5173/auth/v1/callback',
    'https://guodspbfkdihyycgfxon.supabase.co/auth/v1/callback',
    'https://guodspbfkdihyycgfxon.supabase.co',
    'https://guodspbfkdihyycgfxon.supabase.co/auth/callback',
    'https://guodspbfkdihyycgfxon.supabase.co/auth/v1/callback',
    'https://guodspbfkdihyycgfxon.supabase.co/auth/v1/callback/google',
    'https://zp1v56uxy8rdx5ypatb0ockcb9tr6a-oci3-kt25si4p--5173--55edb8f4.local-credentialless.webcontainer-api.io'
  ],
  mailer_autoconfirm = false,
  enable_confirmations = true;
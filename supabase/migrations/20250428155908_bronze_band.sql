-- Update authentication configuration to use Resend directly
UPDATE auth.config SET
  site_url = 'http://localhost:5173',
  additional_redirect_urls = ARRAY[
    'http://localhost:5173',
    'http://localhost:5173/',
    'http://localhost:5173/recruiter',
    'http://localhost:5173/recruiter/',
    'http://localhost:5173/recruiter?confirmed=true',
    'http://localhost:5173/auth/callback',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5173/',
    'http://127.0.0.1:5173/recruiter',
    'http://127.0.0.1:5173/recruiter/',
    'http://127.0.0.1:5173/recruiter?confirmed=true',
    'http://127.0.0.1:5173/auth/callback'
  ],
  mailer_autoconfirm = false,
  enable_confirmations = true;
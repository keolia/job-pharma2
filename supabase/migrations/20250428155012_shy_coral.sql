-- Update authentication and email configuration
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
  smtp_admin_email = 'onboarding@resend.dev',
  smtp_host = 'smtp.resend.com',
  smtp_port = 465,
  smtp_user = 'resend',
  smtp_pass = 're_123456789',
  smtp_max_frequency = 0,
  smtp_sender_name = 'Pharma-Job',
  mailer_autoconfirm = false,
  enable_confirmations = true;
/*
  # Update SMTP configuration for rate limiting
  
  1. Changes
    - Increase smtp_max_frequency to avoid rate limits
    - Add rate limiting settings
    - Update SMTP configuration
*/

-- Update SMTP configuration with rate limiting
DO $$
BEGIN
  -- Update SMTP configuration with rate limiting settings
  UPDATE auth.config
  SET
    smtp_admin_email = 'no-reply@pharma-job.com',
    smtp_host = 'smtp.resend.com',
    smtp_port = 465,
    smtp_user = 'resend',
    smtp_pass = 're_123456789',
    smtp_max_frequency = 60, -- Set to 60 seconds between emails
    smtp_sender_name = 'Pharma-Job',
    mailer_autoconfirm = false,
    enable_confirmations = true;

  -- Add rate limiting settings if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM auth.config 
    WHERE smtp_max_frequency = 60
  ) THEN
    -- Ensure rate limiting is properly configured
    UPDATE auth.config
    SET smtp_max_frequency = 60;
  END IF;
END $$;
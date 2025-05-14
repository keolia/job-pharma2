/*
  # Fix email confirmation URLs and rate limits
  
  1. Changes
    - Update site URL configuration
    - Add all necessary redirect URLs
    - Increase email rate limits
    - Update email template with better error handling
*/

-- Update email configuration with proper site URL and redirects
UPDATE auth.config
SET
  site_url = 'http://localhost:5173',
  redirect_urls = ARRAY[
    'http://localhost:5173',
    'http://localhost:5173/recruiter',
    'http://localhost:5173/recruiter?confirmed=true',
    'http://localhost:5173/recruiter?error=unauthorized',
    'http://localhost:3000',
    'http://localhost:3000/recruiter',
    'http://localhost:3000/recruiter?confirmed=true',
    'http://localhost:3000/recruiter?error=unauthorized'
  ],
  smtp_max_frequency = 0, -- Disable rate limiting temporarily
  smtp_send_max_retries = 10, -- Increase retry attempts
  enable_signup = true,
  enable_confirmations = true,
  mailer_autoconfirm = false;

-- Update email template with better error handling instructions
UPDATE auth.email_templates 
SET template = E'<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <style>\n    body { \n      font-family: Arial, sans-serif; \n      line-height: 1.6; \n      color: #333; \n      margin: 0;\n      padding: 0;\n      background-color: #f9f9f9;\n    }\n    .container { \n      max-width: 600px; \n      margin: 0 auto; \n      padding: 20px;\n      background-color: #ffffff;\n      border-radius: 8px;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n    }\n    .logo {\n      text-align: center;\n      margin-bottom: 20px;\n    }\n    .button { \n      display: inline-block;\n      padding: 12px 24px;\n      background-color: #1abc9c;\n      color: white;\n      text-decoration: none;\n      border-radius: 4px;\n      margin: 20px 0;\n      text-align: center;\n    }\n    .button:hover {\n      background-color: #16a085;\n    }\n    .footer { \n      font-size: 12px; \n      color: #666; \n      margin-top: 30px;\n      text-align: center;\n      border-top: 1px solid #eee;\n      padding-top: 20px;\n    }\n    .url {\n      word-break: break-all;\n      background-color: #f5f5f5;\n      padding: 10px;\n      border-radius: 4px;\n      margin: 10px 0;\n    }\n    .note {\n      font-size: 13px;\n      color: #666;\n      font-style: italic;\n      margin-top: 10px;\n    }\n  </style>\n</head>\n<body>\n  <div class="container">\n    <div class="logo">\n      <h1 style="color: #1abc9c;">Pharma-Job</h1>\n    </div>\n    <h2>Bienvenue sur Pharma-Job !</h2>\n    <p>Merci de vous être inscrit sur notre plateforme de recrutement spécialisée dans le secteur pharmaceutique.</p>\n    <p>Pour finaliser votre inscription et accéder à votre espace recruteur, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :</p>\n    <p style="text-align: center;">\n      <a href="{{ .ConfirmationURL }}" class="button">Confirmer mon compte</a>\n    </p>\n    <p>Si le bouton ne fonctionne pas, vous pouvez copier et coller ce lien dans votre navigateur :</p>\n    <div class="url">{{ .ConfirmationURL }}</div>\n    <p class="note">Note : Si vous rencontrez une erreur après avoir cliqué sur le lien, essayez de copier le lien et de l\'ouvrir dans un nouvel onglet de votre navigateur.</p>\n    <div class="footer">\n      <p>Si vous n\'avez pas créé de compte sur Pharma-Job, vous pouvez ignorer cet email.</p>\n      <p>Ce lien de confirmation expire dans 24 heures.</p>\n      <p>© 2024 Pharma-Job - Tous droits réservés</p>\n    </div>\n  </div>\n</body>\n</html>',
  subject = 'Confirmez votre compte Pharma-Job'
WHERE template_type = 'confirmation';
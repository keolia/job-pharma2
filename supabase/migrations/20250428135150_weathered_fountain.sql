-- Configuration SMTP avec Resend.com
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
  smtp_admin_email = 'no-reply@pharma-job.com',
  smtp_host = 'smtp.resend.com',
  smtp_port = 465,
  smtp_user = 'resend',
  smtp_pass = 're_123456789',
  smtp_max_frequency = 0,
  smtp_sender_name = 'Pharma-Job',
  mailer_autoconfirm = false,
  enable_confirmations = true;

-- Mise à jour du template d'email pour améliorer la délivrabilité
UPDATE auth.email_templates 
SET template = E'<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="x-apple-disable-message-reformatting">\n  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">\n  <meta name="color-scheme" content="light">\n  <meta name="supported-color-schemes" content="light">\n  <style>\n    body { \n      font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; \n      line-height: 1.6; \n      color: #333; \n      margin: 0;\n      padding: 0;\n      background-color: #f9f9f9;\n      -webkit-font-smoothing: antialiased;\n    }\n    .container { \n      max-width: 600px; \n      margin: 0 auto; \n      padding: 20px;\n      background-color: #ffffff;\n      border-radius: 8px;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n    }\n    .logo {\n      text-align: center;\n      margin-bottom: 20px;\n    }\n    .button { \n      display: inline-block;\n      padding: 12px 24px;\n      background-color: #1abc9c;\n      color: white !important;\n      text-decoration: none;\n      border-radius: 4px;\n      margin: 20px 0;\n      text-align: center;\n      font-weight: 600;\n    }\n    .button:hover {\n      background-color: #16a085;\n    }\n    .footer { \n      font-size: 12px; \n      color: #666; \n      margin-top: 30px;\n      text-align: center;\n      border-top: 1px solid #eee;\n      padding-top: 20px;\n    }\n    .url {\n      word-break: break-all;\n      background-color: #f5f5f5;\n      padding: 10px;\n      border-radius: 4px;\n      margin: 10px 0;\n      font-family: monospace;\n    }\n    .note {\n      font-size: 13px;\n      color: #666;\n      font-style: italic;\n      margin-top: 10px;\n    }\n    @media only screen and (max-width: 600px) {\n      .container {\n        padding: 10px;\n      }\n      .button {\n        display: block;\n        text-align: center;\n      }\n    }\n  </style>\n</head>\n<body>\n  <div class="container">\n    <div class="logo">\n      <h1 style="color: #1abc9c; margin: 0;">Pharma-Job</h1>\n    </div>\n    <h2>Confirmez votre compte Pharma-Job</h2>\n    <p>Merci de vous être inscrit sur notre plateforme de recrutement spécialisée dans le secteur pharmaceutique.</p>\n    <p>Pour finaliser votre inscription et accéder à votre espace recruteur, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :</p>\n    <p style="text-align: center;">\n      <a href="{{ .ConfirmationURL }}" class="button">Confirmer mon compte</a>\n    </p>\n    <p>Si le bouton ne fonctionne pas, vous pouvez copier et coller ce lien dans votre navigateur :</p>\n    <div class="url">{{ .ConfirmationURL }}</div>\n    <p class="note">Ce lien est valable pendant 24 heures. Si vous ne confirmez pas votre compte dans ce délai, vous devrez recommencer l\'inscription.</p>\n    <div class="footer">\n      <p>Si vous n\'avez pas créé de compte sur Pharma-Job, vous pouvez ignorer cet email.</p>\n      <p>© 2024 Pharma-Job - Tous droits réservés</p>\n    </div>\n  </div>\n</body>\n</html>',
  subject = 'Confirmez votre compte Pharma-Job'
WHERE template_type = 'confirmation';
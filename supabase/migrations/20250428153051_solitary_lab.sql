/*
  # Configure email settings

  1. Changes
    - Add email templates table
    - Add email settings
    - Update auth.users triggers
*/

-- Create email templates table
CREATE TABLE IF NOT EXISTS public.email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  subject text NOT NULL,
  html_content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Allow authenticated read access"
  ON public.email_templates
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default templates
INSERT INTO public.email_templates (name, subject, html_content) 
VALUES 
  ('confirmation_email', 
   'Confirmez votre compte Pharma-Job',
   '<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: -apple-system, system-ui, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container { 
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #1abc9c;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 style="color: #1abc9c;">Pharma-Job</h1>
        <h2>Confirmez votre compte</h2>
        <p>Merci de vous être inscrit sur notre plateforme de recrutement spécialisée dans le secteur pharmaceutique.</p>
        <p>Pour finaliser votre inscription, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :</p>
        <p>
          <a href="{{confirmation_url}}" class="button" style="color: white;">
            Confirmer mon compte
          </a>
        </p>
        <p>Si le bouton ne fonctionne pas, vous pouvez copier et coller ce lien dans votre navigateur :</p>
        <p>{{confirmation_url}}</p>
        <p style="color: #666; font-size: 0.9em;">
          Si vous n''avez pas créé de compte sur Pharma-Job, vous pouvez ignorer cet email.
        </p>
      </div>
    </body>
    </html>')
ON CONFLICT (name) DO UPDATE 
SET 
  subject = EXCLUDED.subject,
  html_content = EXCLUDED.html_content,
  updated_at = now();
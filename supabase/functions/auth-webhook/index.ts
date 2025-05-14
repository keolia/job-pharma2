import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import { Resend } from 'npm:resend@3.2.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Processing auth webhook request');
    const { type, email, confirmation_url } = await req.json();
    console.log('Request type:', type, 'email:', email);

    if (type === 'SIGNUP' && email && confirmation_url) {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'Pharma-Job <onboarding@resend.dev>',
        to: email,
        subject: 'Confirmez votre compte Pharma-Job',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta name="x-apple-disable-message-reformatting">
              <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
              <meta name="color-scheme" content="light">
              <meta name="supported-color-schemes" content="light">
              <title>Confirmez votre compte Pharma-Job</title>
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; margin: 0; background-color: #f9f9f9;">
              <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <h1 style="color: #1abc9c; text-align: center; margin-bottom: 30px;">Pharma-Job</h1>
                
                <h2 style="color: #333; margin-bottom: 20px;">Confirmez votre compte</h2>
                
                <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                  Merci de vous être inscrit sur notre plateforme de recrutement spécialisée dans le secteur pharmaceutique.
                </p>
                
                <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
                  Pour finaliser votre inscription et accéder à votre espace recruteur, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${confirmation_url}" 
                     style="background-color: #1abc9c; 
                            color: white !important; 
                            padding: 12px 24px; 
                            text-decoration: none; 
                            border-radius: 4px; 
                            display: inline-block;
                            font-weight: 600;
                            mso-padding-alt: 0;
                            text-underline-color: #1abc9c;">
                    <!--[if mso]>
                    <i style="letter-spacing: 25px; mso-font-width: -100%; mso-text-raise: 30pt;">&nbsp;</i>
                    <![endif]-->
                    <span style="mso-text-raise: 15pt;">Confirmer mon compte</span>
                    <!--[if mso]>
                    <i style="letter-spacing: 25px; mso-font-width: -100%;">&nbsp;</i>
                    <![endif]-->
                  </a>
                </div>
                
                <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                  Si le bouton ne fonctionne pas, vous pouvez copier et coller ce lien dans votre navigateur :
                </p>
                
                <div style="background-color: #f5f5f5; 
                           padding: 12px; 
                           border-radius: 4px; 
                           margin-bottom: 30px;
                           word-break: break-all;
                           font-family: monospace;
                           font-size: 14px;
                           color: #666;">
                  ${confirmation_url}
                </div>
                
                <div style="border-top: 1px solid #eee; 
                           padding-top: 20px; 
                           margin-top: 30px; 
                           text-align: center; 
                           color: #666;
                           font-size: 12px;">
                  <p style="margin: 0 0 10px 0;">Si vous n'avez pas créé de compte sur Pharma-Job, vous pouvez ignorer cet email.</p>
                  <p style="margin: 0 0 10px 0;">Ce lien de confirmation expire dans 24 heures.</p>
                  <p style="margin: 20px 0 0 0;">© 2024 Pharma-Job - Tous droits réservés</p>
                </div>
              </div>
            </body>
          </html>
        `,
        tags: [{ name: 'category', value: 'confirmation' }],
        headers: {
          "List-Unsubscribe": `<mailto:unsubscribe@pharma-job.com?subject=unsubscribe>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click"
        }
      });

      if (emailError) {
        console.error('Email sending error:', emailError);
        throw emailError;
      }

      console.log('Email sent successfully:', emailData);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Auth webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});
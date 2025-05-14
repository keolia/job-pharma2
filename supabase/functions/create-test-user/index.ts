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
    const { email } = await req.json();

    if (!email) {
      throw new Error('Email is required');
    }

    // Clean existing test users first
    await supabase.rpc('clean_test_users');

    // Create new user with email confirmation disabled
    const { data: { user }, error: createError } = await supabase.auth.admin.createUser({
      email,
      password: 'test123456',
      email_confirm: true,
      user_metadata: {
        company_name: 'Pharmacie Test'
      }
    });

    if (createError) throw createError;
    if (!user) throw new Error('Failed to create user');

    // Create profile with ON CONFLICT DO NOTHING
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        company_name: 'Pharmacie Test'
      }, {
        onConflict: 'id',
        ignoreDuplicates: true
      });

    if (profileError) {
      // If profile creation fails, delete the user and throw error
      await supabase.auth.admin.deleteUser(user.id);
      throw profileError;
    }

    // Send welcome email with credentials
    const { error: emailError } = await resend.emails.send({
      from: 'Pharma-Job <no-reply@pharma-job.com>',
      to: email,
      subject: 'Vos identifiants de test Pharma-Job',
      html: `
        <!DOCTYPE html>
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
            .credentials {
              background: #f3f4f6;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 style="color: #1abc9c;">Pharma-Job</h1>
            <h2>Votre compte test est prêt !</h2>
            <p>Voici vos identifiants de connexion :</p>
            <div class="credentials">
              <p><strong>Email :</strong> ${email}</p>
              <p><strong>Mot de passe :</strong> test123456</p>
            </div>
            <p>
              <a href="${Deno.env.get('PUBLIC_SITE_URL')}/recruiter" class="button" style="color: white;">
                Accéder à l'espace recruteur
              </a>
            </p>
            <p style="color: #666; font-size: 0.9em; margin-top: 20px; padding: 15px; border-left: 4px solid #e5e7eb;">
              Note : Ce compte est créé uniquement à des fins de test et sera automatiquement supprimé lors de la prochaine session de test.
            </p>
          </div>
        </body>
        </html>
      `
    });

    if (emailError) {
      console.error('Error sending email:', emailError);
    }

    return new Response(
      JSON.stringify({ 
        message: 'Test user created successfully',
        credentials: {
          email: email,
          password: 'test123456'
        }
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error:', error);
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
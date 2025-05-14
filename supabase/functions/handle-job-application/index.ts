import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabaseClient } from '../_shared/supabase.ts';
import { Resend } from 'npm:resend@3.2.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const jobId = formData.get('jobId');
    const coverLetter = formData.get('coverLetter');
    const cvFile = formData.get('cv') as File;

    if (!jobId || !cvFile) {
      throw new Error('Missing required fields');
    }

    // Get job posting details and recruiter email
    const { data: jobPosting, error: jobError } = await supabaseClient
      .from('job_postings')
      .select(`
        *,
        profiles:user_id (
          id,
          company_name,
          users:id (
            email
          )
        )
      `)
      .eq('id', jobId)
      .single();

    if (jobError || !jobPosting) {
      throw new Error('Job posting not found');
    }

    const recruiterEmail = jobPosting.profiles.users.email;
    const companyName = jobPosting.profiles.company_name;

    // Read CV file
    const cvBuffer = await cvFile.arrayBuffer();
    const cvContent = new Uint8Array(cvBuffer);

    // Send email to recruiter
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Pharma-Job <no-reply@pharma-job.com>',
      to: recruiterEmail,
      subject: `Nouvelle candidature pour "${jobPosting.title}"`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #1abc9c;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background-color: #fff;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 0 0 8px 8px;
            }
            .job-details {
              background-color: #f9f9f9;
              padding: 15px;
              border-radius: 4px;
              margin: 15px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 0.9em;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Nouvelle candidature reçue</h2>
          </div>
          <div class="content">
            <p>Bonjour,</p>
            <p>Vous avez reçu une nouvelle candidature pour votre offre d'emploi.</p>
            
            <div class="job-details">
              <h3>Détails de l'offre :</h3>
              <p><strong>Poste :</strong> ${jobPosting.title}</p>
              <p><strong>Entreprise :</strong> ${jobPosting.company}</p>
              <p><strong>Lieu :</strong> ${jobPosting.city}</p>
            </div>

            ${coverLetter ? `
              <h3>Lettre de motivation :</h3>
              <p>${coverLetter}</p>
            ` : ''}

            <p>Le CV du candidat est joint à cet email.</p>

            <div class="footer">
              <p>Cet email a été envoyé automatiquement par Pharma-Job.</p>
              <p>© ${new Date().getFullYear()} Pharma-Job - Tous droits réservés</p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: cvFile.name,
          content: cvContent
        }
      ]
    });

    if (emailError) {
      throw emailError;
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Application error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
import { Resend } from 'npm:resend@3.2.0';

export const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

export const sendConfirmationEmail = async (email: string, confirmationUrl: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Pharma-Job <no-reply@pharma-job.com>',
      to: email,
      subject: 'Confirmez votre compte Pharma-Job',
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
          </style>
        </head>
        <body>
          <div class="container">
            <h1 style="color: #1abc9c;">Pharma-Job</h1>
            <h2>Confirmez votre compte</h2>
            <p>Merci de vous être inscrit sur notre plateforme de recrutement spécialisée dans le secteur pharmaceutique.</p>
            <p>Pour finaliser votre inscription, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :</p>
            <p>
              <a href="${confirmationUrl}" class="button">Confirmer mon compte</a>
            </p>
            <p>Si le bouton ne fonctionne pas, vous pouvez copier et coller ce lien dans votre navigateur :</p>
            <p>${confirmationUrl}</p>
            <p style="color: #666; font-size: 0.9em;">
              Si vous n'avez pas créé de compte sur Pharma-Job, vous pouvez ignorer cet email.
            </p>
          </div>
        </body>
        </html>
      `
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error };
  }
};
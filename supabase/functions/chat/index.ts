import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Configuration, OpenAIApi } from "npm:openai@4.28.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, accept',
  'Access-Control-Max-Age': '86400',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    // Validate request method
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    // Validate API key
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    // Parse and validate request body
    const { message } = await req.json();
    if (!message || typeof message !== 'string') {
      throw new Error('Invalid message format');
    }

    // Initialize OpenAI
    const openai = new OpenAIApi(new Configuration({ apiKey }));

    // Make API call with error handling
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Vous êtes un assistant spécialisé dans le recrutement pharmaceutique. Vous aidez les utilisateurs à trouver des emplois dans le secteur pharmaceutique et répondez à leurs questions sur les carrières en pharmacie. Vos réponses sont professionnelles, précises et adaptées au contexte français."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      return new Response(
        JSON.stringify({ 
          response: completion.choices[0].message.content 
        }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError);
      throw new Error('Failed to generate response from OpenAI');
    }
  } catch (error) {
    console.error('Chat function error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});
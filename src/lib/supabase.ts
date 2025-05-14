import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    skipNonceCheck: true
  }
});

export const handleSignUp = async (email: string, password: string, companyName: string) => {
  try {
    const { data: { user }, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
      options: {
        data: {
          company_name: companyName.trim()
        }
      }
    });

    if (error) throw error;
    if (!user) throw new Error('Error creating account');

    return { 
      success: true, 
      message: 'Account created successfully. You can now sign in.' 
    };
  } catch (error: any) {
    console.error('SignUp error:', error);
    return { 
      success: false, 
      message: error.message === 'User already registered'
        ? 'This email address is already in use'
        : 'An error occurred while creating the account'
    };
  }
};

export const handleSignIn = async (email: string, password: string) => {
  try {
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim()
    });

    if (error) throw error;
    if (!user) throw new Error('Error signing in');

    return { success: true, message: 'Successfully signed in' };
  } catch (error: any) {
    console.error('SignIn error:', error);
    return { 
      success: false, 
      message: error.message === 'Invalid login credentials'
        ? 'Invalid email or password'
        : 'An error occurred while signing in'
    };
  }
};

export const handleGoogleSignIn = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/recruiter?confirmed=true`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Google SignIn error:', error);
    return { 
      success: false, 
      message: 'An error occurred during Google sign in'
    };
  }
};
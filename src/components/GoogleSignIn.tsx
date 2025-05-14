import React from 'react';
import { supabase } from '../lib/supabase';

const GoogleSignIn: React.FC = () => {
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${window.location.origin}/recruiter?confirmed=true`
      }
    });

    if (error) {
      console.error('Erreur de connexion Google:', error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors"
    >
      <img 
        src="https://www.google.com/favicon.ico"
        alt="Google"
        className="w-5 h-5"
      />
      <span>Vous vous connectez à JOB-PHARMA</span>
    </button>
  );
};

export default GoogleSignIn;
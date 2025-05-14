import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase, handleSignIn, handleSignUp, handleGoogleSignIn } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { Helmet } from 'react-helmet';
import PricingModal from '../components/PricingModal';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const RecruiterSpace: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  // Form state for job posting
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [benefits, setBenefits] = useState('');
  const [contractType, setContractType] = useState('CDI');
  const [salary, setSalary] = useState('');
  const [coefficient, setCoefficient] = useState('');
  const [software, setSoftware] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  
  // Schedule fields
  const [saturdayWork, setSaturdayWork] = useState('1 sur 2');
  const [nightShift, setNightShift] = useState('Non');
  const [sundayShift, setSundayShift] = useState('Non');
  const [holidayShift, setHolidayShift] = useState('Non');

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Check for successful payment
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');

    if (success === 'true') {
      const pendingJobData = localStorage.getItem('pendingJobPost');
      if (pendingJobData) {
        const jobData = JSON.parse(pendingJobData);
        handleJobPublication(jobData);
        localStorage.removeItem('pendingJobPost');
      }
      setSuccess('Paiement réussi ! Votre offre sera publiée sous peu.');
    } else if (canceled === 'true') {
      setError('Le paiement a été annulé. Votre offre n\'a pas été publiée.');
      localStorage.removeItem('pendingJobPost');
    }

    const confirmed = searchParams.get('confirmed');
    if (confirmed === 'true') {
      setSuccess('Email confirmed successfully! You can now sign in.');
      setIsLogin(true);
    }
  }, [searchParams]);

  const handleJobPublication = async (jobData: any) => {
    try {
      const { error: insertError } = await supabase
        .from('job_postings')
        .insert([
          {
            user_id: user?.id,
            ...jobData,
            status: 'active'
          }
        ]);

      if (insertError) throw insertError;
      setSuccess('Votre offre a été publiée avec succès !');
    } catch (error) {
      console.error('Error publishing job:', error);
      setError('Une erreur est survenue lors de la publication de l\'offre');
    }
  };

  // Fonction pour rechercher la ville à partir du code postal
  const handlePostalCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setPostalCode(code);
    
    if (code.length === 5) {
      try {
        const response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${code}&fields=nom`);
        const data = await response.json();
        
        if (data && data.length > 0) {
          setCity(data[0].nom);
        }
      } catch (error) {
        console.error('Error fetching city:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (isLogin) {
        const result = await handleSignIn(email, password);
        if (result.success) {
          setSuccess(result.message);
          navigate('/recruiter');
        } else {
          setError(result.message);
        }
      } else {
        if (!companyName.trim()) {
          setError('Company name is required');
          return;
        }
        const result = await handleSignUp(email, password, companyName);
        if (result.success) {
          setSuccess(result.message);
          setIsLogin(true);
        } else {
          setError(result.message);
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const jobData = {
      title,
      description,
      requirements,
      benefits,
      contractType,
      salary,
      coefficient,
      software,
      openingHours,
      city,
      postalCode,
      schedule: {
        saturdayWork,
        nightShift,
        sundayShift,
        holidayShift
      }
    };

    setIsPricingModalOpen(true);
  };

  if (user) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <Helmet>
          <title>Publier une offre - Job-Pharma</title>
          <meta name="description" content="Publiez votre offre d'emploi sur Job-Pharma" />
        </Helmet>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleJobSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Intitulé du poste *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description du poste
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md h-32"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de contrat
              </label>
              <select
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Intérim">Intérim</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salaire
              </label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="ex: 35 000€ - 45 000€ /an"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coefficient
            </label>
            <input
              type="text"
              value={coefficient}
              onChange={(e) => setCoefficient(e.target.value)}
              placeholder="ex: 400"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logiciel utilisé
            </label>
            <input
              type="text"
              value={software}
              onChange={(e) => setSoftware(e.target.value)}
              placeholder="ex: LGPI, Pharmagest, etc."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Emploi du temps</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Samedis travaillés
              </label>
              <select
                value={saturdayWork}
                onChange={(e) => setSaturdayWork(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="1 sur 2">1 sur 2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="Tous">Tous</option>
                <option value="Aucun">Aucun</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Garde de nuit
              </label>
              <select
                value={nightShift}
                onChange={(e) => setNightShift(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Non">Non</option>
                <option value="Oui">Oui</option>
                <option value="Possible">Possible</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Garde le dimanche
              </label>
              <select
                value={sundayShift}
                onChange={(e) => setSundayShift(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Non">Non</option>
                <option value="Oui">Oui</option>
                <option value="Possible">Possible</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Garde jours fériés
              </label>
              <select
                value={holidayShift}
                onChange={(e) => setHolidayShift(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Non">Non</option>
                <option value="Oui">Oui</option>
                <option value="Possible">Possible</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Horaires d'ouverture
            </label>
            <textarea
              value={openingHours}
              onChange={(e) => setOpeningHours(e.target.value)}
              placeholder="ex: Du lundi au vendredi 9h-19h"
              className="w-full p-2 border border-gray-300 rounded-md h-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prérequis
            </label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md h-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Avantages
            </label>
            <textarea
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md h-32"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code postal
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={handlePostalCodeChange}
                maxLength={5}
                pattern="[0-9]{5}"
                placeholder="ex: 75001"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ville
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                readOnly
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!title.trim()}
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Publier l'offre
          </button>
        </form>
        
        <PricingModal 
          isOpen={isPricingModalOpen} 
          onClose={() => setIsPricingModalOpen(false)} 
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Blurred Form Preview */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white/20 rounded-lg">
          <div className="space-y-4 filter blur-[2px] pointer-events-none">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Intitulé du poste *
              </label>
              <div className="w-full h-10 bg-gray-100 rounded-md"></div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description du poste
              </label>
              <div className="w-full h-32 bg-gray-100 rounded-md"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de contrat
                </label>
                <div className="w-full h-10 bg-gray-100 rounded-md"></div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salaire
                </label>
                <div className="w-full h-10 bg-gray-100 rounded-md"></div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Horaires
              </label>
              <div className="w-full h-10 bg-gray-100 rounded-md"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code postal
                </label>
                <div className="w-full h-10 bg-gray-100 rounded-md"></div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ville
                </label>
                <div className="w-full h-10 bg-gray-100 rounded-md"></div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prérequis
              </label>
              <div className="w-full h-32 bg-gray-100 rounded-md"></div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avantages
              </label>
              <div className="w-full h-32 bg-gray-100 rounded-md"></div>
            </div>

            <div className="w-full h-10 bg-gray-100 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Login/Signup Form */}
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
          {isLogin ? 'Connexion Recruteur' : 'Inscription Recruteur'}
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mx-auto max-w-md w-full backdrop-blur-lg bg-white/90">
          <div className="flex justify-center mb-6">
            <button
              className={`px-4 py-2 rounded-l-lg ${
                isLogin
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => {
                setIsLogin(true);
                setError(null);
                setSuccess(null);
              }}
            >
              Connexion
            </button>
            <button
              className={`px-4 py-2 rounded-r-lg ${
                !isLogin
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => {
                setIsLogin(false);
                setError(null);
                setSuccess(null);
              }}
            >
              Inscription
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de la pharmacie
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Chargement...
                </span>
              ) : isLogin ? (
                'Se connecter'
              ) : (
                "S'inscrire"
              )}
            </button>
          </form>

          <div className="mt-4">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google']}
              localization={{
                variables: {
                  sign_in: {
                    social_provider_text: "Continuer avec"
                  }
                }
              }}
              view="sign_in"
              showLinks={false}
              redirectTo={`${window.location.origin}/recruiter`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterSpace;
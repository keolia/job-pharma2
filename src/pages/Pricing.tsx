import React from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

interface StripePlan {
  id: string;
  name: string;
  stripe_price_id: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  is_recurring: boolean;
}

const Pricing: React.FC = () => {
  const [loading, setLoading] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [plans, setPlans] = React.useState<StripePlan[]>([]);
  const { t } = useTranslation();

  React.useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_plans')
        .select('*')
        .order('price');

      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error('Aucun plan disponible pour le moment');
      }
      
      setPlans(data);
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError('Une erreur est survenue lors du chargement des plans');
    }
  };

  if (plans.length === 0 && !error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-green-800 mb-4">
          Nos offres pour les recruteurs
        </h1>
        <p className="text-lg text-gray-600">
          Choisissez le plan qui correspond à vos besoins de recrutement
        </p>
      </div>

      {error && (
        <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={`bg-white rounded-xl shadow-lg p-8 flex flex-col h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              index === 1 ? 'border-2 border-green-500 relative hover:border-green-600' : ''
            }`}
          >
            {index === 1 && (
              <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold transition-colors duration-300 group-hover:bg-green-600">
                Populaire
              </span>
            )}

            {/* Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-green-800 mb-2 transition-colors duration-300 group-hover:text-green-900">{plan.name}</h3>
              <div className="text-3xl font-bold text-green-600 transition-colors duration-300 group-hover:text-green-700">
                {(plan.price / 100).toLocaleString('fr-FR')}€
                {plan.is_recurring && <span className="text-base font-normal text-gray-600"> {plan.duration}</span>}
              </div>
              <p className="text-gray-600 mt-2 transition-colors duration-300 group-hover:text-gray-700">{plan.description}</p>
            </div>

            {/* Features */}
            <div className="flex-grow">
              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-700 transition-transform duration-300 hover:translate-x-1">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
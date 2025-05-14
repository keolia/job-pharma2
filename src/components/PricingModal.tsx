import React from 'react';
import { Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { handlePayment } from '../lib/stripe';
import { STRIPE_PRODUCTS } from '../stripe-config';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobData?: any;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, jobData }) => {
  const [loading, setLoading] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const { t } = useTranslation();

  const handlePlanSelection = async (productId: keyof typeof STRIPE_PRODUCTS) => {
    try {
      setLoading(productId);
      setError(null);

      // Store job data in localStorage before redirecting
      if (jobData) {
        localStorage.setItem('pendingJobPost', JSON.stringify(jobData));
      }

      await handlePayment(productId);
    } catch (error) {
      console.error('Payment error:', error);
      setError('Une erreur est survenue lors du traitement du paiement');
    } finally {
      setLoading(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-800">
              Choisissez votre plan
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-green-800 mb-2">Basic</h3>
                <div className="text-3xl font-bold text-green-600">
                  250€
                </div>
                <p className="text-gray-600 mt-2">Pour une annonce unique</p>
              </div>

              <div className="flex-grow">
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    1 offre d'emploi active
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    Visibilité 30 jours
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    Support email
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handlePlanSelection('BASIC')}
                disabled={loading === 'BASIC'}
                className="mt-6 w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {loading === 'BASIC' ? 'Chargement...' : 'Sélectionner'}
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-green-500 relative">
              <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Populaire
              </span>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-green-800 mb-2">Premium</h3>
                <div className="text-3xl font-bold text-green-600">
                  500€
                </div>
                <p className="text-gray-600 mt-2">Visibilité prolongée</p>
              </div>

              <div className="flex-grow">
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    1 offre d'emploi active
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    Visibilité 90 jours
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    Support email
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    Mise en avant de l'offre
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handlePlanSelection('PREMIUM')}
                disabled={loading === 'PREMIUM'}
                className="mt-6 w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {loading === 'PREMIUM' ? 'Chargement...' : 'Sélectionner'}
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-green-800 mb-2">Entreprise</h3>
                <div className="text-3xl font-bold text-green-600">
                  700€
                  <span className="text-base font-normal text-gray-600"> par mois</span>
                </div>
                <p className="text-gray-600 mt-2">Solution complète pour les grands groupes</p>
              </div>

              <div className="flex-grow">
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    Offres illimitées
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    Visibilité 180 jours
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    Support dédié 24/7
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    Mise en avant premium
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handlePlanSelection('ENTERPRISE')}
                disabled={loading === 'ENTERPRISE'}
                className="mt-6 w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {loading === 'ENTERPRISE' ? 'Chargement...' : 'Sélectionner'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
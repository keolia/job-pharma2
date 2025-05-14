export const STRIPE_PRODUCTS = {
  BASIC: {
    priceId: 'price_1OvpKJiqrbuwYdQD46CHIEY',
    name: 'Basic',
    description: 'Annonces 30 jours',
    mode: 'payment' as const
  },
  PREMIUM: {
    priceId: 'price_1OvpKJiqrbuwYdQxMkUC8PT', 
    name: 'Premium',
    description: 'Annonces 90 jours',
    mode: 'payment' as const
  },
  ENTERPRISE: {
    priceId: 'price_1OvpKJiqrbuwYdQnMDF6VrH',
    name: 'Entreprise',
    description: 'Abonnement mensuel',
    mode: 'subscription' as const
  }
} as const;
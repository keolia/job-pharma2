/*
  # Mise à jour des plans Stripe

  1. Changements
    - Renommage de "Enterprise" en "Entreprise"
    - Mise à jour des descriptions et fonctionnalités
*/

-- Supprimer les plans existants
DELETE FROM stripe_plans;

-- Insérer les plans mis à jour
INSERT INTO stripe_plans (name, stripe_price_id, description, price, duration, features, is_recurring)
VALUES
  (
    'Basic',
    'price_H5ggYwtDq5IfBb',
    'Pour une annonce unique',
    25000,
    '30 days',
    ARRAY[
      '1 offre d''emploi active',
      'Visibilité 30 jours',
      'Support email'
    ],
    false
  ),
  (
    'Premium',
    'price_H5ggYwtDq5IfBc',
    'Visibilité prolongée',
    50000,
    '90 days',
    ARRAY[
      '1 offre d''emploi active',
      'Visibilité 90 jours',
      'Support email',
      'Mise en avant de l''offre'
    ],
    false
  ),
  (
    'Entreprise',
    'price_H5ggYwtDq5IfBd',
    'Solution complète pour les grands groupes',
    70000,
    '180 days',
    ARRAY[
      'Offres illimitées',
      'Visibilité 180 jours',
      'Support dédié 24/7',
      'Mise en avant premium'
    ],
    true
  );
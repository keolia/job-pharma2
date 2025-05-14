-- Mise à jour des plans Stripe avec les price IDs de test
DELETE FROM stripe_plans;

INSERT INTO stripe_plans (name, stripe_price_id, description, price, duration, features, is_recurring)
VALUES
  (
    'Basic',
    'price_1OvpKJiqrbuwYdQD46CHIEY', -- Remplacer par votre price ID de test
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
    'price_1OvpKJiqrbuwYdQxMkUC8PT', -- Remplacer par votre price ID de test
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
    'Enterprise',
    'price_1OvpKJiqrbuwYdQnMDF6VrH', -- Remplacer par votre price ID de test
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
-- Update Stripe plans with test mode price IDs
DELETE FROM stripe_plans;

INSERT INTO stripe_plans (name, stripe_price_id, description, price, duration, features, is_recurring)
VALUES
  (
    'Basic',
    'price_1OvpKJiqrbuwYdQxMkUC8PT',
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
    'price_1OvpLJiqrbuwYdQnMDF6VrH',
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
    'price_1OvpMJiqrbuwYdQ7sI4hr88w',
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
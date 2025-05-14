/*
  # Configuration des plans Stripe

  1. Nouvelle Table
    - `stripe_plans`
      - `id` (uuid, primary key)
      - `name` (text) - Nom du plan
      - `stripe_price_id` (text) - ID du prix Stripe
      - `description` (text) - Description du plan
      - `price` (integer) - Prix en centimes
      - `duration` (text) - Durée de validité
      - `features` (text[]) - Liste des fonctionnalités
      - `is_recurring` (boolean) - Si c'est un abonnement récurrent
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Sécurité
    - Enable RLS
    - Politique de lecture publique
*/

-- Create stripe_plans table
CREATE TABLE IF NOT EXISTS stripe_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  stripe_price_id text NOT NULL UNIQUE,
  description text NOT NULL,
  price integer NOT NULL,
  duration text NOT NULL,
  features text[] NOT NULL,
  is_recurring boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE stripe_plans ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON stripe_plans
  FOR SELECT
  TO public
  USING (true);

-- Insert the three plans
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
    'Enterprise',
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
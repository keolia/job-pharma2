/*
  # Add realistic job postings
  
  1. Changes
    - Create 190 job postings with varied content
    - Add pagination support (20 per page)
    - Use realistic company names and locations
    
  2. Data
    - Varied job titles and descriptions
    - Realistic salary ranges
    - Multiple cities and contract types
*/

-- Create test user if not exists
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'test@pharma-job.com',
  crypt('test123456', gen_salt('bf')),
  now(),
  '{"company_name": "Pharmacie Test"}'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Create test profile if not exists
INSERT INTO public.profiles (
  id,
  company_name
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Pharmacie Test'
) ON CONFLICT (id) DO NOTHING;

-- Insert 190 job postings
INSERT INTO job_postings (
  user_id,
  title,
  company,
  postal_code,
  city,
  contract_type,
  salary,
  schedule,
  description,
  requirements,
  benefits,
  status,
  created_at,
  updated_at
)
SELECT
  '00000000-0000-0000-0000-000000000001'::uuid as user_id,
  CASE floor(random() * 7)
    WHEN 0 THEN 'Pharmacien Titulaire H/F'
    WHEN 1 THEN 'Pharmacien Adjoint H/F'
    WHEN 2 THEN 'Préparateur en Pharmacie H/F'
    WHEN 3 THEN 'Pharmacien Assistant H/F'
    WHEN 4 THEN 'Pharmacien Remplaçant H/F'
    WHEN 5 THEN 'Pharmacien Clinicien H/F'
    ELSE 'Pharmacien Orthopédiste H/F'
  END as title,
  CASE floor(random() * 15)
    WHEN 0 THEN 'Pharmacie Centrale'
    WHEN 1 THEN 'Grande Pharmacie'
    WHEN 2 THEN 'Pharmacie du Marché'
    WHEN 3 THEN 'Pharmacie Saint-Pierre'
    WHEN 4 THEN 'Pharmacie des Halles'
    WHEN 5 THEN 'Pharmacie Lafayette'
    WHEN 6 THEN 'Pharmacie du Centre'
    WHEN 7 THEN 'Pharmacie de la Gare'
    WHEN 8 THEN 'Pharmacie Principale'
    WHEN 9 THEN 'Pharmacie de la Place'
    WHEN 10 THEN 'Pharmacie du Parc'
    WHEN 11 THEN 'Pharmacie des Écoles'
    WHEN 12 THEN 'Pharmacie de l''Université'
    WHEN 13 THEN 'Pharmacie du Port'
    ELSE 'Pharmacie de l''Hôtel de Ville'
  END as company,
  CASE floor(random() * 20)
    WHEN 0 THEN '75000' WHEN 1 THEN '69000' WHEN 2 THEN '13000'
    WHEN 3 THEN '33000' WHEN 4 THEN '59000' WHEN 5 THEN '31000'
    WHEN 6 THEN '44000' WHEN 7 THEN '67000' WHEN 8 THEN '06000'
    WHEN 9 THEN '35000' WHEN 10 THEN '34000' WHEN 11 THEN '38000'
    WHEN 12 THEN '37000' WHEN 13 THEN '63000' WHEN 14 THEN '76000'
    WHEN 15 THEN '54000' WHEN 16 THEN '57000' WHEN 17 THEN '51000'
    WHEN 18 THEN '76600' ELSE '21000'
  END as postal_code,
  CASE floor(random() * 20)
    WHEN 0 THEN 'Paris' WHEN 1 THEN 'Lyon' WHEN 2 THEN 'Marseille'
    WHEN 3 THEN 'Bordeaux' WHEN 4 THEN 'Lille' WHEN 5 THEN 'Toulouse'
    WHEN 6 THEN 'Nantes' WHEN 7 THEN 'Strasbourg' WHEN 8 THEN 'Nice'
    WHEN 9 THEN 'Rennes' WHEN 10 THEN 'Montpellier' WHEN 11 THEN 'Grenoble'
    WHEN 12 THEN 'Tours' WHEN 13 THEN 'Clermont-Ferrand' WHEN 14 THEN 'Rouen'
    WHEN 15 THEN 'Nancy' WHEN 16 THEN 'Metz' WHEN 17 THEN 'Reims'
    WHEN 18 THEN 'Le Havre' ELSE 'Dijon'
  END as city,
  CASE floor(random() * 3)
    WHEN 0 THEN 'CDI'
    WHEN 1 THEN 'CDD'
    ELSE 'Intérim'
  END as contract_type,
  (35 + floor(random() * 35)::int)::text || ' 000€ - ' || (45 + floor(random() * 35)::int)::text || ' 000€ /an' as salary,
  CASE floor(random() * 7)
    WHEN 0 THEN 'Temps plein'
    WHEN 1 THEN 'Temps partiel'
    WHEN 2 THEN '35h/semaine'
    WHEN 3 THEN '39h/semaine'
    WHEN 4 THEN 'Horaires aménagés'
    WHEN 5 THEN 'Du lundi au vendredi'
    ELSE 'Incluant samedi'
  END as schedule,
  CASE floor(random() * 5)
    WHEN 0 THEN E'Notre officine dynamique recherche un professionnel de santé motivé pour rejoindre notre équipe. Vos missions principales seront :\n\n- Dispensation des médicaments et conseil aux patients\n- Suivi des ordonnances et validation des prescriptions\n- Gestion des stocks et des commandes\n- Participation aux gardes\n- Animation de l''équipe officinale\n- Développement des services et du conseil'
    WHEN 1 THEN E'Au sein d''une pharmacie moderne et innovante, vous intégrerez une équipe passionnée. Vos responsabilités incluront :\n\n- Accueil et conseil personnalisé des patients\n- Analyse et validation des prescriptions\n- Participation à la gestion des stocks\n- Développement des entretiens pharmaceutiques\n- Suivi des patients chroniques\n- Participation aux gardes du secteur'
    WHEN 2 THEN E'Pharmacie en pleine expansion recherche un professionnel dynamique. Vous serez chargé(e) de :\n\n- Délivrance des médicaments et dispositifs médicaux\n- Conseil et accompagnement des patients\n- Gestion du back office et des commandes\n- Animation des campagnes de prévention\n- Participation au développement de l''activité\n- Service de garde'
    WHEN 3 THEN E'Rejoignez une équipe dynamique dans une pharmacie à taille humaine. Missions principales :\n\n- Dispensation et conseil aux patients\n- Validation des ordonnances\n- Gestion du tiers payant\n- Merchandising et mise en rayon\n- Participation aux gardes\n- Développement des services'
    ELSE E'Dans le cadre de notre développement, nous recherchons un professionnel motivé. Vos missions :\n\n- Accueil et conseil à la clientèle\n- Délivrance des médicaments\n- Suivi des patients chroniques\n- Gestion des stocks\n- Participation aux gardes\n- Animation de l''espace de vente'
  END as description,
  CASE floor(random() * 5)
    WHEN 0 THEN E'- Diplôme d''État de Docteur en Pharmacie exigé\n- Excellentes qualités relationnelles\n- Rigueur et sens de l''organisation\n- Esprit d''équipe\n- Maîtrise de l''outil informatique'
    WHEN 1 THEN E'- Diplôme requis selon le poste\n- Expérience en officine souhaitée\n- Sens du service client\n- Capacité d''adaptation\n- Connaissance du logiciel LGPI apprécié'
    WHEN 2 THEN E'- Formation en accord avec le poste\n- Dynamisme et motivation\n- Excellent relationnel\n- Polyvalence\n- Maîtrise des outils digitaux'
    WHEN 3 THEN E'- Diplôme d''État obligatoire\n- Expérience similaire appréciée\n- Capacité à travailler en équipe\n- Rigueur et organisation\n- Connaissance des logiciels métier'
    ELSE E'- Diplôme correspondant au poste\n- Sens des responsabilités\n- Qualités relationnelles\n- Esprit d''initiative\n- Maîtrise informatique'
  END as requirements,
  CASE floor(random() * 5)
    WHEN 0 THEN E'- Mutuelle d''entreprise\n- Tickets restaurant\n- Formation continue\n- Prime sur objectifs\n- RTT\n- Participation au transport'
    WHEN 1 THEN E'- Complémentaire santé\n- Primes annuelles\n- Plan de formation\n- Participation aux bénéfices\n- Tickets restaurant\n- CE avantageux'
    WHEN 2 THEN E'- Mutuelle familiale\n- 13ème mois\n- Formation régulière\n- Prime d''intéressement\n- Chèques vacances\n- Transport pris en charge'
    WHEN 3 THEN E'- Package santé complet\n- Rémunération attractive\n- Évolution possible\n- Primes diverses\n- RTT\n- Ambiance conviviale'
    ELSE E'- Mutuelle avantageuse\n- Tickets restaurant\n- Formation personnalisée\n- Primes trimestrielles\n- Plan d''épargne\n- Transport remboursé'
  END as benefits,
  'active' as status,
  now() - (random() * interval '30 days') as created_at,
  now() - (random() * interval '30 days') as updated_at
FROM generate_series(1, 190);
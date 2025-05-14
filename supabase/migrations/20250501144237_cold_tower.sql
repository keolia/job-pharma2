-- Create test job postings
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
  id as user_id,
  CASE floor(random() * 5)
    WHEN 0 THEN 'Pharmacien Titulaire H/F'
    WHEN 1 THEN 'Pharmacien Adjoint H/F'
    WHEN 2 THEN 'Préparateur en Pharmacie H/F'
    WHEN 3 THEN 'Pharmacien Assistant H/F'
    ELSE 'Pharmacien Remplaçant H/F'
  END as title,
  CASE floor(random() * 12)
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
    ELSE 'Pharmacie des Écoles'
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
  (35 + floor(random() * 25)::int)::text || ' 000€ - ' || (45 + floor(random() * 25)::int)::text || ' 000€ /an' as salary,
  CASE floor(random() * 5)
    WHEN 0 THEN 'Temps plein'
    WHEN 1 THEN 'Temps partiel'
    WHEN 2 THEN '35h/semaine'
    WHEN 3 THEN '39h/semaine'
    ELSE 'Horaires aménagés'
  END as schedule,
  'Notre officine recherche un professionnel de santé dynamique et motivé. Vos missions principales seront :
- Dispensation et conseil aux patients
- Gestion des ordonnances et suivi des traitements
- Participation à la gestion des stocks
- Animation de l''équipe officinale
- Développement des services et du conseil' as description,
  'Diplôme d''État de Docteur en Pharmacie
Excellentes qualités relationnelles
Rigueur et organisation
Esprit d''équipe
Maîtrise de l''outil informatique' as requirements,
  'Mutuelle d''entreprise
Tickets restaurant
Formation continue
Prime sur objectifs
RTT
Participation au transport' as benefits,
  'active' as status,
  now() - (random() * interval '30 days') as created_at,
  now() - (random() * interval '30 days') as updated_at
FROM auth.users
CROSS JOIN generate_series(1, 10)
WHERE auth.users.id IS NOT NULL
LIMIT 200;
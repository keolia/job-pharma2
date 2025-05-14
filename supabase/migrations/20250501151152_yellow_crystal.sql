-- Mettre à jour le statut des offres existantes
UPDATE job_postings SET status = 'active' WHERE status IS NULL OR status = 'pending';

-- Vérifier et corriger les permissions RLS
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Users can read own job postings" ON job_postings;

-- Créer une nouvelle politique permettant la lecture publique des offres actives
CREATE POLICY "Anyone can read active job postings"
ON job_postings
FOR SELECT
TO public
USING (status = 'active');
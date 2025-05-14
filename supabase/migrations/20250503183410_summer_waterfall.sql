/*
  # Update job postings with correct postal codes
  
  1. Changes
    - Update postal codes to match their corresponding cities
    - Ensure postal code format is valid
    - Match real French postal codes
*/

UPDATE job_postings
SET postal_code = CASE city
    WHEN 'Paris' THEN '75000'
    WHEN 'Lyon' THEN '69000'
    WHEN 'Marseille' THEN '13000'
    WHEN 'Bordeaux' THEN '33000'
    WHEN 'Lille' THEN '59000'
    WHEN 'Toulouse' THEN '31000'
    WHEN 'Nantes' THEN '44000'
    WHEN 'Strasbourg' THEN '67000'
    WHEN 'Nice' THEN '06000'
    WHEN 'Rennes' THEN '35000'
    WHEN 'Montpellier' THEN '34000'
    WHEN 'Grenoble' THEN '38000'
    WHEN 'Tours' THEN '37000'
    WHEN 'Clermont-Ferrand' THEN '63000'
    WHEN 'Rouen' THEN '76000'
    WHEN 'Nancy' THEN '54000'
    WHEN 'Metz' THEN '57000'
    WHEN 'Reims' THEN '51100'
    WHEN 'Le Havre' THEN '76600'
    WHEN 'Dijon' THEN '21000'
    ELSE postal_code
END
WHERE status = 'active';
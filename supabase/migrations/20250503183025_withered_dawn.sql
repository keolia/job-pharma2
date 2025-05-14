/*
  # Clean test job postings
  
  1. Changes
    - Delete all job postings from test pharmacy
    - Keep legitimate job postings
*/

-- Delete job postings from test pharmacy
DELETE FROM job_postings 
WHERE company = 'Pharmacie Test';
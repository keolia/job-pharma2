/*
  # Add Stripe-related fields to job_postings table

  1. Changes
    - Add stripe_customer_id column
    - Add stripe_subscription_id column
    - Add plan column
    - Add user_email column
*/

ALTER TABLE job_postings 
ADD COLUMN IF NOT EXISTS stripe_customer_id text,
ADD COLUMN IF NOT EXISTS stripe_subscription_id text,
ADD COLUMN IF NOT EXISTS plan text,
ADD COLUMN IF NOT EXISTS user_email text;
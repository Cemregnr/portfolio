-- Add missing fields to user_profiles table
-- Run this in Supabase SQL Editor

-- Add image column if it doesn't exist
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS image TEXT;

-- Add other missing profile fields
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS job_title TEXT;

ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS country TEXT;

ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS biography TEXT;

-- Update any existing records to have default values
UPDATE user_profiles 
SET 
  image = COALESCE(image, '/avatar.jpg'),
  job_title = COALESCE(job_title, ''),
  country = COALESCE(country, ''),
  biography = COALESCE(biography, '')
WHERE image IS NULL OR job_title IS NULL OR country IS NULL OR biography IS NULL;
-- Check existing table structure to identify column types
-- Run this first to see what types your existing columns have

SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable 
FROM information_schema.columns 
WHERE table_name IN ('user_profiles', 'articles', 'categories', 'profiles')
ORDER BY table_name, ordinal_position;

-- Also check if you have a 'profiles' table instead of 'user_profiles'
SELECT table_name 
FROM information_schema.tables 
WHERE table_name IN ('user_profiles', 'profiles', 'articles', 'categories') 
AND table_schema = 'public';
-- Fix profiles table schema - Safe approach with existing table
-- Run this in Supabase SQL Editor

-- Create new profiles table with correct UUID type (if not exists)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    role TEXT DEFAULT 'user',
    bio TEXT,
    image TEXT,
    job_title TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns if they don't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'image') THEN
        ALTER TABLE user_profiles ADD COLUMN image TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'job_title') THEN
        ALTER TABLE user_profiles ADD COLUMN job_title TEXT;
    END IF;
END $$;

-- Enable Row Level Security (if not already enabled)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'user_profiles' AND relrowsecurity = true) THEN
        ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Drop existing policies on user_profiles if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Service role can insert profiles" ON user_profiles;

-- Create policies for user_profiles table
-- Allow users to view their own profile
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile  
CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Allow users to insert their own profile during registration
CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow service role to insert profiles (for registration process)
CREATE POLICY "Service role can insert profiles" ON user_profiles
    FOR INSERT WITH CHECK (true);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, full_name, role)
    VALUES (new.id, new.raw_user_meta_data->>'fullName', 'user');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create Categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns to categories table if they don't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'categories' AND column_name = 'description') THEN
        ALTER TABLE categories ADD COLUMN description TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'categories' AND column_name = 'created_at') THEN
        ALTER TABLE categories ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Create Articles table
CREATE TABLE IF NOT EXISTS articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    thumbnail TEXT,
    slug TEXT UNIQUE NOT NULL,
    profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id),
    date_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    views INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT false
);

-- Add missing columns to articles table if they don't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'published') THEN
        ALTER TABLE articles ADD COLUMN published BOOLEAN DEFAULT false;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'views') THEN
        ALTER TABLE articles ADD COLUMN views INTEGER DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articles' AND column_name = 'thumbnail') THEN
        ALTER TABLE articles ADD COLUMN thumbnail TEXT;
    END IF;
END $$;

-- Check if profile_id needs to be converted from integer to UUID
DO $$ 
BEGIN 
    -- Check if profile_id is integer and convert to UUID
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'articles' 
        AND column_name = 'profile_id' 
        AND data_type = 'integer'
    ) THEN
        -- Drop any existing policies that depend on profile_id
        DROP POLICY IF EXISTS "Anyone can view published articles" ON articles;
        DROP POLICY IF EXISTS "Users can create their own articles" ON articles;
        DROP POLICY IF EXISTS "Users can update their own articles" ON articles;
        DROP POLICY IF EXISTS "Users can delete their own articles" ON articles;
        
        -- Add a temporary UUID column
        ALTER TABLE articles ADD COLUMN profile_id_uuid UUID;
        
        -- Remove the foreign key constraint if it exists
        ALTER TABLE articles DROP CONSTRAINT IF EXISTS articles_profile_id_fkey;
        
        -- Drop the old integer column
        ALTER TABLE articles DROP COLUMN profile_id;
        
        -- Rename the UUID column
        ALTER TABLE articles RENAME COLUMN profile_id_uuid TO profile_id;
        
        -- Add the proper foreign key constraint
        ALTER TABLE articles ADD CONSTRAINT articles_profile_id_fkey 
            FOREIGN KEY (profile_id) REFERENCES user_profiles(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Enable RLS on new tables
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'categories' AND relrowsecurity = true) THEN
        ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'articles' AND relrowsecurity = true) THEN
        ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Drop existing policies on categories and articles if they exist
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
DROP POLICY IF EXISTS "Anyone can view published articles" ON articles;
DROP POLICY IF EXISTS "Users can create their own articles" ON articles;
DROP POLICY IF EXISTS "Users can update their own articles" ON articles;
DROP POLICY IF EXISTS "Users can delete their own articles" ON articles;

-- Create policies for categories (publicly readable)
CREATE POLICY "Anyone can view categories" ON categories
    FOR SELECT USING (true);

-- Create policies for articles
CREATE POLICY "Anyone can view published articles" ON articles
    FOR SELECT USING (published = true OR auth.uid() = profile_id);

CREATE POLICY "Users can create their own articles" ON articles
    FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own articles" ON articles
    FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own articles" ON articles
    FOR DELETE USING (auth.uid() = profile_id);

-- Insert some default categories
INSERT INTO categories (title, slug, description) VALUES
    ('Grammar', 'grammar', 'English grammar lessons and exercises'),
    ('Vocabulary', 'vocabulary', 'English vocabulary building'),
    ('Speaking', 'speaking', 'English speaking practice and tips'),
    ('Writing', 'writing', 'English writing skills and techniques'),
    ('Listening', 'listening', 'English listening comprehension'),
    ('Reading', 'reading', 'English reading skills and practice')
ON CONFLICT (slug) DO NOTHING;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.user_profiles TO anon, authenticated;
GRANT ALL ON public.categories TO anon, authenticated;
GRANT ALL ON public.articles TO anon, authenticated;
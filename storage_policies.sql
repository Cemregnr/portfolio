-- Storage RLS Policies for blog-bucket
-- Run these commands in Supabase SQL Editor

-- Simple policy to allow authenticated users to upload to blog-bucket
CREATE POLICY "Allow authenticated uploads to blog-bucket" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'blog-bucket');

-- Policy to allow public read access to all files in blog-bucket
CREATE POLICY "Allow public downloads from blog-bucket" ON storage.objects
FOR SELECT 
USING (bucket_id = 'blog-bucket');

-- Policy to allow authenticated users to update files in blog-bucket
CREATE POLICY "Allow authenticated updates to blog-bucket" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'blog-bucket');

-- Policy to allow authenticated users to delete files in blog-bucket
CREATE POLICY "Allow authenticated deletes from blog-bucket" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'blog-bucket');

-- After running these policies, avatar upload should work!
-- Make scans bucket private
UPDATE storage.buckets SET public = false WHERE id = 'scans';

-- Remove public access policy
DROP POLICY IF EXISTS "Public can view scans" ON storage.objects;
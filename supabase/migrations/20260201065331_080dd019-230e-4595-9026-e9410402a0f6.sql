-- Add UPDATE policy for scan_history table
CREATE POLICY "Users can update their own scans" 
ON public.scan_history 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Drop existing restrictive policies and recreate as permissive
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

DROP POLICY IF EXISTS "Users can view their own scans" ON public.scan_history;
DROP POLICY IF EXISTS "Users can insert their own scans" ON public.scan_history;
DROP POLICY IF EXISTS "Users can delete their own scans" ON public.scan_history;

-- Recreate profiles policies as PERMISSIVE (default)
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Recreate scan_history policies as PERMISSIVE (default)
CREATE POLICY "Users can view their own scans" 
ON public.scan_history 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scans" 
ON public.scan_history 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scans" 
ON public.scan_history 
FOR DELETE 
USING (auth.uid() = user_id);
-- Add DELETE policy for profiles table
CREATE POLICY "Users can delete their own profile" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Revoke direct access from anon role to ensure RLS is enforced
REVOKE ALL ON public.profiles FROM anon;
REVOKE ALL ON public.scan_history FROM anon;
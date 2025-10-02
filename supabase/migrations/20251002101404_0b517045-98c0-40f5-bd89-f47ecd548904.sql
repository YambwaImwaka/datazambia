-- Fix critical security vulnerability in profiles table RLS policy
-- Current policy allows anyone to view all user profiles, exposing personal data

-- Drop the vulnerable policy that allows public access to all profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create a secure policy that only allows users to view their own profile
CREATE POLICY "Users can view only their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Add a comment explaining the security fix
COMMENT ON POLICY "Users can view only their own profile" ON public.profiles 
IS 'Security fix: Prevents unauthorized access to user profile data. Users can only view their own profile information.';
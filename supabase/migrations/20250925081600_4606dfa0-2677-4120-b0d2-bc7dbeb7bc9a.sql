-- Fix security vulnerability in user_consent table RLS policy
-- The current policy allows anyone to view consent records if session_id is not null
-- This is a serious privacy violation

-- Drop the existing vulnerable policy
DROP POLICY IF EXISTS "Users can view their own consent records" ON public.user_consent;

-- Create a secure policy that only allows:
-- 1. Authenticated users to view their own consent records
-- 2. Anonymous users cannot query consent records directly for privacy protection
CREATE POLICY "Users can view only their own consent records"
ON public.user_consent
FOR SELECT
USING (auth.uid() = user_id AND user_id IS NOT NULL);

-- Keep the insert policy as is (allows anonymous consent recording)
-- Keep the update policy as is (only authenticated users can update their own)

-- Add a comment explaining the security fix
COMMENT ON POLICY "Users can view only their own consent records" ON public.user_consent 
IS 'Security fix: Prevents unauthorized access to user consent records. Only authenticated users can view their own consent data.';

-- Drop all existing policies on user_roles to start fresh
DROP POLICY IF EXISTS "Users can manage their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Existing admins can manage all roles" ON public.user_roles;

-- Create a single, simple policy that allows users to manage their own roles
-- This will allow the initial admin creation without recursion
CREATE POLICY "Users can manage their own user roles" 
  ON public.user_roles 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

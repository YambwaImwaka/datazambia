
-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Admin role management policy" ON public.user_roles;

-- Create a simpler policy that avoids recursion by not using has_role()
-- This policy allows users to manage their own roles and view their own roles
CREATE POLICY "Users can manage their own roles" 
  ON public.user_roles 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create a separate policy for admins to manage all roles
-- We'll use a direct query instead of the has_role() function to avoid recursion
CREATE POLICY "Existing admins can manage all roles" 
  ON public.user_roles 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur 
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'::app_role
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles ur 
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'::app_role
    )
  );

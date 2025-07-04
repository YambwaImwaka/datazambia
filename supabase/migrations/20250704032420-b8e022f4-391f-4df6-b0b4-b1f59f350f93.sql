
-- Update the RLS policy to allow users to insert their own admin role
-- This is needed for the initial admin conversion
DROP POLICY IF EXISTS "Only admins can update roles" ON public.user_roles;

-- Create a new policy that allows admins to manage all roles, but also allows
-- users to insert an admin role for themselves if no admin role exists yet
CREATE POLICY "Admin role management policy" 
  ON public.user_roles 
  FOR ALL 
  USING (
    -- Admins can manage all roles
    has_role('admin'::app_role) OR 
    -- Users can insert admin role for themselves if they don't already have one
    (auth.uid() = user_id AND role = 'admin'::app_role AND NOT EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'::app_role
    ))
  )
  WITH CHECK (
    -- Same conditions for inserts/updates
    has_role('admin'::app_role) OR 
    (auth.uid() = user_id AND role = 'admin'::app_role AND NOT EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'::app_role
    ))
  );

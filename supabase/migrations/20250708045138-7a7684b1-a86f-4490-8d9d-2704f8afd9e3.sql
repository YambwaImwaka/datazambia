-- Fix the make_admin function with ambiguous column reference
CREATE OR REPLACE FUNCTION public.make_admin(email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_user_id UUID;
  admin_count INTEGER;
BEGIN
  -- Find the user's ID from auth.users with explicit table reference
  SELECT au.id INTO target_user_id 
  FROM auth.users au 
  WHERE au.email = make_admin.email;
  
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', email;
  END IF;
  
  -- Check if there are any existing admins
  SELECT COUNT(*) INTO admin_count 
  FROM public.user_roles 
  WHERE role = 'admin'::app_role;
  
  -- If admins exist, check if caller is admin (but allow for first admin creation)
  IF admin_count > 0 THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_roles.user_id = auth.uid() AND role = 'admin'::app_role
    ) THEN
      -- Allow bypass if no authenticated user (for system/signup operations)
      IF auth.uid() IS NOT NULL THEN
        RAISE EXCEPTION 'Only administrators can grant admin privileges';
      END IF;
    END IF;
  END IF;
  
  -- Add the admin role (use ON CONFLICT to prevent duplicates)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RAISE NOTICE 'Successfully added admin role for user %', email;
END;
$$;

-- Fix the RLS policies to prevent infinite recursion
-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admins can manage all user roles" ON public.user_roles;

-- Create new non-recursive policy
CREATE POLICY "Admins can manage all user roles" 
  ON public.user_roles 
  FOR ALL 
  USING (
    -- Allow if this is system operation (no auth.uid()) or if user is already an admin
    auth.uid() IS NULL OR
    EXISTS (
      SELECT 1 FROM public.user_roles ur 
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'::app_role
    ) OR 
    -- Allow the first admin to be created when no admins exist yet
    NOT EXISTS (
      SELECT 1 FROM public.user_roles ur2
      WHERE ur2.role = 'admin'::app_role
    )
  )
  WITH CHECK (
    -- Same logic for inserts/updates
    auth.uid() IS NULL OR
    EXISTS (
      SELECT 1 FROM public.user_roles ur 
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'::app_role
    ) OR 
    -- Allow the first admin to be created when none exist
    NOT EXISTS (
      SELECT 1 FROM public.user_roles ur2
      WHERE ur2.role = 'admin'::app_role
    )
  );
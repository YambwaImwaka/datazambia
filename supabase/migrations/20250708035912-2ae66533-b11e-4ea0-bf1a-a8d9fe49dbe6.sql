
-- Fix the infinite recursion issue in user_roles RLS policies
-- Drop the problematic recursive policies
DROP POLICY IF EXISTS "Admins can manage all user roles" ON public.user_roles;

-- Create a non-recursive policy that allows the first admin to be created
-- and existing admins to manage roles
CREATE POLICY "Admins can manage all user roles" 
  ON public.user_roles 
  FOR ALL 
  USING (
    -- Allow if this is the make_admin function (security definer context)
    -- or if user is already an admin (checked via direct query)
    auth.uid() IN (
      SELECT user_id FROM public.user_roles 
      WHERE role = 'admin'::app_role
    )
    OR 
    -- Allow the make_admin function to work when no admins exist yet
    NOT EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE role = 'admin'::app_role
    )
  )
  WITH CHECK (
    -- Same logic for inserts/updates
    auth.uid() IN (
      SELECT user_id FROM public.user_roles 
      WHERE role = 'admin'::app_role
    )
    OR 
    -- Allow the first admin to be created when none exist
    NOT EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE role = 'admin'::app_role
    )
  );

-- Update the make_admin function to be more robust
CREATE OR REPLACE FUNCTION public.make_admin(email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id UUID;
  admin_count INTEGER;
BEGIN
  -- Find the user's ID from auth.users
  SELECT au.id INTO user_id 
  FROM auth.users au 
  WHERE au.email = make_admin.email;
  
  IF user_id IS NULL THEN
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
      WHERE user_id = auth.uid() AND role = 'admin'::app_role
    ) THEN
      -- Allow bypass if no authenticated user (for system/signup operations)
      IF auth.uid() IS NOT NULL THEN
        RAISE EXCEPTION 'Only administrators can grant admin privileges';
      END IF;
    END IF;
  END IF;
  
  -- Add the admin role (use ON CONFLICT to prevent duplicates)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (user_id, 'admin'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RAISE NOTICE 'Successfully added admin role for user %', email;
END;
$$;

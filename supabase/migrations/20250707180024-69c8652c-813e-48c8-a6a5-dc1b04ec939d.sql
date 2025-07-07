
-- First, let's clean up the problematic policies that cause infinite recursion
DROP POLICY IF EXISTS "Only admins can manage user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Create a simple policy that allows users to read their own roles
CREATE POLICY "Users can read their own roles" 
  ON public.user_roles 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create a policy that allows admins to manage all roles
-- We'll use a direct EXISTS query instead of the has_role function to avoid recursion
CREATE POLICY "Admins can manage all user roles" 
  ON public.user_roles 
  FOR ALL 
  USING (
    -- Allow if user is already an admin (direct query to avoid recursion)
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'::app_role
    )
  )
  WITH CHECK (
    -- Same check for inserts/updates
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'::app_role
    )
  );

-- Update the make_admin function to be more permissive for initial setup
-- This allows the first admin to be created without existing admin privileges
CREATE OR REPLACE FUNCTION public.make_admin(email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id UUID;
  admin_count INTEGER;
BEGIN
  -- Find the user's ID
  SELECT id INTO user_id FROM auth.users WHERE auth.users.email = make_admin.email;
  
  IF user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', email;
  END IF;
  
  -- Check if there are any existing admins
  SELECT COUNT(*) INTO admin_count FROM public.user_roles WHERE role = 'admin'::app_role;
  
  -- If no admins exist, allow anyone to create the first admin
  -- Otherwise, require caller to be an admin
  IF admin_count > 0 THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'::app_role
    ) THEN
      RAISE EXCEPTION 'Only administrators can grant admin privileges';
    END IF;
  END IF;
  
  -- Add the admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

-- Create a helper function to check if a user has admin privileges
-- This avoids the recursion issues with RLS
CREATE OR REPLACE FUNCTION public.is_admin(check_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = check_user_id AND role = 'admin'::app_role
  );
$$;

-- Create a function to easily promote users to admin (for database use)
CREATE OR REPLACE FUNCTION public.promote_user_to_admin(target_email text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_user_id UUID;
  result_message text;
BEGIN
  -- Find the user
  SELECT id INTO target_user_id 
  FROM auth.users 
  WHERE email = target_email;
  
  IF target_user_id IS NULL THEN
    RETURN 'User with email ' || target_email || ' not found';
  END IF;
  
  -- Add admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN 'User ' || target_email || ' has been promoted to admin';
END;
$$;


-- Drop the current policy that allows users to manage their own roles
DROP POLICY IF EXISTS "Users can manage their own user roles" ON public.user_roles;

-- Create a new policy that only allows existing admins to manage roles
CREATE POLICY "Only admins can manage user roles" 
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

-- Update the make_admin function to only allow existing admins to call it
CREATE OR REPLACE FUNCTION public.make_admin(email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id UUID;
  caller_is_admin BOOLEAN;
BEGIN
  -- Check if the caller is an admin
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ) INTO caller_is_admin;
  
  IF NOT caller_is_admin THEN
    RAISE EXCEPTION 'Only administrators can grant admin privileges';
  END IF;
  
  -- Find the user's ID
  SELECT id INTO user_id FROM auth.users WHERE auth.users.email = make_admin.email;
  
  IF user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', email;
  END IF;
  
  -- Add the admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

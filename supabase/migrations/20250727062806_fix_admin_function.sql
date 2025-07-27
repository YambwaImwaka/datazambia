-- Fix the make_admin function to properly handle first admin creation
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
  
  -- If admins exist, check if caller is admin
  IF admin_count > 0 THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_roles.user_id = auth.uid() AND role = 'admin'::app_role
    ) THEN
      RAISE EXCEPTION 'Only administrators can grant admin privileges';
    END IF;
  END IF;
  
  -- Add the admin role (use ON CONFLICT to prevent duplicates)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RAISE NOTICE 'Successfully added admin role for user %', email;
END;
$$;

-- Fix infinite recursion in RLS policies
-- Drop all existing policies on user_roles
DROP POLICY IF EXISTS "Admins can manage all user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "System can manage user roles" ON public.user_roles;

-- Create a simple function to check admin status without recursion
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  -- If no user_id provided, return false
  IF user_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Check if user has admin role
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = is_admin.user_id 
    AND user_roles.role = 'admin'::app_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create new non-recursive policies
CREATE POLICY "Admins can manage all user roles" 
  ON public.user_roles 
  FOR ALL 
  USING (
    -- Allow system operations (no auth.uid())
    auth.uid() IS NULL OR
    -- Allow if user is admin
    public.is_admin() OR
    -- Allow first admin creation when no admins exist
    (NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin'::app_role))
  )
  WITH CHECK (
    -- Same logic for inserts/updates
    auth.uid() IS NULL OR
    public.is_admin() OR
    (NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin'::app_role))
  );

-- Fix analytics policies to use the new function
DROP POLICY IF EXISTS "Admin can view all analytics events" ON public.analytics_events;
DROP POLICY IF EXISTS "Admin can view all page views" ON public.analytics_page_views;
DROP POLICY IF EXISTS "Admin can view all sessions" ON public.analytics_sessions;

CREATE POLICY "Admin can view all analytics events" 
  ON public.analytics_events 
  FOR SELECT 
  USING (public.is_admin());

CREATE POLICY "Admin can view all page views" 
  ON public.analytics_page_views 
  FOR SELECT 
  USING (public.is_admin());

CREATE POLICY "Admin can view all sessions" 
  ON public.analytics_sessions 
  FOR SELECT 
  USING (public.is_admin());

-- Fix other admin policies
DROP POLICY IF EXISTS "Admins can manage all user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all processing logs" ON public.data_processing_log;

CREATE POLICY "Admins can view all processing logs" 
  ON public.data_processing_log 
  FOR SELECT 
  USING (public.is_admin());


-- Delete user and all associated data for hello@datazambia.com
-- We need to delete in the correct order to avoid foreign key constraint violations

-- First, get the user ID
DO $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Get the user ID from auth.users
  SELECT id INTO target_user_id 
  FROM auth.users 
  WHERE email = 'hello@datazambia.com';
  
  IF target_user_id IS NOT NULL THEN
    -- Delete from analytics_events (this was causing the constraint violation)
    DELETE FROM public.analytics_events WHERE user_id = target_user_id;
    
    -- Delete from analytics_sessions
    DELETE FROM public.analytics_sessions WHERE user_id = target_user_id;
    
    -- Delete from user_roles
    DELETE FROM public.user_roles WHERE user_id = target_user_id;
    
    -- Delete from user_favorites
    DELETE FROM public.user_favorites WHERE user_id = target_user_id;
    
    -- Delete from notifications
    DELETE FROM public.notifications WHERE user_id = target_user_id;
    
    -- Delete from media
    DELETE FROM public.media WHERE user_id = target_user_id;
    
    -- Delete from profiles (this will cascade due to foreign key)
    DELETE FROM public.profiles WHERE id = target_user_id;
    
    -- Finally delete from auth.users
    DELETE FROM auth.users WHERE id = target_user_id;
    
    RAISE NOTICE 'Successfully deleted user hello@datazambia.com and all associated data';
  ELSE
    RAISE NOTICE 'User hello@datazambia.com not found';
  END IF;
END $$;

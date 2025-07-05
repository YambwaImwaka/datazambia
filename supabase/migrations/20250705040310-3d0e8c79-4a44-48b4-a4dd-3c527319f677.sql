
-- Create consent tracking table for GDPR compliance
CREATE TABLE public.user_consent (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT,
  consent_type TEXT NOT NULL, -- 'analytics', 'marketing', 'functional'
  consent_given BOOLEAN NOT NULL DEFAULT false,
  consent_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address INET,
  user_agent TEXT,
  withdrawal_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create data processing log for audit trail
CREATE TABLE public.data_processing_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL, -- 'create', 'read', 'update', 'delete', 'export'
  data_type TEXT NOT NULL, -- 'profile', 'analytics', 'preferences'
  description TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for consent tracking
ALTER TABLE public.user_consent ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own consent records" 
  ON public.user_consent 
  FOR SELECT 
  USING (auth.uid() = user_id OR session_id IS NOT NULL);

CREATE POLICY "Anyone can insert consent records" 
  ON public.user_consent 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can update their own consent" 
  ON public.user_consent 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add RLS policies for data processing log
ALTER TABLE public.data_processing_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all processing logs" 
  ON public.data_processing_log 
  FOR SELECT 
  USING (has_role('admin'));

CREATE POLICY "Users can view their own processing logs" 
  ON public.data_processing_log 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert processing logs" 
  ON public.data_processing_log 
  FOR INSERT 
  WITH CHECK (true);

-- Update analytics tables to be GDPR compliant by making IP addresses optional and adding consent tracking
ALTER TABLE public.analytics_events ADD COLUMN consent_id UUID REFERENCES public.user_consent(id);
ALTER TABLE public.analytics_sessions ADD COLUMN consent_id UUID REFERENCES public.user_consent(id);

-- Create function to anonymize user data
CREATE OR REPLACE FUNCTION public.anonymize_user_data(target_user_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Anonymize profile data
  UPDATE public.profiles 
  SET 
    username = 'anonymous_' || EXTRACT(epoch FROM now())::text,
    full_name = 'Anonymous User',
    bio = NULL,
    location = NULL,
    avatar_url = NULL,
    updated_at = now()
  WHERE id = target_user_id;
  
  -- Anonymize or remove analytics data
  UPDATE public.analytics_events 
  SET 
    ip_address = NULL,
    user_agent = 'anonymized',
    city = NULL,
    country = NULL
  WHERE user_id = target_user_id;
  
  UPDATE public.analytics_sessions 
  SET 
    ip_address = NULL,
    user_agent = 'anonymized',
    city = NULL,
    country = NULL
  WHERE user_id = target_user_id;
  
  -- Log the anonymization
  INSERT INTO public.data_processing_log (user_id, action_type, data_type, description)
  VALUES (target_user_id, 'delete', 'profile', 'User data anonymized for GDPR compliance');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to export user data
CREATE OR REPLACE FUNCTION public.export_user_data(target_user_id UUID)
RETURNS JSON AS $$
DECLARE
  user_data JSON;
BEGIN
  SELECT json_build_object(
    'profile', (SELECT row_to_json(p) FROM public.profiles p WHERE p.id = target_user_id),
    'consent_records', (SELECT json_agg(row_to_json(c)) FROM public.user_consent c WHERE c.user_id = target_user_id),
    'favorites', (SELECT json_agg(row_to_json(f)) FROM public.user_favorites f WHERE f.user_id = target_user_id),
    'notifications', (SELECT json_agg(row_to_json(n)) FROM public.notifications n WHERE n.user_id = target_user_id),
    'analytics_summary', json_build_object(
      'total_page_views', (SELECT COUNT(*) FROM public.analytics_events WHERE user_id = target_user_id),
      'total_sessions', (SELECT COUNT(*) FROM public.analytics_sessions WHERE user_id = target_user_id)
    )
  ) INTO user_data;
  
  -- Log the export
  INSERT INTO public.data_processing_log (user_id, action_type, data_type, description)
  VALUES (target_user_id, 'export', 'all', 'User data exported');
  
  RETURN user_data;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

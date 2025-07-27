-- Create comprehensive system settings table
CREATE TABLE public.system_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  
  -- Feature toggles
  enable_user_registration BOOLEAN DEFAULT true,
  enable_notifications BOOLEAN DEFAULT true,
  enable_user_favorites BOOLEAN DEFAULT true,
  enable_comments BOOLEAN DEFAULT true,
  enable_analytics BOOLEAN DEFAULT true,
  enable_ai_features BOOLEAN DEFAULT true,
  enable_export_features BOOLEAN DEFAULT true,
  enable_social_sharing BOOLEAN DEFAULT true,
  enable_newsletter BOOLEAN DEFAULT true,
  maintenance_mode BOOLEAN DEFAULT false,
  enable_guest_access BOOLEAN DEFAULT true,
  enable_rate_limiting BOOLEAN DEFAULT true,
  enable_captcha BOOLEAN DEFAULT false,
  enable_two_factor BOOLEAN DEFAULT false,
  enable_api_access BOOLEAN DEFAULT false,
  enable_debug_mode BOOLEAN DEFAULT false,
  
  -- Email settings
  email_from_name TEXT DEFAULT 'Data Zambia',
  email_from_address TEXT DEFAULT 'noreply@datazambia.com',
  email_footer_text TEXT,
  smtp_host TEXT,
  smtp_port INTEGER DEFAULT 587,
  smtp_username TEXT,
  smtp_password TEXT,
  enable_email_notifications BOOLEAN DEFAULT true,
  enable_welcome_emails BOOLEAN DEFAULT true,
  enable_password_reset BOOLEAN DEFAULT true,
  
  -- Security settings
  session_timeout_minutes INTEGER DEFAULT 60,
  max_login_attempts INTEGER DEFAULT 5,
  password_min_length INTEGER DEFAULT 8,
  require_password_complexity BOOLEAN DEFAULT true,
  enable_ip_whitelist BOOLEAN DEFAULT false,
  ip_whitelist TEXT,
  enable_audit_logging BOOLEAN DEFAULT true,
  enable_data_encryption BOOLEAN DEFAULT true,
  
  -- Performance settings
  enable_caching BOOLEAN DEFAULT true,
  cache_duration_minutes INTEGER DEFAULT 30,
  enable_compression BOOLEAN DEFAULT true,
  enable_minification BOOLEAN DEFAULT true,
  enable_cdn BOOLEAN DEFAULT false,
  cdn_url TEXT,
  max_upload_size_mb INTEGER DEFAULT 10,
  enable_image_optimization BOOLEAN DEFAULT true,
  enable_lazy_loading BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default settings
INSERT INTO public.system_settings (id) VALUES ('default')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage system settings" 
  ON public.system_settings 
  FOR ALL 
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Anyone can read system settings" 
  ON public.system_settings 
  FOR SELECT 
  USING (true);

-- Create function to get system setting
CREATE OR REPLACE FUNCTION public.get_system_setting(setting_name TEXT)
RETURNS TEXT AS $$
DECLARE
  setting_value TEXT;
BEGIN
  SELECT 
    CASE setting_name
      WHEN 'enable_user_registration' THEN enable_user_registration::text
      WHEN 'enable_notifications' THEN enable_notifications::text
      WHEN 'enable_user_favorites' THEN enable_user_favorites::text
      WHEN 'enable_comments' THEN enable_comments::text
      WHEN 'enable_analytics' THEN enable_analytics::text
      WHEN 'enable_ai_features' THEN enable_ai_features::text
      WHEN 'enable_export_features' THEN enable_export_features::text
      WHEN 'enable_social_sharing' THEN enable_social_sharing::text
      WHEN 'enable_newsletter' THEN enable_newsletter::text
      WHEN 'maintenance_mode' THEN maintenance_mode::text
      WHEN 'enable_guest_access' THEN enable_guest_access::text
      WHEN 'enable_rate_limiting' THEN enable_rate_limiting::text
      WHEN 'enable_captcha' THEN enable_captcha::text
      WHEN 'enable_two_factor' THEN enable_two_factor::text
      WHEN 'enable_api_access' THEN enable_api_access::text
      WHEN 'enable_debug_mode' THEN enable_debug_mode::text
      WHEN 'email_from_name' THEN email_from_name
      WHEN 'email_from_address' THEN email_from_address
      WHEN 'email_footer_text' THEN email_footer_text
      WHEN 'smtp_host' THEN smtp_host
      WHEN 'smtp_port' THEN smtp_port::text
      WHEN 'smtp_username' THEN smtp_username
      WHEN 'smtp_password' THEN smtp_password
      WHEN 'enable_email_notifications' THEN enable_email_notifications::text
      WHEN 'enable_welcome_emails' THEN enable_welcome_emails::text
      WHEN 'enable_password_reset' THEN enable_password_reset::text
      WHEN 'session_timeout_minutes' THEN session_timeout_minutes::text
      WHEN 'max_login_attempts' THEN max_login_attempts::text
      WHEN 'password_min_length' THEN password_min_length::text
      WHEN 'require_password_complexity' THEN require_password_complexity::text
      WHEN 'enable_ip_whitelist' THEN enable_ip_whitelist::text
      WHEN 'ip_whitelist' THEN ip_whitelist
      WHEN 'enable_audit_logging' THEN enable_audit_logging::text
      WHEN 'enable_data_encryption' THEN enable_data_encryption::text
      WHEN 'enable_caching' THEN enable_caching::text
      WHEN 'cache_duration_minutes' THEN cache_duration_minutes::text
      WHEN 'enable_compression' THEN enable_compression::text
      WHEN 'enable_minification' THEN enable_minification::text
      WHEN 'enable_cdn' THEN enable_cdn::text
      WHEN 'cdn_url' THEN cdn_url
      WHEN 'max_upload_size_mb' THEN max_upload_size_mb::text
      WHEN 'enable_image_optimization' THEN enable_image_optimization::text
      WHEN 'enable_lazy_loading' THEN enable_lazy_loading::text
      ELSE NULL
    END INTO setting_value
  FROM public.system_settings 
  WHERE id = 'default';
  
  RETURN setting_value;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if feature is enabled
CREATE OR REPLACE FUNCTION public.is_feature_enabled(feature_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN public.get_system_setting(feature_name)::boolean;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

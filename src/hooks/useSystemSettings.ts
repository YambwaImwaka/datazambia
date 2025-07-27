import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SystemSettings {
  // Feature toggles
  enable_user_registration: boolean;
  enable_notifications: boolean;
  enable_user_favorites: boolean;
  enable_comments: boolean;
  enable_analytics: boolean;
  enable_ai_features: boolean;
  enable_export_features: boolean;
  enable_social_sharing: boolean;
  enable_newsletter: boolean;
  maintenance_mode: boolean;
  enable_guest_access: boolean;
  enable_rate_limiting: boolean;
  enable_captcha: boolean;
  enable_two_factor: boolean;
  enable_api_access: boolean;
  enable_debug_mode: boolean;
  
  // Email settings
  email_from_name: string;
  email_from_address: string;
  email_footer_text: string | null;
  smtp_host: string | null;
  smtp_port: number;
  smtp_username: string | null;
  smtp_password: string | null;
  enable_email_notifications: boolean;
  enable_welcome_emails: boolean;
  enable_password_reset: boolean;
  
  // Security settings
  session_timeout_minutes: number;
  max_login_attempts: number;
  password_min_length: number;
  require_password_complexity: boolean;
  enable_ip_whitelist: boolean;
  ip_whitelist: string | null;
  enable_audit_logging: boolean;
  enable_data_encryption: boolean;
  
  // Performance settings
  enable_caching: boolean;
  cache_duration_minutes: number;
  enable_compression: boolean;
  enable_minification: boolean;
  enable_cdn: boolean;
  cdn_url: string | null;
  max_upload_size_mb: number;
  enable_image_optimization: boolean;
  enable_lazy_loading: boolean;
}

const defaultSettings: SystemSettings = {
  // Feature toggles
  enable_user_registration: true,
  enable_notifications: true,
  enable_user_favorites: true,
  enable_comments: true,
  enable_analytics: true,
  enable_ai_features: true,
  enable_export_features: true,
  enable_social_sharing: true,
  enable_newsletter: true,
  maintenance_mode: false,
  enable_guest_access: true,
  enable_rate_limiting: true,
  enable_captcha: false,
  enable_two_factor: false,
  enable_api_access: false,
  enable_debug_mode: false,
  
  // Email settings
  email_from_name: 'Data Zambia',
  email_from_address: 'noreply@datazambia.com',
  email_footer_text: null,
  smtp_host: null,
  smtp_port: 587,
  smtp_username: null,
  smtp_password: null,
  enable_email_notifications: true,
  enable_welcome_emails: true,
  enable_password_reset: true,
  
  // Security settings
  session_timeout_minutes: 60,
  max_login_attempts: 5,
  password_min_length: 8,
  require_password_complexity: true,
  enable_ip_whitelist: false,
  ip_whitelist: null,
  enable_audit_logging: true,
  enable_data_encryption: true,
  
  // Performance settings
  enable_caching: true,
  cache_duration_minutes: 30,
  enable_compression: true,
  enable_minification: true,
  enable_cdn: false,
  cdn_url: null,
  max_upload_size_mb: 10,
  enable_image_optimization: true,
  enable_lazy_loading: true,
};

export const useSystemSettings = () => {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch settings, but don't fail if table doesn't exist
      let data = null;
      try {
        const { data: settingsData, error: fetchError } = await supabase
          .from('system_settings')
          .select('*')
          .eq('id', 'default')
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          console.warn('System settings table may not exist yet:', fetchError);
        } else if (settingsData) {
          data = settingsData;
        }
      } catch (tableError) {
        console.warn('Could not access system_settings table:', tableError);
        // Continue with default settings
      }

      if (data) {
        setSettings(data as SystemSettings);
      }
      // If no data, keep using default settings
    } catch (err) {
      console.error('Error fetching system settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<SystemSettings>) => {
    try {
      // Try to update settings, but don't fail if table doesn't exist
      try {
        const { error: updateError } = await supabase
          .from('system_settings')
          .upsert({
            id: 'default',
            ...newSettings,
            updated_at: new Date().toISOString()
          });

        if (updateError) {
          console.warn('Could not save to system_settings table:', updateError);
        }
      } catch (tableError) {
        console.warn('System settings table not available:', tableError);
      }

      // Update local state regardless
      setSettings(prev => ({ ...prev, ...newSettings }));
      
      return { success: true };
    } catch (err) {
      console.error('Error updating system settings:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to update settings' 
      };
    }
  };

  const isFeatureEnabled = (featureName: keyof SystemSettings): boolean => {
    return settings[featureName] as boolean;
  };

  const getSetting = <K extends keyof SystemSettings>(settingName: K): SystemSettings[K] => {
    return settings[settingName];
  };

  // Subscribe to real-time changes
  useEffect(() => {
    fetchSettings();

    const channel = supabase
      .channel('system_settings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'system_settings',
          filter: 'id=eq.default'
        },
        (payload) => {
          if (payload.eventType === 'UPDATE' && payload.new) {
            setSettings(payload.new as SystemSettings);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings,
    isFeatureEnabled,
    getSetting,
  };
};

// Convenience hooks for specific features
export const useFeatureToggle = (featureName: keyof SystemSettings) => {
  const { isFeatureEnabled } = useSystemSettings();
  return isFeatureEnabled(featureName);
};

export const useMaintenanceMode = () => {
  return useFeatureToggle('maintenance_mode');
};

export const useAnalyticsEnabled = () => {
  return useFeatureToggle('enable_analytics');
};

export const useAIFeaturesEnabled = () => {
  return useFeatureToggle('enable_ai_features');
};

export const useUserRegistrationEnabled = () => {
  return useFeatureToggle('enable_user_registration');
};

export const useGuestAccessEnabled = () => {
  return useFeatureToggle('enable_guest_access');
}; 
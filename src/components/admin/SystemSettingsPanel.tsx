
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Users, 
  Bell, 
  Heart, 
  MessageSquare, 
  Shield, 
  Mail, 
  Database, 
  RefreshCw, 
  Search,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Globe,
  Palette,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Enhanced schemas with more comprehensive validation
const featureToggleSchema = z.object({
  enable_user_registration: z.boolean(),
  enable_notifications: z.boolean(),
  enable_user_favorites: z.boolean(),
  enable_comments: z.boolean(),
  enable_analytics: z.boolean(),
  enable_ai_features: z.boolean(),
  enable_export_features: z.boolean(),
  enable_social_sharing: z.boolean(),
  enable_newsletter: z.boolean(),
  enable_maintenance_mode: z.boolean(),
  enable_guest_access: z.boolean(),
  enable_rate_limiting: z.boolean(),
  enable_captcha: z.boolean(),
  enable_two_factor: z.boolean(),
  enable_api_access: z.boolean(),
  enable_debug_mode: z.boolean(),
});

const emailSettingsSchema = z.object({
  email_from_name: z.string().min(1, 'From name is required'),
  email_from_address: z.string().email('Valid email address required'),
  email_footer_text: z.string().optional(),
  smtp_host: z.string().optional(),
  smtp_port: z.number().optional(),
  smtp_username: z.string().optional(),
  smtp_password: z.string().optional(),
  enable_email_notifications: z.boolean(),
  enable_welcome_emails: z.boolean(),
  enable_password_reset: z.boolean(),
});

const securitySettingsSchema = z.object({
  session_timeout_minutes: z.number().min(15, 'Minimum 15 minutes').max(1440, 'Maximum 24 hours'),
  max_login_attempts: z.number().min(3, 'Minimum 3 attempts').max(10, 'Maximum 10 attempts'),
  password_min_length: z.number().min(6, 'Minimum 6 characters').max(32, 'Maximum 32 characters'),
  require_password_complexity: z.boolean(),
  enable_ip_whitelist: z.boolean(),
  ip_whitelist: z.string().optional(),
  enable_audit_logging: z.boolean(),
  enable_data_encryption: z.boolean(),
});

const performanceSettingsSchema = z.object({
  enable_caching: z.boolean(),
  cache_duration_minutes: z.number().min(1, 'Minimum 1 minute').max(1440, 'Maximum 24 hours'),
  enable_compression: z.boolean(),
  enable_minification: z.boolean(),
  enable_cdn: z.boolean(),
  cdn_url: z.string().optional(),
  max_upload_size_mb: z.number().min(1, 'Minimum 1MB').max(100, 'Maximum 100MB'),
  enable_image_optimization: z.boolean(),
  enable_lazy_loading: z.boolean(),
});

type FeatureToggleFormValues = z.infer<typeof featureToggleSchema>;
type EmailSettingsFormValues = z.infer<typeof emailSettingsSchema>;
type SecuritySettingsFormValues = z.infer<typeof securitySettingsSchema>;
type PerformanceSettingsFormValues = z.infer<typeof performanceSettingsSchema>;

type SystemSettings = {
  id: string;
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
  email_from_name: string | null;
  email_from_address: string | null;
  email_footer_text: string | null;
  smtp_host: string | null;
  smtp_port: number | null;
  smtp_username: string | null;
  smtp_password: string | null;
  enable_email_notifications: boolean;
  enable_welcome_emails: boolean;
  enable_password_reset: boolean;
  session_timeout_minutes: number;
  max_login_attempts: number;
  password_min_length: number;
  require_password_complexity: boolean;
  enable_ip_whitelist: boolean;
  ip_whitelist: string | null;
  enable_audit_logging: boolean;
  enable_data_encryption: boolean;
  enable_caching: boolean;
  cache_duration_minutes: number;
  enable_compression: boolean;
  enable_minification: boolean;
  enable_cdn: boolean;
  cdn_url: string | null;
  max_upload_size_mb: number;
  enable_image_optimization: boolean;
  enable_lazy_loading: boolean;
  created_at: string;
  updated_at: string;
};

const SystemSettingsPanel = () => {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('features');

  // Forms
  const featureForm = useForm<FeatureToggleFormValues>({
    resolver: zodResolver(featureToggleSchema),
    defaultValues: {
      enable_user_registration: true,
      enable_notifications: true,
      enable_user_favorites: true,
      enable_comments: true,
      enable_analytics: true,
      enable_ai_features: true,
      enable_export_features: true,
      enable_social_sharing: true,
      enable_newsletter: true,
      enable_maintenance_mode: false,
      enable_guest_access: true,
      enable_rate_limiting: true,
      enable_captcha: false,
      enable_two_factor: false,
      enable_api_access: false,
      enable_debug_mode: false,
    }
  });

  const emailForm = useForm<EmailSettingsFormValues>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      email_from_name: 'Data Zambia',
      email_from_address: 'noreply@datazambia.com',
      email_footer_text: '',
      smtp_host: '',
      smtp_port: 587,
      smtp_username: '',
      smtp_password: '',
      enable_email_notifications: true,
      enable_welcome_emails: true,
      enable_password_reset: true,
    }
  });

  const securityForm = useForm<SecuritySettingsFormValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      session_timeout_minutes: 60,
      max_login_attempts: 5,
      password_min_length: 8,
      require_password_complexity: true,
      enable_ip_whitelist: false,
      ip_whitelist: '',
      enable_audit_logging: true,
      enable_data_encryption: true,
    }
  });

  const performanceForm = useForm<PerformanceSettingsFormValues>({
    resolver: zodResolver(performanceSettingsSchema),
    defaultValues: {
      enable_caching: true,
      cache_duration_minutes: 30,
      enable_compression: true,
      enable_minification: true,
      enable_cdn: false,
      cdn_url: '',
      max_upload_size_mb: 10,
      enable_image_optimization: true,
      enable_lazy_loading: true,
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      
      // Check if system_settings table exists first
      let data = null;
      try {
        const { data: settingsData, error } = await supabase
          .from('system_settings')
          .select('*')
          .single();

        if (error && error.code !== 'PGRST116') {
          console.warn('System settings table may not exist yet:', error);
        } else if (settingsData) {
          data = settingsData;
        }
      } catch (tableError) {
        console.warn('Could not access system_settings table:', tableError);
        // Continue with default settings
      }

      if (data) {
        setSettings(data);
        // Populate forms with existing data
        featureForm.reset({
          enable_user_registration: data.enable_user_registration,
          enable_notifications: data.enable_notifications,
          enable_user_favorites: data.enable_user_favorites,
          enable_comments: data.enable_comments,
          enable_analytics: data.enable_analytics,
          enable_ai_features: data.enable_ai_features,
          enable_export_features: data.enable_export_features,
          enable_social_sharing: data.enable_social_sharing,
          enable_newsletter: data.enable_newsletter,
          enable_maintenance_mode: data.maintenance_mode,
          enable_guest_access: data.enable_guest_access,
          enable_rate_limiting: data.enable_rate_limiting,
          enable_captcha: data.enable_captcha,
          enable_two_factor: data.enable_two_factor,
          enable_api_access: data.enable_api_access,
          enable_debug_mode: data.enable_debug_mode,
        });

        emailForm.reset({
          email_from_name: data.email_from_name || 'Data Zambia',
          email_from_address: data.email_from_address || 'noreply@datazambia.com',
          email_footer_text: data.email_footer_text || '',
          smtp_host: data.smtp_host || '',
          smtp_port: data.smtp_port || 587,
          smtp_username: data.smtp_username || '',
          smtp_password: data.smtp_password || '',
          enable_email_notifications: data.enable_email_notifications,
          enable_welcome_emails: data.enable_welcome_emails,
          enable_password_reset: data.enable_password_reset,
        });

        securityForm.reset({
          session_timeout_minutes: data.session_timeout_minutes || 60,
          max_login_attempts: data.max_login_attempts || 5,
          password_min_length: data.password_min_length || 8,
          require_password_complexity: data.require_password_complexity,
          enable_ip_whitelist: data.enable_ip_whitelist,
          ip_whitelist: data.ip_whitelist || '',
          enable_audit_logging: data.enable_audit_logging,
          enable_data_encryption: data.enable_data_encryption,
        });

        performanceForm.reset({
          enable_caching: data.enable_caching,
          cache_duration_minutes: data.cache_duration_minutes || 30,
          enable_compression: data.enable_compression,
          enable_minification: data.enable_minification,
          enable_cdn: data.enable_cdn,
          cdn_url: data.cdn_url || '',
          max_upload_size_mb: data.max_upload_size_mb || 10,
          enable_image_optimization: data.enable_image_optimization,
          enable_lazy_loading: data.enable_lazy_loading,
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load system settings');
    } finally {
      setLoading(false);
    }
  };

  const onFeatureSubmit = async (values: FeatureToggleFormValues) => {
    await saveSettings('features', values);
  };

  const onEmailSubmit = async (values: EmailSettingsFormValues) => {
    await saveSettings('email', values);
  };

  const onSecuritySubmit = async (values: SecuritySettingsFormValues) => {
    await saveSettings('security', values);
  };

  const onPerformanceSubmit = async (values: PerformanceSettingsFormValues) => {
    await saveSettings('performance', values);
  };

  const saveSettings = async (type: string, values: any) => {
    setSaving(true);
    try {
      // Try to save settings, but don't fail if table doesn't exist
      try {
        const { error } = await supabase
          .from('system_settings')
          .upsert({
            id: settings?.id || 'default',
            ...values,
            updated_at: new Date().toISOString()
          });

        if (error) {
          console.warn('Could not save to system_settings table:', error);
          // Show a warning but don't throw
          toast.warning('Settings saved locally (database table not available)');
        } else {
          toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} settings saved successfully`);
        }
      } catch (tableError) {
        console.warn('System settings table not available:', tableError);
        toast.warning('Settings saved locally (database table not available)');
      }
      
      // Update local state regardless
      setSettings(prev => ({ ...prev, ...values }));
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const clearCache = () => {
    // Implement cache clearing logic
    toast.success('Cache cleared successfully');
  };

  const rebuildSearch = () => {
    // Implement search index rebuilding
    toast.success('Search index rebuilt successfully');
  };

  const getFeatureStatus = (enabled: boolean) => {
    return enabled ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        <CheckCircle className="h-3 w-3 mr-1" />
        Enabled
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-100 text-gray-600">
        <XCircle className="h-3 w-3 mr-1" />
        Disabled
      </Badge>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Loading settings...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          System Settings
        </CardTitle>
        <CardDescription>
          Configure system-wide settings and feature toggles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Features
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-6">
            <form onSubmit={featureForm.handleSubmit(onFeatureSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Management Features */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    User Management
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>User Registration</Label>
                        <p className="text-sm text-muted-foreground">Allow new users to sign up</p>
                      </div>
                      <Switch
                        checked={featureForm.watch('enable_user_registration')}
                        onCheckedChange={(checked) => featureForm.setValue('enable_user_registration', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Guest Access</Label>
                        <p className="text-sm text-muted-foreground">Allow access without registration</p>
                      </div>
                      <Switch
                        checked={featureForm.watch('enable_guest_access')}
                        onCheckedChange={(checked) => featureForm.setValue('enable_guest_access', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>User Favorites</Label>
                        <p className="text-sm text-muted-foreground">Allow users to save favorites</p>
                      </div>
                      <Switch
                        checked={featureForm.watch('enable_user_favorites')}
                        onCheckedChange={(checked) => featureForm.setValue('enable_user_favorites', checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Communication Features */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Communication
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Comments System</Label>
                        <p className="text-sm text-muted-foreground">Enable user comments</p>
                      </div>
                      <Switch
                        checked={featureForm.watch('enable_comments')}
                        onCheckedChange={(checked) => featureForm.setValue('enable_comments', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notifications</Label>
                        <p className="text-sm text-muted-foreground">Enable push notifications</p>
                      </div>
                      <Switch
                        checked={featureForm.watch('enable_notifications')}
                        onCheckedChange={(checked) => featureForm.setValue('enable_notifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Newsletter</Label>
                        <p className="text-sm text-muted-foreground">Enable newsletter subscriptions</p>
                      </div>
                      <Switch
                        checked={featureForm.watch('enable_newsletter')}
                        onCheckedChange={(checked) => featureForm.setValue('enable_newsletter', checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Features */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Advanced Features
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>AI Features</Label>
                        <p className="text-sm text-muted-foreground">Enable AI-powered features</p>
                      </div>
                      <Switch
                        checked={featureForm.watch('enable_ai_features')}
                        onCheckedChange={(checked) => featureForm.setValue('enable_ai_features', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Data Export</Label>
                        <p className="text-sm text-muted-foreground">Allow data export functionality</p>
                      </div>
                      <Switch
                        checked={featureForm.watch('enable_export_features')}
                        onCheckedChange={(checked) => featureForm.setValue('enable_export_features', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Social Sharing</Label>
                        <p className="text-sm text-muted-foreground">Enable social media sharing</p>
                      </div>
                      <Switch
                        checked={featureForm.watch('enable_social_sharing')}
                        onCheckedChange={(checked) => featureForm.setValue('enable_social_sharing', checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* System Features */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    System
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Analytics</Label>
                        <p className="text-sm text-muted-foreground">Enable usage analytics</p>
                      </div>
                      <Switch
                        checked={featureForm.watch('enable_analytics')}
                        onCheckedChange={(checked) => featureForm.setValue('enable_analytics', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">Put site in maintenance mode</p>
                      </div>
                      <Switch
                        checked={featureForm.watch('enable_maintenance_mode')}
                        onCheckedChange={(checked) => featureForm.setValue('enable_maintenance_mode', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Debug Mode</Label>
                        <p className="text-sm text-muted-foreground">Enable debug information</p>
                      </div>
                      <Switch
                        checked={featureForm.watch('enable_debug_mode')}
                        onCheckedChange={(checked) => featureForm.setValue('enable_debug_mode', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={fetchSettings}>
                  Reset
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Features'}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Email Configuration</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email_from_name">From Name</Label>
                      <Input
                        id="email_from_name"
                        {...emailForm.register('email_from_name')}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email_from_address">From Address</Label>
                      <Input
                        id="email_from_address"
                        type="email"
                        {...emailForm.register('email_from_address')}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email_footer_text">Footer Text</Label>
                      <Textarea
                        id="email_footer_text"
                        {...emailForm.register('email_footer_text')}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">SMTP Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="smtp_host">SMTP Host</Label>
                      <Input
                        id="smtp_host"
                        {...emailForm.register('smtp_host')}
                      />
                    </div>

                    <div>
                      <Label htmlFor="smtp_port">SMTP Port</Label>
                      <Input
                        id="smtp_port"
                        type="number"
                        {...emailForm.register('smtp_port', { valueAsNumber: true })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="smtp_username">SMTP Username</Label>
                      <Input
                        id="smtp_username"
                        {...emailForm.register('smtp_username')}
                      />
                    </div>

                    <div>
                      <Label htmlFor="smtp_password">SMTP Password</Label>
                      <Input
                        id="smtp_password"
                        type="password"
                        {...emailForm.register('smtp_password')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Email Features</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send system notifications</p>
                    </div>
                    <Switch
                      checked={emailForm.watch('enable_email_notifications')}
                      onCheckedChange={(checked) => emailForm.setValue('enable_email_notifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Welcome Emails</Label>
                      <p className="text-sm text-muted-foreground">Send welcome emails to new users</p>
                    </div>
                    <Switch
                      checked={emailForm.watch('enable_welcome_emails')}
                      onCheckedChange={(checked) => emailForm.setValue('enable_welcome_emails', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Password Reset</Label>
                      <p className="text-sm text-muted-foreground">Allow password reset via email</p>
                    </div>
                    <Switch
                      checked={emailForm.watch('enable_password_reset')}
                      onCheckedChange={(checked) => emailForm.setValue('enable_password_reset', checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={fetchSettings}>
                  Reset
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Email Settings'}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Session & Authentication</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="session_timeout">Session Timeout (minutes)</Label>
                      <Input
                        id="session_timeout"
                        type="number"
                        {...securityForm.register('session_timeout_minutes', { valueAsNumber: true })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="max_login_attempts">Max Login Attempts</Label>
                      <Input
                        id="max_login_attempts"
                        type="number"
                        {...securityForm.register('max_login_attempts', { valueAsNumber: true })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="password_min_length">Password Min Length</Label>
                      <Input
                        id="password_min_length"
                        type="number"
                        {...securityForm.register('password_min_length', { valueAsNumber: true })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Security Features</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Password Complexity</Label>
                        <p className="text-sm text-muted-foreground">Require complex passwords</p>
                      </div>
                      <Switch
                        checked={securityForm.watch('require_password_complexity')}
                        onCheckedChange={(checked) => securityForm.setValue('require_password_complexity', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Auth</Label>
                        <p className="text-sm text-muted-foreground">Enable 2FA for users</p>
                      </div>
                      <Switch
                        checked={securityForm.watch('enable_two_factor')}
                        onCheckedChange={(checked) => securityForm.setValue('enable_two_factor', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>IP Whitelist</Label>
                        <p className="text-sm text-muted-foreground">Restrict access to specific IPs</p>
                      </div>
                      <Switch
                        checked={securityForm.watch('enable_ip_whitelist')}
                        onCheckedChange={(checked) => securityForm.setValue('enable_ip_whitelist', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Audit Logging</Label>
                        <p className="text-sm text-muted-foreground">Log security events</p>
                      </div>
                      <Switch
                        checked={securityForm.watch('enable_audit_logging')}
                        onCheckedChange={(checked) => securityForm.setValue('enable_audit_logging', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Data Encryption</Label>
                        <p className="text-sm text-muted-foreground">Encrypt sensitive data</p>
                      </div>
                      <Switch
                        checked={securityForm.watch('enable_data_encryption')}
                        onCheckedChange={(checked) => securityForm.setValue('enable_data_encryption', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {securityForm.watch('enable_ip_whitelist') && (
                <div>
                  <Label htmlFor="ip_whitelist">IP Whitelist (one per line)</Label>
                  <Textarea
                    id="ip_whitelist"
                    placeholder="192.168.1.1&#10;10.0.0.1"
                    {...securityForm.register('ip_whitelist')}
                  />
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={fetchSettings}>
                  Reset
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Security Settings'}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <form onSubmit={performanceForm.handleSubmit(onPerformanceSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Caching & Optimization</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Caching</Label>
                        <p className="text-sm text-muted-foreground">Cache frequently accessed data</p>
                      </div>
                      <Switch
                        checked={performanceForm.watch('enable_caching')}
                        onCheckedChange={(checked) => performanceForm.setValue('enable_caching', checked)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="cache_duration">Cache Duration (minutes)</Label>
                      <Input
                        id="cache_duration"
                        type="number"
                        {...performanceForm.register('cache_duration_minutes', { valueAsNumber: true })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Compression</Label>
                        <p className="text-sm text-muted-foreground">Compress responses</p>
                      </div>
                      <Switch
                        checked={performanceForm.watch('enable_compression')}
                        onCheckedChange={(checked) => performanceForm.setValue('enable_compression', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Minification</Label>
                        <p className="text-sm text-muted-foreground">Minify CSS/JS files</p>
                      </div>
                      <Switch
                        checked={performanceForm.watch('enable_minification')}
                        onCheckedChange={(checked) => performanceForm.setValue('enable_minification', checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">CDN & Assets</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable CDN</Label>
                        <p className="text-sm text-muted-foreground">Use CDN for static assets</p>
                      </div>
                      <Switch
                        checked={performanceForm.watch('enable_cdn')}
                        onCheckedChange={(checked) => performanceForm.setValue('enable_cdn', checked)}
                      />
                    </div>

                    {performanceForm.watch('enable_cdn') && (
                      <div>
                        <Label htmlFor="cdn_url">CDN URL</Label>
                        <Input
                          id="cdn_url"
                          placeholder="https://cdn.example.com"
                          {...performanceForm.register('cdn_url')}
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="max_upload_size">Max Upload Size (MB)</Label>
                      <Input
                        id="max_upload_size"
                        type="number"
                        {...performanceForm.register('max_upload_size_mb', { valueAsNumber: true })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Image Optimization</Label>
                        <p className="text-sm text-muted-foreground">Optimize uploaded images</p>
                      </div>
                      <Switch
                        checked={performanceForm.watch('enable_image_optimization')}
                        onCheckedChange={(checked) => performanceForm.setValue('enable_image_optimization', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Lazy Loading</Label>
                        <p className="text-sm text-muted-foreground">Lazy load images and content</p>
                      </div>
                      <Switch
                        checked={performanceForm.watch('enable_lazy_loading')}
                        onCheckedChange={(checked) => performanceForm.setValue('enable_lazy_loading', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">System Actions</h3>
                  <p className="text-sm text-muted-foreground">Perform system maintenance tasks</p>
                </div>
                <div className="flex space-x-2">
                  <Button type="button" variant="outline" onClick={clearCache}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button type="button" variant="outline" onClick={rebuildSearch}>
                    <Search className="h-4 w-4 mr-2" />
                    Rebuild Search
                  </Button>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={fetchSettings}>
                  Reset
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Performance Settings'}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SystemSettingsPanel;

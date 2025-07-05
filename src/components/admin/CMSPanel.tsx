
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Save, Settings, Globe, Mail, Palette, Upload, FileText, Image, Video } from 'lucide-react';

interface SiteConfig {
  id: string;
  site_name: string;
  site_tagline: string | null;
  site_description: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  contact_email: string | null;
  contact_phone: string | null;
}

interface SystemSettings {
  id: string;
  enable_user_registration: boolean;
  enable_comments: boolean;
  enable_notifications: boolean;
  enable_user_favorites: boolean;
  maintenance_mode: boolean;
  email_from_name: string | null;
  email_from_address: string | null;
  email_footer_text: string | null;
}

const CMSPanel = () => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [systemSettings, setSystemSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      
      // Fetch site config
      const { data: configData, error: configError } = await supabase
        .from('site_config')
        .select('*')
        .limit(1)
        .single();

      if (configError && configError.code !== 'PGRST116') {
        throw configError;
      }

      // Fetch system settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('system_settings')
        .select('*')
        .limit(1)
        .single();

      if (settingsError && settingsError.code !== 'PGRST116') {
        throw settingsError;
      }

      setSiteConfig(configData);
      setSystemSettings(settingsData);
    } catch (error) {
      console.error('Error fetching config:', error);
      toast.error('Failed to load configuration');
    } finally {
      setLoading(false);
    }
  };

  const saveSiteConfig = async () => {
    if (!siteConfig) return;
    
    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('site_config')
        .upsert(siteConfig);

      if (error) throw error;
      
      toast.success('Site configuration saved');
    } catch (error) {
      console.error('Error saving site config:', error);
      toast.error('Failed to save site configuration');
    } finally {
      setSaving(false);
    }
  };

  const saveSystemSettings = async () => {
    if (!systemSettings) return;
    
    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('system_settings')
        .upsert(systemSettings);

      if (error) throw error;
      
      toast.success('System settings saved');
    } catch (error) {
      console.error('Error saving system settings:', error);
      toast.error('Failed to save system settings');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (file: File, type: 'logo' | 'favicon') => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('Media Files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('Media Files')
        .getPublicUrl(fileName);

      if (siteConfig) {
        setSiteConfig({
          ...siteConfig,
          [type === 'logo' ? 'logo_url' : 'favicon_url']: publicUrl
        });
      }

      toast.success(`${type} uploaded successfully`);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error(`Failed to upload ${type}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zambia-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Content Management System</h2>
        <p className="text-gray-600">Manage your website settings and configuration</p>
      </div>

      <Tabs defaultValue="site" className="space-y-4">
        <TabsList>
          <TabsTrigger value="site">
            <Globe className="h-4 w-4 mr-2" />
            Site Settings
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="system">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" />
            Email Settings
          </TabsTrigger>
          <TabsTrigger value="media">
            <Image className="h-4 w-4 mr-2" />
            Media Library
          </TabsTrigger>
        </TabsList>

        <TabsContent value="site" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Site Information</CardTitle>
              <CardDescription>Configure your website's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="site_name">Site Name</Label>
                  <Input
                    id="site_name"
                    value={siteConfig?.site_name || ''}
                    onChange={(e) => setSiteConfig(siteConfig ? {...siteConfig, site_name: e.target.value} : null)}
                    placeholder="Your Site Name"
                  />
                </div>
                <div>
                  <Label htmlFor="site_tagline">Tagline</Label>
                  <Input
                    id="site_tagline"
                    value={siteConfig?.site_tagline || ''}
                    onChange={(e) => setSiteConfig(siteConfig ? {...siteConfig, site_tagline: e.target.value} : null)}
                    placeholder="Your site tagline"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="site_description">Site Description</Label>
                <Textarea
                  id="site_description"
                  value={siteConfig?.site_description || ''}
                  onChange={(e) => setSiteConfig(siteConfig ? {...siteConfig, site_description: e.target.value} : null)}
                  placeholder="Describe your website"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={siteConfig?.contact_email || ''}
                    onChange={(e) => setSiteConfig(siteConfig ? {...siteConfig, contact_email: e.target.value} : null)}
                    placeholder="info@yoursite.com"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_phone">Contact Phone</Label>
                  <Input
                    id="contact_phone"
                    value={siteConfig?.contact_phone || ''}
                    onChange={(e) => setSiteConfig(siteConfig ? {...siteConfig, contact_phone: e.target.value} : null)}
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <Button onClick={saveSiteConfig} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Site Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visual Branding</CardTitle>
              <CardDescription>Customize your site's visual appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Logo Upload</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {siteConfig?.logo_url ? (
                      <img src={siteConfig.logo_url} alt="Logo" className="h-16 mx-auto mb-2" />
                    ) : (
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'logo');
                      }}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="cursor-pointer text-sm text-blue-600 hover:text-blue-800"
                    >
                      {siteConfig?.logo_url ? 'Change Logo' : 'Upload Logo'}
                    </label>
                  </div>
                </div>

                <div>
                  <Label>Favicon Upload</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {siteConfig?.favicon_url ? (
                      <img src={siteConfig.favicon_url} alt="Favicon" className="h-8 w-8 mx-auto mb-2" />
                    ) : (
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'favicon');
                      }}
                      className="hidden"
                      id="favicon-upload"
                    />
                    <label
                      htmlFor="favicon-upload"
                      className="cursor-pointer text-sm text-blue-600 hover:text-blue-800"
                    >
                      {siteConfig?.favicon_url ? 'Change Favicon' : 'Upload Favicon'}
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primary_color">Primary Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="primary_color"
                      type="color"
                      value={siteConfig?.primary_color || '#3b82f6'}
                      onChange={(e) => setSiteConfig(siteConfig ? {...siteConfig, primary_color: e.target.value} : null)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={siteConfig?.primary_color || '#3b82f6'}
                      onChange={(e) => setSiteConfig(siteConfig ? {...siteConfig, primary_color: e.target.value} : null)}
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondary_color">Secondary Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="secondary_color"
                      type="color"
                      value={siteConfig?.secondary_color || '#64748b'}
                      onChange={(e) => setSiteConfig(siteConfig ? {...siteConfig, secondary_color: e.target.value} : null)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={siteConfig?.secondary_color || '#64748b'}
                      onChange={(e) => setSiteConfig(siteConfig ? {...siteConfig, secondary_color: e.target.value} : null)}
                      placeholder="#64748b"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={saveSiteConfig} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Appearance Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Control system-wide features and functionality</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>User Registration</Label>
                      <p className="text-sm text-gray-500">Allow new users to register</p>
                    </div>
                    <Switch
                      checked={systemSettings?.enable_user_registration || false}
                      onCheckedChange={(checked) => setSystemSettings(systemSettings ? {...systemSettings, enable_user_registration: checked} : null)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Comments</Label>
                      <p className="text-sm text-gray-500">Enable user comments</p>
                    </div>
                    <Switch
                      checked={systemSettings?.enable_comments || false}
                      onCheckedChange={(checked) => setSystemSettings(systemSettings ? {...systemSettings, enable_comments: checked} : null)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notifications</Label>
                      <p className="text-sm text-gray-500">Enable system notifications</p>
                    </div>
                    <Switch
                      checked={systemSettings?.enable_notifications || false}
                      onCheckedChange={(checked) => setSystemSettings(systemSettings ? {...systemSettings, enable_notifications: checked} : null)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>User Favorites</Label>
                      <p className="text-sm text-gray-500">Allow users to save favorites</p>
                    </div>
                    <Switch
                      checked={systemSettings?.enable_user_favorites || false}
                      onCheckedChange={(checked) => setSystemSettings(systemSettings ? {...systemSettings, enable_user_favorites: checked} : null)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-gray-500">Put site in maintenance mode</p>
                    </div>
                    <Switch
                      checked={systemSettings?.maintenance_mode || false}
                      onCheckedChange={(checked) => setSystemSettings(systemSettings ? {...systemSettings, maintenance_mode: checked} : null)}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={saveSystemSettings} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save System Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Configure email settings for notifications and communications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email_from_name">From Name</Label>
                  <Input
                    id="email_from_name"
                    value={systemSettings?.email_from_name || ''}
                    onChange={(e) => setSystemSettings(systemSettings ? {...systemSettings, email_from_name: e.target.value} : null)}
                    placeholder="Your Site Name"
                  />
                </div>
                <div>
                  <Label htmlFor="email_from_address">From Email</Label>
                  <Input
                    id="email_from_address"
                    type="email"
                    value={systemSettings?.email_from_address || ''}
                    onChange={(e) => setSystemSettings(systemSettings ? {...systemSettings, email_from_address: e.target.value} : null)}
                    placeholder="noreply@yoursite.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email_footer_text">Email Footer</Label>
                <Textarea
                  id="email_footer_text"
                  value={systemSettings?.email_footer_text || ''}
                  onChange={(e) => setSystemSettings(systemSettings ? {...systemSettings, email_footer_text: e.target.value} : null)}
                  placeholder="Footer text for all emails"
                  rows={3}
                />
              </div>

              <Button onClick={saveSystemSettings} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Email Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Media Library</CardTitle>
              <CardDescription>Manage your uploaded media files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Media library management coming soon</p>
                <p className="text-sm text-gray-400">Upload, organize, and manage your images, videos, and documents</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CMSPanel;


import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Loader2, RefreshCw, Database, Search } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const featureToggleSchema = z.object({
  enable_user_registration: z.boolean().default(true),
  enable_notifications: z.boolean().default(true),
  enable_user_favorites: z.boolean().default(true),
  enable_comments: z.boolean().default(true),
  maintenance_mode: z.boolean().default(false),
});

const emailSettingsSchema = z.object({
  email_from_name: z.string().min(1, { message: 'From name is required' }),
  email_from_address: z.string().email({ message: 'Valid email address is required' }),
  email_footer_text: z.string().optional(),
});

type FeatureToggleFormValues = z.infer<typeof featureToggleSchema>;
type EmailSettingsFormValues = z.infer<typeof emailSettingsSchema>;

const SystemSettingsPanel = () => {
  const [activeTab, setActiveTab] = useState('features');
  const queryClient = useQueryClient();
  
  const featureForm = useForm<FeatureToggleFormValues>({
    resolver: zodResolver(featureToggleSchema),
    defaultValues: {
      enable_user_registration: true,
      enable_notifications: true,
      enable_user_favorites: true,
      enable_comments: true,
      maintenance_mode: false,
    },
  });
  
  const emailForm = useForm<EmailSettingsFormValues>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      email_from_name: 'Zambia Insight',
      email_from_address: 'info@example.com',
      email_footer_text: '',
    },
  });

  // Fetch system settings from the database
  const { data: settings, isLoading: isLoadingSettings, error: settingsError } = useQuery({
    queryKey: ['system-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      return data;
    },
  });

  // Update forms when settings data is loaded
  useEffect(() => {
    if (settings) {
      featureForm.reset({
        enable_user_registration: settings.enable_user_registration,
        enable_notifications: settings.enable_notifications,
        enable_user_favorites: settings.enable_user_favorites,
        enable_comments: settings.enable_comments,
        maintenance_mode: settings.maintenance_mode,
      });
      
      emailForm.reset({
        email_from_name: settings.email_from_name,
        email_from_address: settings.email_from_address,
        email_footer_text: settings.email_footer_text || '',
      });
    }
  }, [settings]);

  // Mutation for updating feature toggles
  const featureToggleMutation = useMutation({
    mutationFn: async (values: FeatureToggleFormValues) => {
      const { error } = await supabase
        .from('system_settings')
        .upsert({
          id: settings?.id || 'default',
          ...values,
          email_from_name: settings?.email_from_name || 'Zambia Insight',
          email_from_address: settings?.email_from_address || 'info@example.com',
          email_footer_text: settings?.email_footer_text,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-settings'] });
      toast.success('System settings updated successfully');
    },
    onError: (error) => {
      console.error('Error updating system settings:', error);
      toast.error('Failed to update system settings');
    },
  });

  // Mutation for updating email settings
  const emailSettingsMutation = useMutation({
    mutationFn: async (values: EmailSettingsFormValues) => {
      const { error } = await supabase
        .from('system_settings')
        .upsert({
          id: settings?.id || 'default',
          ...values,
          enable_user_registration: settings?.enable_user_registration || true,
          enable_notifications: settings?.enable_notifications || true,
          enable_user_favorites: settings?.enable_user_favorites || true,
          enable_comments: settings?.enable_comments || true,
          maintenance_mode: settings?.maintenance_mode || false,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-settings'] });
      toast.success('Email settings updated successfully');
    },
    onError: (error) => {
      console.error('Error updating email settings:', error);
      toast.error('Failed to update email settings');
    },
  });

  const onFeatureSubmit = async (values: FeatureToggleFormValues) => {
    featureToggleMutation.mutate(values);
  };

  const onEmailSubmit = async (values: EmailSettingsFormValues) => {
    emailSettingsMutation.mutate(values);
  };

  const clearCache = () => {
    queryClient.invalidateQueries();
    toast.success('Cache cleared successfully');
  };

  const rebuildSearch = () => {
    toast.success('Search index rebuild initiated');
  };

  if (settingsError) {
    console.error('Error fetching system settings:', settingsError);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>
          Configure system-wide settings and feature toggles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="features" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="features">Feature Toggles</TabsTrigger>
            <TabsTrigger value="email">Email Settings</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="features">
            {isLoadingSettings ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading settings...</span>
              </div>
            ) : (
              <Form {...featureForm}>
                <form onSubmit={featureForm.handleSubmit(onFeatureSubmit)} className="space-y-6">
                  <div className="grid gap-6">
                    <FormField
                      control={featureForm.control}
                      name="enable_user_registration"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">User Registration</FormLabel>
                            <FormDescription>
                              Allow new users to register accounts
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={featureForm.control}
                      name="enable_notifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Notifications</FormLabel>
                            <FormDescription>
                              Enable in-app notifications for users
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={featureForm.control}
                      name="enable_user_favorites"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">User Favorites</FormLabel>
                            <FormDescription>
                              Allow users to save favorites
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={featureForm.control}
                      name="enable_comments"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Comments</FormLabel>
                            <FormDescription>
                              Enable comment functionality throughout the site
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={featureForm.control}
                      name="maintenance_mode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Maintenance Mode</FormLabel>
                            <FormDescription>
                              Temporarily close the site for maintenance
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={featureToggleMutation.isPending || !featureForm.formState.isDirty}
                    >
                      {featureToggleMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </TabsContent>

          <TabsContent value="email">
            {isLoadingSettings ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading email settings...</span>
              </div>
            ) : (
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                  <FormField
                    control={emailForm.control}
                    name="email_from_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The name that appears in the "From" field in email messages
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={emailForm.control}
                    name="email_from_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormDescription>
                          The email address that appears in the "From" field in email messages
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={emailForm.control}
                    name="email_footer_text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Footer Text</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Text to include in the footer of all email messages
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={emailSettingsMutation.isPending || !emailForm.formState.isDirty}
                    >
                      {emailSettingsMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Save Email Settings
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </TabsContent>
          
          <TabsContent value="maintenance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Maintenance</CardTitle>
                <CardDescription>
                  Tools to help maintain and optimize the system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Clear Cache</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Clear the system cache to resolve performance issues.
                    </p>
                    <Button variant="outline" onClick={clearCache}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Clear Cache
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Rebuild Search Index</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Rebuild the search index to include new content.
                    </p>
                    <Button variant="outline" onClick={rebuildSearch}>
                      <Search className="mr-2 h-4 w-4" />
                      Rebuild Index
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 mt-4">
                  <h3 className="font-medium mb-2">Database Maintenance</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Perform database maintenance operations.
                  </p>
                  <Button>
                    <Database className="mr-2 h-4 w-4" />
                    Run Maintenance Tasks
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SystemSettingsPanel;

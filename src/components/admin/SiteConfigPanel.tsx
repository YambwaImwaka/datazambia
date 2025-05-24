
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Upload, CheckCircle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const siteConfigSchema = z.object({
  site_name: z.string().min(2, { message: 'Site name must be at least 2 characters' }),
  site_tagline: z.string().optional(),
  site_description: z.string().optional(),
  contact_email: z.string().email({ message: 'Please enter a valid email address' }).optional().or(z.string().length(0)),
  contact_phone: z.string().optional(),
  primary_color: z.string().optional(),
  secondary_color: z.string().optional(),
});

type SiteConfigFormValues = z.infer<typeof siteConfigSchema>;

type SiteConfig = {
  id: string;
  site_name: string;
  site_tagline: string | null;
  site_description: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  created_at: string;
  updated_at: string;
};

const SiteConfigPanel = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const form = useForm<SiteConfigFormValues>({
    resolver: zodResolver(siteConfigSchema),
    defaultValues: {
      site_name: 'Data Zambia',
      site_tagline: '',
      site_description: '',
      contact_email: '',
      contact_phone: '',
      primary_color: '',
      secondary_color: '',
    },
  });

  // Fetch site configuration from database
  const { 
    data: siteConfig, 
    isLoading: isLoadingConfig 
  } = useQuery({
    queryKey: ['site-config'],
    queryFn: async (): Promise<SiteConfig | null> => {
      const { data, error } = await supabase
        .from('site_config')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      
      return data;
    },
  });

  // Update forms when site configuration data is loaded
  useEffect(() => {
    if (siteConfig) {
      setLogoUrl(siteConfig.logo_url || null);
      setFaviconUrl(siteConfig.favicon_url || null);
      
      form.reset({
        site_name: siteConfig.site_name,
        site_tagline: siteConfig.site_tagline || '',
        site_description: siteConfig.site_description || '',
        contact_email: siteConfig.contact_email || '',
        contact_phone: siteConfig.contact_phone || '',
        primary_color: siteConfig.primary_color || '',
        secondary_color: siteConfig.secondary_color || '',
      });
    }
  }, [siteConfig, form]);

  // Mutation for updating site configuration
  const updateSiteConfigMutation = useMutation({
    mutationFn: async (values: SiteConfigFormValues & { logo_url?: string | null, favicon_url?: string | null }) => {
      const { error } = await supabase
        .from('site_config')
        .upsert({
          id: siteConfig?.id || 'default',
          ...values,
          logo_url: logoUrl,
          favicon_url: faviconUrl,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-config'] });
      toast.success('Site configuration updated successfully');
    },
    onError: (error) => {
      console.error('Error updating site config:', error);
      toast.error('Failed to update site configuration');
    },
  });

  const onSubmit = (values: SiteConfigFormValues) => {
    updateSiteConfigMutation.mutate({
      ...values,
      logo_url: logoUrl,
      favicon_url: faviconUrl,
    });
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) {
      return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `logo-${Date.now()}.${fileExt}`;
    const filePath = `site/${fileName}`;

    setIsUploading(true);

    try {
      // Check if storage bucket exists, create if it doesn't
      const { data: buckets } = await supabase
        .storage
        .listBuckets();
      
      const assetsBucketExists = buckets?.some(bucket => bucket.name === 'assets');
      
      if (!assetsBucketExists) {
        // Create the bucket
        toast.info('Creating storage bucket for assets...');
        // Note: Actually creating buckets requires admin privileges, 
        // so we'll need to handle this in the backend or pre-create it
      }

      const { error: uploadError, data } = await supabase.storage
        .from('assets')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: urlData } = supabase.storage.from('assets').getPublicUrl(filePath);
      
      setLogoUrl(urlData.publicUrl);
      toast.success('Logo uploaded successfully');
    } catch (error: any) {
      console.error('Error uploading logo:', error);
      toast.error(error.message || 'Failed to upload logo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFaviconUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) {
      return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `favicon-${Date.now()}.${fileExt}`;
    const filePath = `site/${fileName}`;

    setIsUploading(true);

    try {
      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: urlData } = supabase.storage.from('assets').getPublicUrl(filePath);
      
      setFaviconUrl(urlData.publicUrl);
      toast.success('Favicon uploaded successfully');
    } catch (error: any) {
      console.error('Error uploading favicon:', error);
      toast.error(error.message || 'Failed to upload favicon');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Configuration</CardTitle>
        <CardDescription>
          Manage basic Data Zambia settings and branding elements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {isLoadingConfig ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading site configuration...</span>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <TabsContent value="general" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="site_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The name of your website as it appears in the browser tab and headers
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="site_tagline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tagline</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          A short description that appears alongside your site name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="site_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[100px] resize-y"
                          />
                        </FormControl>
                        <FormDescription>
                          A detailed description used for SEO and meta tags
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="primary_color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Color</FormLabel>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Input {...field} type="text" placeholder="#3B82F6" />
                            </FormControl>
                            {field.value && (
                              <div 
                                className="w-6 h-6 rounded border" 
                                style={{ backgroundColor: field.value }}
                              />
                            )}
                          </div>
                          <FormDescription>
                            Primary brand color (hex code)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="secondary_color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Secondary Color</FormLabel>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Input {...field} type="text" placeholder="#10B981" />
                            </FormControl>
                            {field.value && (
                              <div 
                                className="w-6 h-6 rounded border" 
                                style={{ backgroundColor: field.value }}
                              />
                            )}
                          </div>
                          <FormDescription>
                            Secondary brand color (hex code)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="branding" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Logo</h3>
                        <div className="flex items-center gap-4 mb-4">
                          {logoUrl ? (
                            <div className="relative h-20 w-40 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center overflow-hidden">
                              <img
                                src={logoUrl}
                                alt="Site Logo"
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="h-20 w-40 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                              <p className="text-muted-foreground text-sm">No logo uploaded</p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="relative"
                            disabled={isUploading}
                          >
                            {isUploading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Logo
                              </>
                            )}
                            <input
                              type="file"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={handleLogoUpload}
                              accept="image/*"
                              disabled={isUploading}
                            />
                          </Button>
                          {logoUrl && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setLogoUrl(null)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Favicon</h3>
                        <div className="flex items-center gap-4 mb-4">
                          {faviconUrl ? (
                            <div className="relative h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center overflow-hidden">
                              <img
                                src={faviconUrl}
                                alt="Favicon"
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                              <p className="text-muted-foreground text-xs">No favicon</p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="relative"
                            disabled={isUploading}
                          >
                            {isUploading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Favicon
                              </>
                            )}
                            <input
                              type="file"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={handleFaviconUpload}
                              accept="image/x-icon,image/png,image/svg+xml"
                              disabled={isUploading}
                            />
                          </Button>
                          {faviconUrl && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setFaviconUrl(null)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="contact_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormDescription>
                          The primary email address for site inquiries
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The primary phone number for site inquiries
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={updateSiteConfigMutation.isPending || (!form.formState.isDirty && logoUrl === (siteConfig?.logo_url || null) && faviconUrl === (siteConfig?.favicon_url || null))}
                  >
                    {updateSiteConfigMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SiteConfigPanel;

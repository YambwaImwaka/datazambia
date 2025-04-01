
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
import { Loader2, Upload } from 'lucide-react';

const siteConfigSchema = z.object({
  site_name: z.string().min(2, { message: 'Site name must be at least 2 characters' }),
  site_tagline: z.string().optional(),
  site_description: z.string().optional(),
  contact_email: z.string().email({ message: 'Please enter a valid email address' }).optional(),
  contact_phone: z.string().optional(),
});

type SiteConfigFormValues = z.infer<typeof siteConfigSchema>;

interface SiteConfig {
  id: string;
  site_name: string;
  site_tagline?: string;
  site_description?: string;
  contact_email?: string;
  contact_phone?: string;
  logo_url?: string;
  favicon_url?: string;
  primary_color?: string;
  secondary_color?: string;
  created_at: string;
  updated_at: string;
}

const SiteConfigPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);

  const form = useForm<SiteConfigFormValues>({
    resolver: zodResolver(siteConfigSchema),
    defaultValues: {
      site_name: 'Data Zambia',
      site_tagline: '',
      site_description: '',
      contact_email: '',
      contact_phone: '',
    },
  });

  useEffect(() => {
    const fetchSiteConfig = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('site_config')
          .select('*')
          .single();

        if (error) throw error;
        
        if (data) {
          setSiteConfig(data);
          setLogoUrl(data.logo_url || null);
          setFaviconUrl(data.favicon_url || null);
          
          form.reset({
            site_name: data.site_name,
            site_tagline: data.site_tagline || '',
            site_description: data.site_description || '',
            contact_email: data.contact_email || '',
            contact_phone: data.contact_phone || '',
          });
        }
      } catch (error) {
        console.error('Error fetching site config:', error);
        toast.error('Failed to load site configuration');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSiteConfig();
  }, [form]);

  const onSubmit = async (values: SiteConfigFormValues) => {
    setIsLoading(true);
    try {
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
      toast.success('Site configuration updated successfully');
    } catch (error) {
      console.error('Error updating site config:', error);
      toast.error('Failed to update site configuration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) {
      return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `logo-${Date.now()}.${fileExt}`;
    const filePath = `site/${fileName}`;

    setUploading(true);

    try {
      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('assets').getPublicUrl(filePath);
      
      setLogoUrl(data.publicUrl);
      toast.success('Logo uploaded successfully');
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error('Failed to upload logo');
    } finally {
      setUploading(false);
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

    setUploading(true);

    try {
      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('assets').getPublicUrl(filePath);
      
      setFaviconUrl(data.publicUrl);
      toast.success('Favicon uploaded successfully');
    } catch (error) {
      console.error('Error uploading favicon:', error);
      toast.error('Failed to upload favicon');
    } finally {
      setUploading(false);
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
                          disabled={uploading}
                        >
                          {uploading ? (
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
                            disabled={uploading}
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
                          disabled={uploading}
                        >
                          {uploading ? (
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
                            disabled={uploading}
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
                <Button type="submit" disabled={isLoading || uploading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SiteConfigPanel;

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import PageLayout from '@/components/layout/PageLayout';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { ResponsiveCard } from '@/components/ui/ResponsiveCard';
import { toast } from 'sonner';
import { Loader2, User, Image, Bell, Settings, MapPin, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Json } from '@/integrations/supabase/types';

const profileFormSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }).optional(),
  full_name: z.string().min(2, { message: 'Full name must be at least 2 characters' }).optional(),
  bio: z.string().max(160, { message: 'Bio must not exceed 160 characters' }).optional(),
  location: z.string().max(100, { message: 'Location must not exceed 100 characters' }).optional(),
});

const notificationFormSchema = z.object({
  email: z.boolean().default(true),
  app: z.boolean().default(true),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type NotificationFormValues = z.infer<typeof notificationFormSchema>;

interface NotificationPreferences {
  email: boolean;
  app: boolean;
}

interface ProfileData {
  id: string;
  username?: string;
  full_name?: string;
  bio?: string;
  location?: string;
  avatar_url?: string;
  theme?: string;
  notification_preferences?: NotificationPreferences;
  [key: string]: any;
}

const UserProfile = () => {
  const { user, isLoading: authLoading, isAdmin } = useAuth();
  const { theme, setTheme } = useTheme();
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      full_name: '',
      bio: '',
      location: '',
    },
  });

  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      email: true,
      app: true,
    },
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          const processedData: ProfileData = {
            ...data,
            notification_preferences: parseNotificationPreferences(data.notification_preferences),
          };
          
          setProfileData(processedData);
          setAvatarUrl(data.avatar_url || null);
          
          profileForm.reset({
            username: data.username || '',
            full_name: data.full_name || '',
            bio: data.bio || '',
            location: data.location || '',
          });

          const notificationPrefs = processedData.notification_preferences || { email: true, app: true };
          notificationForm.reset({
            email: notificationPrefs.email,
            app: notificationPrefs.app,
          });
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error.message);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, profileForm, notificationForm]);

  const parseNotificationPreferences = (jsonData: Json | null): NotificationPreferences => {
    if (!jsonData) {
      return { email: true, app: true };
    }
    
    try {
      if (typeof jsonData === 'object' && jsonData !== null && !Array.isArray(jsonData) &&
          'email' in jsonData && 'app' in jsonData &&
          typeof jsonData.email === 'boolean' && typeof jsonData.app === 'boolean') {
        return {
          email: jsonData.email,
          app: jsonData.app
        };
      }
      
      return { email: true, app: true };
    } catch (e) {
      console.error('Error parsing notification preferences:', e);
      return { email: true, app: true };
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) {
      return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${user?.id}/${Math.random().toString(36).substring(2)}.${fileExt}`;

    setUploading(true);

    try {
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrl } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl.publicUrl })
        .eq('id', user?.id);

      setAvatarUrl(publicUrl.publicUrl);
      toast.success('Avatar updated successfully');
    } catch (error: any) {
      console.error('Error uploading avatar:', error.message);
      toast.error('Error uploading avatar');
    } finally {
      setUploading(false);
    }
  };

  const onProfileSubmit = async (data: ProfileFormValues) => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: data.username,
          full_name: data.full_name,
          bio: data.bio,
          location: data.location,
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const onNotificationSubmit = async (data: NotificationFormValues) => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          notification_preferences: data,
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      toast.success('Notification preferences updated');
    } catch (error: any) {
      console.error('Error updating notification preferences:', error.message);
      toast.error('Failed to update notification preferences');
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    if (!user) return;
    
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    supabase
      .from('profiles')
      .update({ theme: newTheme })
      .eq('id', user.id)
      .then(({ error }) => {
        if (error) {
          console.error('Error saving theme preference:', error.message);
        }
      });
  };

  if (authLoading || loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return (
      <PageLayout>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Not Authorized</CardTitle>
            <CardDescription>You need to be logged in to view this page.</CardDescription>
          </CardHeader>
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container max-w-5xl py-6">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ResponsiveCard variant="elevated" className="mb-6">
              <div className="flex flex-col items-center p-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
                    <AvatarImage src={avatarUrl || undefined} />
                    <AvatarFallback className="text-lg">
                      {profileData?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <label htmlFor="avatar-upload" className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground h-8 w-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                    <Image className="h-4 w-4" />
                    <span className="sr-only">Upload avatar</span>
                  </label>
                  <input 
                    type="file" 
                    id="avatar-upload" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                  />
                </div>
                <h2 className="text-xl font-semibold mt-2">{profileData?.full_name || user.email}</h2>
                <p className="text-sm text-muted-foreground">@{profileData?.username || 'username'}</p>
                
                {profileData?.location && (
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1" /> 
                    <span>{profileData.location}</span>
                  </div>
                )}
                
                <div className="mt-4 text-sm text-center text-muted-foreground">
                  {profileData?.bio || 'No bio provided yet.'}
                </div>
              </div>
            </ResponsiveCard>

            <ResponsiveCard variant="elevated">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Moon className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>Dark Mode</span>
                  </div>
                  <Switch 
                    checked={theme === 'dark'} 
                    onCheckedChange={toggleTheme}
                  />
                </div>
              </div>
            </ResponsiveCard>
          </div>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="profile" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Settings</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <ResponsiveCard variant="elevated">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={profileForm.control}
                            name="full_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                  <Input placeholder="johndoe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={profileForm.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="Lusaka, Zambia" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us a little about yourself"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Brief description for your profile. Maximum 160 characters.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium mb-1">Email</h3>
                            <p className="text-sm">{user?.email}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium mb-1">Account Type</h3>
                            <p className="text-sm">{isAdmin ? 'Administrator' : 'Standard User'}</p>
                          </div>
                        </div>
                        
                        <Button type="submit" disabled={loading}>
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            'Save Changes'
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </ResponsiveCard>
              </TabsContent>
              
              <TabsContent value="notifications">
                <ResponsiveCard variant="elevated">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...notificationForm}>
                      <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                        <FormField
                          control={notificationForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Email Notifications</FormLabel>
                                <FormDescription>
                                  Receive notifications via email
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="app"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">In-App Notifications</FormLabel>
                                <FormDescription>
                                  Receive notifications in the app
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" disabled={loading}>
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            'Save Preferences'
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </ResponsiveCard>
              </TabsContent>
              
              <TabsContent value="settings">
                <ResponsiveCard variant="elevated">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account settings and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <h3 className="text-base font-medium">Password</h3>
                          <p className="text-sm text-muted-foreground">
                            Change your password
                          </p>
                        </div>
                        <Button variant="outline">Change Password</Button>
                      </div>
                      
                      <div className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <h3 className="text-base font-medium">Delete Account</h3>
                          <p className="text-sm text-muted-foreground">
                            Permanently delete your account and all your data
                          </p>
                        </div>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </div>
                  </CardContent>
                </ResponsiveCard>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default UserProfile;

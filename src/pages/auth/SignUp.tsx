
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Lock, User, Loader2, Crown } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { AdminSignupFlow } from '@/components/auth/AdminSignupFlow';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  full_name: z.string().min(2, { message: 'Full name must be at least 2 characters' }).optional(),
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }).optional(),
  isAdmin: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const { signUp, isLoading, user } = useAuth();
  const location = useLocation();
  const [adminSignupData, setAdminSignupData] = useState<FormValues | null>(null);
  
  // Handle auth redirects
  useAuthRedirect({ 
    user, 
    isLoading: false, 
    currentPath: location.pathname 
  });
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      full_name: '',
      username: '',
      isAdmin: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const { email, password, full_name, username, isAdmin } = data;
    
    try {
      if (isAdmin) {
        console.log('🔧 Initiating admin signup flow');
        setAdminSignupData(data);
      } else {
        console.log('👤 Initiating regular user signup');
        await signUp(email, password, { full_name, username });
      }
    } catch (error: any) {
      console.error('❌ Signup error:', error);
    }
  };

  const handleAdminSignupSuccess = () => {
    setAdminSignupData(null);
    form.reset();
  };

  const handleAdminSignupError = (error: string) => {
    setAdminSignupData(null);
    console.error('Admin signup failed:', error);
  };

  return (
    <PageLayout showHeader={true} showFooter={true} bgColor="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
            <CardDescription>
              Create an account to access Zambia Insight
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="you@example.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="John Doe"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="johndoe"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="******"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isAdmin"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-yellow-500" />
                          Sign up as Administrator
                        </FormLabel>
                        <FormDescription>
                          Check this if you need admin access to manage the platform
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isLoading || !!adminSignupData}>
                  {isLoading || adminSignupData ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
                
                <FormDescription className="text-center">
                  Already have an account?{' '}
                  <Link to="/auth/signin" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </FormDescription>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2">
            <Link to="/" className="text-sm text-muted-foreground hover:underline">
              Back to Home
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Admin signup flow component */}
      {adminSignupData && (
        <AdminSignupFlow
          email={adminSignupData.email}
          password={adminSignupData.password}
          metadata={{ 
            full_name: adminSignupData.full_name, 
            username: adminSignupData.username 
          }}
          onSuccess={handleAdminSignupSuccess}
          onError={handleAdminSignupError}
        />
      )}
    </PageLayout>
  );
};

export default SignUp;

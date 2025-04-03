
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, AlertCircle, Check, UserCog } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

const CreateAdmin = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adminCount, setAdminCount] = useState<number>(0);
  
  const { makeUserAdmin, isAdmin } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Check if there are any existing admins
  useEffect(() => {
    const checkAdmins = async () => {
      try {
        const { count, error } = await supabase
          .from('user_roles')
          .select('count', { count: 'exact', head: true })
          .eq('role', 'admin');
        
        if (error) throw error;
        
        // Fix: Ensure we set a number value
        setAdminCount(count || 0);
      } catch (err) {
        console.error("Error checking admin count:", err);
      }
    };
    
    checkAdmins();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const result = await makeUserAdmin(email);
      
      if (result.success) {
        setSuccess(true);
        setEmail('');
        toast.success(`User ${email} has been granted admin privileges`);
        queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred');
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect non-admin users
  if (!isAdmin && adminCount > 0) {
    return (
      <PageLayout>
        <div className="max-w-md mx-auto py-12">
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You do not have permission to access this page.
              This area is restricted to administrators only.
            </AlertDescription>
          </Alert>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-md mx-auto py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserCog className="h-6 w-6 text-primary" />
              <CardTitle>Create Admin</CardTitle>
            </div>
            <CardDescription>
              Grant admin privileges to an existing user by email address
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">User Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 text-green-800 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    User {email} has been granted admin privileges
                  </AlertDescription>
                </Alert>
              )}

              <div className="text-sm text-muted-foreground">
                <p>Important: The user must already have an account in the system.</p>
                <p className="mt-2 text-orange-600 dark:text-orange-400">
                  This page will be removed after initial admin setup.
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => navigate('/admin/dashboard')}>
                Back to Dashboard
              </Button>
              <Button type="submit" disabled={isLoading || !email}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  'Create Admin'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CreateAdmin;

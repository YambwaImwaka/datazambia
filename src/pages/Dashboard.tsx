
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart3, LineChart, Map, Activity, Crown, AlertCircle, Database } from 'lucide-react';
import { provinces } from '@/utils/data';
import PageLayout from '@/components/layout/PageLayout';
import { makeAdmin } from '@/utils/makeAdmin';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { user, isAdmin, signOut, refreshUserRoles } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isConverting, setIsConverting] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  // Redirect admins to admin dashboard
  useEffect(() => {
    if (isAdmin) {
      console.log('👑 Admin detected, redirecting to admin dashboard');
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAdmin, navigate]);

  // Debug function to check current user status
  const checkUserStatus = async () => {
    if (!user) return;
    
    try {
      console.log('🔍 Debugging user status...');
      
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id);
      
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', user.email);
      
      const debugData = {
        userId: user.id,
        userEmail: user.email,
        isAdmin,
        roles: roleData,
        roleError: roleError?.message,
        adminData,
        adminError: adminError?.message,
        timestamp: new Date().toISOString()
      };
      
      console.log('🔍 Debug info:', debugData);
      setDebugInfo(debugData);
      
    } catch (error) {
      console.error('Debug error:', error);
    }
  };

  // Don't render if user is admin (they should be redirected)
  if (isAdmin) {
    return null;
  }

  const handleMakeAdmin = async () => {
    if (!user?.email) return;
    
    setIsConverting(true);
    try {
      console.log('🔄 Converting current user to admin...');
      const result = await makeAdmin(user.email);
      
      if (result.success) {
        toast.success('You have been granted admin privileges! Refreshing...');
        // Refresh the user roles
        await refreshUserRoles();
        // Force a page reload to ensure all state is updated
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      console.error('Failed to convert to admin:', error);
      toast.error('Failed to grant admin privileges');
    } finally {
      setIsConverting(false);
    }
  };

  const quickLinks = [
    { title: 'Provinces', icon: <Map className="h-6 w-6" />, onClick: () => navigate('/provinces') },
    { title: 'Health Stats', icon: <Activity className="h-6 w-6" />, onClick: () => navigate('/explore/health') },
    { title: 'Economy', icon: <LineChart className="h-6 w-6" />, onClick: () => navigate('/explore/economy') },
    { title: 'Agriculture', icon: <BarChart3 className="h-6 w-6" />, onClick: () => navigate('/explore/agriculture') },
  ];

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.user_metadata?.full_name || user?.email}</h1>
        <p className="text-muted-foreground mt-2">
          User Dashboard - Access Zambia's key data insights
        </p>
        
        {/* Admin Conversion Section */}
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">
                Admin Access Testing
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-300 mb-3">
                If you need admin access, use the button below to convert your account:
              </p>
              <div className="flex gap-2">
                <Button 
                  onClick={handleMakeAdmin} 
                  disabled={isConverting}
                  variant="outline"
                  size="sm"
                  className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-600 dark:text-amber-300 dark:hover:bg-amber-900/50"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  {isConverting ? 'Converting...' : 'Make Me Admin'}
                </Button>
                <Button 
                  onClick={checkUserStatus} 
                  variant="outline"
                  size="sm"
                  className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-600 dark:text-amber-300 dark:hover:bg-amber-900/50"
                >
                  Debug Status
                </Button>
              </div>
              {debugInfo && (
                <div className="mt-3 p-2 bg-amber-100 dark:bg-amber-900/30 rounded text-xs">
                  <pre className="whitespace-pre-wrap text-amber-800 dark:text-amber-200">
                    {JSON.stringify(debugInfo, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quick-access">Quick Access</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Provinces</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{provinces.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Provinces in Zambia</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Population</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">19.6M</div>
                <p className="text-xs text-muted-foreground mt-1">Estimated total population</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Data Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground mt-1">Major data categories available</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Data Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">450+</div>
                <p className="text-xs text-muted-foreground mt-1">Unique data points tracked</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
                <CardDescription>Latest data updates and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-start pb-4 last:pb-0 border-b last:border-0 border-gray-200 dark:border-gray-700">
                      <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                        {i === 0 ? <BarChart3 className="h-4 w-4 text-primary" /> : 
                         i === 1 ? <Database className="h-4 w-4 text-primary" /> : 
                         <LineChart className="h-4 w-4 text-primary" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {i === 0 ? 'Health Statistics Updated' : 
                           i === 1 ? 'New Agricultural Data Added' : 
                           'Economic Indicators Refreshed'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {i === 0 ? '2 days ago' : i === 1 ? '5 days ago' : '1 week ago'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Stats</CardTitle>
                <CardDescription>Your platform usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Views</span>
                    <span className="text-sm font-medium">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reports Generated</span>
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Login</span>
                    <span className="text-sm font-medium">Today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quick-access">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={link.onClick}>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    {link.icon}
                  </div>
                  <h3 className="font-semibold">{link.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">Access {link.title.toLowerCase()} data</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Email</h3>
                  <p className="text-sm">{user?.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Full Name</h3>
                  <p className="text-sm">{user?.user_metadata?.full_name || 'Not provided'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Username</h3>
                  <p className="text-sm">{user?.user_metadata?.username || 'Not provided'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Account Type</h3>
                  <p className="text-sm">Standard User</p>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Dashboard;

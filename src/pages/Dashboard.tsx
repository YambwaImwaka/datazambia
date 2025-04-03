import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart3, LineChart, Map, FileText, Users, Settings, Database, Activity, UserPlus } from 'lucide-react';
import { provinces } from '@/utils/data';
import PageLayout from '@/components/layout/PageLayout';

const Dashboard = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const quickLinks = [
    { title: 'Provinces', icon: <Map className="h-6 w-6" />, onClick: () => navigate('/provinces') },
    { title: 'Health Stats', icon: <Activity className="h-6 w-6" />, onClick: () => navigate('/explore/health') },
    { title: 'Economy', icon: <LineChart className="h-6 w-6" />, onClick: () => navigate('/explore/economy') },
    { title: 'Agriculture', icon: <Database className="h-6 w-6" />, onClick: () => navigate('/explore/agriculture') },
  ];

  const adminLinks = [
    { title: 'Manage Users', icon: <Users className="h-6 w-6" />, onClick: () => navigate('/admin/users') },
    { title: 'System Settings', icon: <Settings className="h-6 w-6" />, onClick: () => navigate('/admin/settings') },
    { title: 'Data Management', icon: <Database className="h-6 w-6" />, onClick: () => navigate('/admin/data') },
    { title: 'Reports', icon: <FileText className="h-6 w-6" />, onClick: () => navigate('/admin/reports') },
    { title: 'Create Admin', icon: <UserPlus className="h-6 w-6" />, onClick: () => navigate('/create-admin') },
  ];

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.user_metadata?.full_name || user?.email}</h1>
        <p className="text-muted-foreground mt-2">
          {isAdmin ? 'Admin Dashboard' : 'User Dashboard'} - Access Zambia's key data insights
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quick-access">Quick Access</TabsTrigger>
          {isAdmin && <TabsTrigger value="admin">Admin Panel</TabsTrigger>}
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

        {isAdmin && (
          <TabsContent value="admin">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {adminLinks.map((link, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={link.onClick}>
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      {link.icon}
                    </div>
                    <h3 className="font-semibold">{link.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{link.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}

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
                  <p className="text-sm">{isAdmin ? 'Administrator' : 'Standard User'}</p>
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

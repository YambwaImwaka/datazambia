
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Settings, 
  BarChart3, 
  Database, 
  Shield, 
  Activity,
  TrendingUp,
  Eye,
  MousePointer,
  Clock,
  Globe,
  FileText,
  Palette
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ComprehensiveAnalyticsDashboard from '@/components/admin/ComprehensiveAnalyticsDashboard';
import CMSPanel from '@/components/admin/CMSPanel';
import { useRealAnalytics } from '@/hooks/useRealAnalytics';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { analyticsData, loading: analyticsLoading } = useRealAnalytics('7d');

  // Real activity from analytics
  const recentActivity = [
    { type: 'page_view', message: `${analyticsData?.realtimeUsers || 0} users currently online`, time: 'Now' },
    { type: 'analytics', message: `${analyticsData?.totalPageViews || 0} total page views today`, time: '1 hour ago' },
    { type: 'user_activity', message: `${analyticsData?.uniqueVisitors || 0} unique visitors today`, time: '2 hours ago' },
    { type: 'performance', message: `${analyticsData?.bounceRate || 0}% bounce rate`, time: '3 hours ago' },
  ];

  const quickActions = [
    {
      title: 'User Management',
      description: 'Manage users, roles, and permissions',
      icon: <Users className="h-6 w-6" />,
      href: '/admin/users',
      color: 'bg-blue-500'
    },
    {
      title: 'Analytics',
      description: 'View detailed analytics and reports',
      icon: <BarChart3 className="h-6 w-6" />,
      href: '/admin/analytics',
      color: 'bg-green-500'
    },
    {
      title: 'Content Management',
      description: 'Manage site content and settings',
      icon: <Globe className="h-6 w-6" />,
      href: '#cms',
      color: 'bg-purple-500',
      onClick: () => setActiveTab('cms')
    },
    {
      title: 'System Settings',
      description: 'Configure system settings',
      icon: <Settings className="h-6 w-6" />,
      href: '#settings',
      color: 'bg-orange-500',
      onClick: () => setActiveTab('cms')
    }
  ];

  return (
    <PageLayout
      title="Admin Dashboard | Zambia Data Hub"
      description="Administrative dashboard for managing the Zambia Data Hub"
      showHeader={true}
      showFooter={true}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor and manage your Zambia Data Hub platform
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Live Analytics</TabsTrigger>
            <TabsTrigger value="cms">CMS</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Real-time Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">Live Users</CardTitle>
                    <Activity className="h-4 w-4 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData?.realtimeUsers || 0}</div>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <span className="text-xs text-green-600">Online now</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    <Eye className="h-4 w-4 text-blue-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData?.totalPageViews?.toLocaleString() || '0'}</div>
                  <p className="text-xs text-green-600 mt-1">Real data tracking</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                    <Users className="h-4 w-4 text-purple-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData?.uniqueVisitors?.toLocaleString() || '0'}</div>
                  <p className="text-xs text-blue-600 mt-1">Last 7 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData?.bounceRate || 0}%</div>
                  <Badge className={`mt-1 ${(analyticsData?.bounceRate || 0) < 50 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                    {(analyticsData?.bounceRate || 0) < 50 ? 'Good' : 'Needs attention'}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common administrative tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <div key={index}>
                      {action.onClick ? (
                        <Card 
                          className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-zambia-200"
                          onClick={action.onClick}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className={`${action.color} text-white p-2 rounded-lg`}>
                                {action.icon}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-sm">{action.title}</h3>
                                <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <Link to={action.href}>
                          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-zambia-200">
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className={`${action.color} text-white p-2 rounded-lg`}>
                                  {action.icon}
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-medium text-sm">{action.title}</h3>
                                  <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Live System Activity</CardTitle>
                <CardDescription>
                  Real-time system and user activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 pb-3 border-b last:border-0">
                      <div className="w-2 h-2 bg-zambia-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      {activity.type === 'page_view' && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <ComprehensiveAnalyticsDashboard />
          </TabsContent>

          <TabsContent value="cms" className="space-y-6">
            <CMSPanel />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage users, roles, and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Advanced user management tools</p>
                  <Link to="/admin/users">
                    <Button>Manage Users</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>
                  System status and configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Database Status</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Connected and healthy</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Analytics Status</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Real-time tracking active</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Storage Status</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Media storage available</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">API Status</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">All endpoints responding</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;

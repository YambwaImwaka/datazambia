
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Activity, 
  Database, 
  Shield, 
  Settings, 
  BarChart3, 
  FileText, 
  Globe,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Server,
  HardDrive,
  Network,
  Cpu,
  Memory,
  RefreshCw,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Mail,
  Bell,
  Heart,
  MessageSquare,
  Download,
  Upload,
  Trash2,
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  Globe2,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSystemSettings } from '@/hooks/useSystemSettings';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  totalPageViews: number;
  totalSessions: number;
  averageSessionDuration: number;
  bounceRate: number;
  systemUptime: number;
  databaseSize: number;
  storageUsed: number;
  cpuUsage: number;
  memoryUsage: number;
  networkTraffic: number;
  errorRate: number;
  responseTime: number;
}

interface RecentActivity {
  id: string;
  type: 'user_registration' | 'login' | 'page_view' | 'error' | 'admin_action';
  description: string;
  timestamp: string;
  user?: string;
  severity?: 'low' | 'medium' | 'high';
}

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalUsers: 0,
    activeUsers: 0,
    totalPageViews: 0,
    totalSessions: 0,
    averageSessionDuration: 0,
    bounceRate: 0,
    systemUptime: 99.9,
    databaseSize: 0,
    storageUsed: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    networkTraffic: 0,
    errorRate: 0,
    responseTime: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const { settings, updateSettings } = useSystemSettings();

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch user metrics
      let totalUsers = 0;
      try {
        const { count } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        totalUsers = count || 0;
      } catch (error) {
        console.warn('Could not fetch user count:', error);
      }

      // Fetch analytics data
      let analyticsData = null;
      try {
        const { data } = await supabase
          .from('analytics_sessions')
          .select('*')
          .gte('started_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
        analyticsData = data;
      } catch (error) {
        console.warn('Could not fetch analytics data:', error);
      }

      // Fetch recent activity
      let activityData = null;
      try {
        const { data } = await supabase
          .from('analytics_events')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
        activityData = data;
      } catch (error) {
        console.warn('Could not fetch activity data:', error);
      }

      // Calculate metrics
      const activeUsers = analyticsData?.length || 0;
      const totalSessions = analyticsData?.length || 0;
      const averageSessionDuration = analyticsData?.reduce((sum, session) => 
        sum + (session.session_duration || 0), 0) / Math.max(totalSessions, 1) / 1000;
      
      const bounceSessions = analyticsData?.filter(s => s.is_bounce).length || 0;
      const bounceRate = totalSessions > 0 ? (bounceSessions / totalSessions) * 100 : 0;

      // Simulate system metrics (in real app, these would come from monitoring)
      const systemMetrics: SystemMetrics = {
        totalUsers: totalUsers || 0,
        activeUsers,
        totalPageViews: activityData?.filter(e => e.event_type === 'page_view').length || 0,
        totalSessions,
        averageSessionDuration: Math.round(averageSessionDuration),
        bounceRate: Math.round(bounceRate),
        systemUptime: 99.9,
        databaseSize: 2.5, // GB
        storageUsed: 45, // %
        cpuUsage: Math.random() * 30 + 20, // 20-50%
        memoryUsage: Math.random() * 40 + 30, // 30-70%
        networkTraffic: Math.random() * 100 + 50, // MB/s
        errorRate: Math.random() * 2, // %
        responseTime: Math.random() * 200 + 50, // ms
      };

      setMetrics(systemMetrics);

      // Process recent activity
      const processedActivity: RecentActivity[] = (activityData || []).map(event => ({
        id: event.id,
        type: event.event_type === 'page_view' ? 'page_view' : 'login',
        description: `${event.event_type === 'page_view' ? 'Page viewed' : 'User action'}: ${event.page_path}`,
        timestamp: event.created_at,
        user: event.user_id,
        severity: 'low' as const,
      }));

      setRecentActivity(processedActivity);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return 'text-green-600';
    if (value <= thresholds.warning) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (value <= thresholds.warning) return <Clock className="h-4 w-4 text-yellow-600" />;
    return <AlertTriangle className="h-4 w-4 text-red-600" />;
  };

  const quickActions = [
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: <Users className="h-6 w-6" />,
      href: '/admin/users',
      color: 'bg-blue-500',
    },
    {
      title: 'Analytics',
      description: 'View detailed analytics and reports',
      icon: <BarChart3 className="h-6 w-6" />,
      href: '/admin/analytics',
      color: 'bg-green-500',
    },
    {
      title: 'System Settings',
      description: 'Configure system-wide settings',
      icon: <Settings className="h-6 w-6" />,
      href: '/admin/settings',
      color: 'bg-purple-500',
    },
    {
      title: 'Content Management',
      description: 'Manage site content and media',
      icon: <FileText className="h-6 w-6" />,
      href: '/admin/content',
      color: 'bg-orange-500',
    },
  ];

  const featureStatuses = [
    {
      name: 'User Registration',
      enabled: settings.enable_user_registration,
      icon: <Users className="h-4 w-4" />,
    },
    {
      name: 'Analytics',
      enabled: settings.enable_analytics,
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      name: 'AI Features',
      enabled: settings.enable_ai_features,
      icon: <Zap className="h-4 w-4" />,
    },
    {
      name: 'Notifications',
      enabled: settings.enable_notifications,
      icon: <Bell className="h-4 w-4" />,
    },
    {
      name: 'User Favorites',
      enabled: settings.enable_user_favorites,
      icon: <Heart className="h-4 w-4" />,
    },
    {
      name: 'Comments',
      enabled: settings.enable_comments,
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      name: 'Data Export',
      enabled: settings.enable_export_features,
      icon: <Download className="h-4 w-4" />,
    },
    {
      name: 'Maintenance Mode',
      enabled: settings.maintenance_mode,
      icon: <Lock className="h-4 w-4" />,
    },
  ];

  return (
    <PageLayout
      title="Admin Dashboard | Data Zambia"
      description="Monitor and manage your Data Zambia platform"
      showHeader={true}
      showFooter={true}
    >
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage your Data Zambia platform</p>
          </div>
          <Button onClick={fetchDashboardData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 10 + 5)}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users (24h)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.floor((metrics.activeUsers / Math.max(metrics.totalUsers, 1)) * 100)}% of total users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views (24h)</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalPageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.floor(metrics.totalPageViews / Math.max(metrics.activeUsers, 1))} per user
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.systemUptime}%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CPU Usage</span>
                    <span className="text-sm font-medium">{metrics.cpuUsage.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.cpuUsage} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Memory Usage</span>
                    <span className="text-sm font-medium">{metrics.memoryUsage.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.memoryUsage} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Storage Used</span>
                    <span className="text-sm font-medium">{metrics.storageUsed}%</span>
                  </div>
                  <Progress value={metrics.storageUsed} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response Time</span>
                    <span className="text-sm font-medium">{metrics.responseTime.toFixed(0)}ms</span>
                  </div>
                  <Progress value={Math.min((metrics.responseTime / 500) * 100, 100)} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* User Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  User Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{metrics.totalSessions}</div>
                    <div className="text-sm text-muted-foreground">Sessions (24h)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{metrics.averageSessionDuration}s</div>
                    <div className="text-sm text-muted-foreground">Avg. Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{metrics.bounceRate.toFixed(1)}%</div>
                    <div className="text-sm text-muted-foreground">Bounce Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{metrics.errorRate.toFixed(2)}%</div>
                    <div className="text-sm text-muted-foreground">Error Rate</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Device Distribution</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                      <Monitor className="h-4 w-4 mx-auto mb-1" />
                      <div className="text-xs font-medium">Desktop</div>
                      <div className="text-xs text-muted-foreground">65%</div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded">
                      <Smartphone className="h-4 w-4 mx-auto mb-1" />
                      <div className="text-xs font-medium">Mobile</div>
                      <div className="text-xs text-muted-foreground">30%</div>
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded">
                      <Tablet className="h-4 w-4 mx-auto mb-1" />
                      <div className="text-xs font-medium">Tablet</div>
                      <div className="text-xs text-muted-foreground">5%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.title} to={action.href}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white mb-3`}>
                          {action.icon}
                        </div>
                        <h3 className="font-semibold mb-1">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database Size</span>
                    <span className="text-sm font-medium">{metrics.databaseSize} GB</span>
                  </div>
                  <Progress value={(metrics.databaseSize / 10) * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Network Traffic</span>
                    <span className="text-sm font-medium">{metrics.networkTraffic.toFixed(1)} MB/s</span>
                  </div>
                  <Progress value={Math.min((metrics.networkTraffic / 200) * 100, 100)} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Error Rate</span>
                    <span className="text-sm font-medium">{metrics.errorRate.toFixed(2)}%</span>
                  </div>
                  <Progress value={Math.min(metrics.errorRate * 50, 100)} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Healthy</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage</span>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(metrics.storageUsed, { good: 70, warning: 85 })}
                    <span className={`text-sm ${getStatusColor(metrics.storageUsed, { good: 70, warning: 85 })}`}>
                      {metrics.storageUsed}% Used
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">CPU</span>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(metrics.cpuUsage, { good: 60, warning: 80 })}
                    <span className={`text-sm ${getStatusColor(metrics.cpuUsage, { good: 60, warning: 80 })}`}>
                      {metrics.cpuUsage.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Memory</span>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(metrics.memoryUsage, { good: 70, warning: 85 })}
                    <span className={`text-sm ${getStatusColor(metrics.memoryUsage, { good: 70, warning: 85 })}`}>
                      {metrics.memoryUsage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Status</CardTitle>
              <CardDescription>Current status of system features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {featureStatuses.map((feature) => (
                  <div key={feature.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-muted-foreground">
                        {feature.icon}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{feature.name}</div>
                      </div>
                    </div>
                    <Badge variant={feature.enabled ? "default" : "secondary"}>
                      {feature.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system events and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-muted-foreground">
                        {activity.type === 'page_view' ? <Eye className="h-4 w-4" /> :
                         activity.type === 'login' ? <Shield className="h-4 w-4" /> :
                         <Activity className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{activity.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
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

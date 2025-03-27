
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart, Activity, Users, Search } from 'lucide-react';
import { ResponsiveContainer, LineChart as RechartLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart as RechartBar, Bar, PieChart as RechartPie, Pie, Cell } from 'recharts';

const userActivityData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 600 },
  { name: 'Apr', users: 800 },
  { name: 'May', users: 1000 },
  { name: 'Jun', users: 1200 },
  { name: 'Jul', users: 1400 },
];

const pageViewsData = [
  { name: 'Home', views: 5400 },
  { name: 'Provinces', views: 3200 },
  { name: 'Explore', views: 2800 },
  { name: 'Dashboard', views: 2200 },
  { name: 'About', views: 1100 },
];

const contentPopularityData = [
  { name: 'Lusaka', value: 30 },
  { name: 'Copperbelt', value: 25 },
  { name: 'Southern', value: 15 },
  { name: 'Eastern', value: 10 },
  { name: 'Northern', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyticsPanel = () => {
  const [activePeriod, setActivePeriod] = useState('monthly');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Dashboard</CardTitle>
        <CardDescription>
          Monitor usage and performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="user-activity" className="space-y-6">
          <TabsList>
            <TabsTrigger value="user-activity">User Activity</TabsTrigger>
            <TabsTrigger value="content-popularity">Content Popularity</TabsTrigger>
            <TabsTrigger value="search-analytics">Search Analytics</TabsTrigger>
          </TabsList>

          <div className="flex justify-end mb-4">
            <TabsList>
              <TabsTrigger value="weekly" onClick={() => setActivePeriod('weekly')}>Weekly</TabsTrigger>
              <TabsTrigger value="monthly" onClick={() => setActivePeriod('monthly')}>Monthly</TabsTrigger>
              <TabsTrigger value="yearly" onClick={() => setActivePeriod('yearly')}>Yearly</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="user-activity" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,721</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">↑ 12%</span> from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,489</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">↑ 8%</span> from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">247</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">↑ 24%</span> from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">User Activity Over Time</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartLine
                    data={userActivityData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                  </RechartLine>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content-popularity" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Top Pages by Views</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBar
                      data={pageViewsData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="views" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </RechartBar>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Popular Provinces</h3>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPie>
                      <Pie
                        data={contentPopularityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {contentPopularityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartPie>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Content Engagement Metrics</CardTitle>
                <CardDescription>
                  User interactions with different types of content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Province Profiles</span>
                      <span className="text-sm font-medium">64%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: '64%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Health Statistics</span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Economic Data</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-purple-500 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="search-analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Search Terms</CardTitle>
                <CardDescription>
                  Most frequently searched keywords
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Lusaka population', 'economic growth', 'health indicators', 'agriculture statistics', 'copper production'].map((term, index) => (
                    <div key={index} className="flex items-center justify-between pb-2 border-b last:border-0">
                      <div className="flex items-center">
                        <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{term}</span>
                      </div>
                      <span className="text-sm font-medium">{Math.floor(Math.random() * 200) + 50} searches</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Search Volume Over Time</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartLine
                    data={[
                      { name: 'Jan', searches: 300 },
                      { name: 'Feb', searches: 450 },
                      { name: 'Mar', searches: 400 },
                      { name: 'Apr', searches: 650 },
                      { name: 'May', searches: 800 },
                      { name: 'Jun', searches: 950 },
                      { name: 'Jul', searches: 1100 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="searches" stroke="#10b981" strokeWidth={2} />
                  </RechartLine>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalyticsPanel;

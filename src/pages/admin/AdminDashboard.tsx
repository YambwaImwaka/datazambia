
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import SiteConfigPanel from '@/components/admin/SiteConfigPanel';
import ContentManagementPanel from '@/components/admin/ContentManagementPanel';
import UserManagementPanel from '@/components/admin/UserManagementPanel';
import SystemSettingsPanel from '@/components/admin/SystemSettingsPanel';
import AnalyticsPanel from '@/components/admin/AnalyticsPanel';
import MediaManagementPanel from '@/components/admin/MediaManagementPanel';
import AdminAccountsPanel from '@/components/admin/AdminAccountsPanel';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('site-config');

  // Redirect non-admin users
  if (!isAdmin) {
    return (
      <PageLayout>
        <div className="max-w-3xl mx-auto py-12">
          <Alert variant="destructive">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You do not have permission to access the administrator panel.
              This area is restricted to administrators only.
            </AlertDescription>
          </Alert>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Administrator Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage all aspects of the Zambia Insight platform
          </p>
        </div>

        <Tabs defaultValue="site-config" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-7 gap-2">
            <TabsTrigger value="site-config">Site Config</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="site-config">
            <SiteConfigPanel />
          </TabsContent>

          <TabsContent value="content">
            <ContentManagementPanel />
          </TabsContent>

          <TabsContent value="users">
            <UserManagementPanel />
          </TabsContent>

          <TabsContent value="admins">
            <AdminAccountsPanel />
          </TabsContent>

          <TabsContent value="media">
            <MediaManagementPanel />
          </TabsContent>

          <TabsContent value="system">
            <SystemSettingsPanel />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;

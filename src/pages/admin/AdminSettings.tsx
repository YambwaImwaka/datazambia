import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SystemSettingsPanel from '@/components/admin/SystemSettingsPanel';

const AdminSettings = () => {
  return (
    <PageLayout
      title="System Settings | Admin Dashboard"
      description="Configure system-wide settings and feature toggles for the Data Zambia platform"
      showHeader={true}
      showFooter={true}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            System Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Configure system-wide settings, feature toggles, and platform configuration
          </p>
        </div>
        
        <SystemSettingsPanel />
      </div>
    </PageLayout>
  );
};

export default AdminSettings; 
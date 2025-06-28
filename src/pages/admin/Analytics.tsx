
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Analytics = () => {
  const { user } = useAuth();
  
  // Check if user is admin (you'll need to implement this check based on your user roles)
  const isAdmin = user?.isAdmin;
  
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <PageLayout
      title="Analytics Dashboard | Zambia Data Hub"
      description="Monitor website traffic and user behavior analytics"
      showHeader={true}
      showFooter={true}
    >
      <div className="container mx-auto px-4 py-8">
        <AnalyticsDashboard />
      </div>
    </PageLayout>
  );
};

export default Analytics;

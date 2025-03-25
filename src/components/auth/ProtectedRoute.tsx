
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requireAuth = true,
  requireAdmin = false
}) => {
  const { user, isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="ml-2 text-xl font-medium">Loading...</span>
      </div>
    );
  }

  // If authentication is required and user is not logged in, redirect to login
  if (requireAuth && !user) {
    return <Navigate to="/auth/signin" replace />;
  }

  // If admin access is required and user is not an admin, redirect to dashboard
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is authenticated but on a public auth page, redirect to dashboard
  if (user && !requireAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

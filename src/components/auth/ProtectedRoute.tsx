
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  console.log('ProtectedRoute check:', {
    requireAuth,
    requireAdmin,
    user: user?.email,
    isAdmin,
    isLoading,
    currentPath: location.pathname
  });

  // Store the attempted URL in localStorage when redirecting to login
  useEffect(() => {
    if (requireAuth && !isLoading && !user) {
      localStorage.setItem('redirectAfterLogin', location.pathname);
    }
  }, [requireAuth, isLoading, user, location.pathname]);

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
    console.log('Redirecting to signin - no user');
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // If admin access is required and user is not an admin, redirect to user dashboard
  if (requireAdmin && !isAdmin) {
    console.log('Redirecting to dashboard - not admin');
    return <Navigate to="/dashboard" replace />;
  }

  // If user is authenticated but on a public auth page, redirect based on role
  if (user && !requireAuth) {
    console.log('Authenticated user on public page, redirecting based on role');
    if (isAdmin) {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // If user is admin but trying to access regular dashboard, redirect to admin dashboard
  if (user && isAdmin && location.pathname === '/dashboard') {
    console.log('Admin user accessing regular dashboard, redirecting to admin dashboard');
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;


import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;  
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  requireAuth = true,
  requireAdmin = false
}) => {
  const { user, isLoading, isAdmin } = useAuth();
  const location = useLocation();

  console.log('🛡️ ProtectedRoute check:', {
    requireAuth,
    requireAdmin,
    user: user?.email,
    isAdmin,
    isLoading,
    currentPath: location.pathname
  });

  // Show loading while auth state is being determined
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="ml-2 text-xl font-medium">Loading...</span>
      </div>
    );
  }

  // For auth pages (signin/signup) - redirect authenticated users to their dashboard
  if (!requireAuth && user) {
    if (location.pathname === '/auth/signin' || location.pathname === '/auth/signup') {
      console.log('🔄 Authenticated user on auth page, redirecting based on role');
      return <Navigate to={isAdmin ? '/admin/dashboard' : '/dashboard'} replace />;
    }
  }

  // For protected routes that require authentication
  if (requireAuth && !user) {
    console.log('🔒 Redirecting to signin - no user');
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // For admin-only routes
  if (requireAdmin && user && !isAdmin) {
    console.log('🚫 Non-admin trying to access admin route, redirecting to user dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  // For regular user dashboard - redirect admins to admin dashboard
  if (requireAuth && !requireAdmin && user && isAdmin && location.pathname === '/dashboard') {
    console.log('👑 Admin on user dashboard, redirecting to admin dashboard');
    return <Navigate to="/admin/dashboard" replace />;
  }

  // For any authenticated route - check if admin should be redirected
  if (requireAuth && user && isAdmin && !location.pathname.startsWith('/admin/')) {
    console.log('👑 Admin accessing non-admin route, redirecting to admin dashboard');
    return <Navigate to="/admin/dashboard" replace />;
  }

  console.log('✅ Access granted to:', location.pathname);
  return <>{children}</>;
};

export default ProtectedRoute;

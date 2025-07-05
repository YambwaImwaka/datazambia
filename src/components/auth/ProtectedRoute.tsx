
import React, { useEffect } from 'react';
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

  // Show loading spinner while authentication state is being determined
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="ml-2 text-xl font-medium">Loading...</span>
      </div>
    );
  }

  // Handle auth pages - redirect authenticated users away from signin/signup
  if (!requireAuth && user && (location.pathname === '/auth/signin' || location.pathname === '/auth/signup')) {
    console.log('🔄 Authenticated user on auth page, redirecting based on role');
    const redirectTo = isAdmin ? '/admin/dashboard' : '/dashboard';
    return <Navigate to={redirectTo} replace />;
  }

  // Handle protected routes that require authentication
  if (requireAuth && !user) {
    console.log('🔒 Redirecting to signin - no user');
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // Handle admin-only routes
  if (requireAdmin && user && !isAdmin) {
    console.log('🚫 Redirecting to dashboard - not admin');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('✅ Access granted to:', location.pathname);
  return <>{children}</>;
};

export default ProtectedRoute;

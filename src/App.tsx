
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import UsersAdmin from '@/pages/admin/Users';
import Signin from '@/pages/auth/SignIn';
import Signup from '@/pages/auth/SignUp';
import { AuthProvider } from '@/contexts/AuthContext';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ConsentBanner from '@/components/gdpr/ConsentBanner';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AnalyticsProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Toaster />
              <TooltipProvider>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  
                  {/* Public auth routes */}
                  <Route 
                    path="/auth/signin" 
                    element={
                      <ProtectedRoute requireAuth={false}>
                        <Signin />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/auth/signup" 
                    element={
                      <ProtectedRoute requireAuth={false}>
                        <Signup />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Protected user routes */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute requireAuth={true}>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Admin routes */}
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <ProtectedRoute requireAuth={true} requireAdmin={true}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/analytics" 
                    element={
                      <ProtectedRoute requireAuth={true} requireAdmin={true}>
                        <AnalyticsDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/users" 
                    element={
                      <ProtectedRoute requireAuth={true} requireAdmin={true}>
                        <UsersAdmin />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
                <ConsentBanner />
              </TooltipProvider>
            </ThemeProvider>
          </AnalyticsProvider>
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;

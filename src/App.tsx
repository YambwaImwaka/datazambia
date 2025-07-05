
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from '@/pages/Dashboard';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import UsersAdmin from '@/pages/admin/Users';
import Signin from '@/pages/auth/SignIn';
import Signup from '@/pages/auth/SignUp';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreateAdmin from '@/pages/admin/CreateAdmin';
import ConsentBanner from '@/components/gdpr/ConsentBanner';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <TooltipProvider>
              <BrowserRouter>
                <Routes>
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
                    path="/" 
                    element={
                      <ProtectedRoute requireAuth={true}>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
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
                  <Route 
                    path="/create-admin" 
                    element={
                      <ProtectedRoute requireAuth={true} requireAdmin={true}>
                        <CreateAdmin />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
                <ConsentBanner />
              </BrowserRouter>
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;

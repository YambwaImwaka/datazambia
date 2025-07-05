import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from '@/pages/Dashboard';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import UsersAdmin from '@/pages/admin/Users';
import UserDetails from '@/pages/admin/UserDetails';
import Signin from '@/pages/auth/Signin';
import Signup from '@/pages/auth/Signup';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AnalyticsProvider } from '@/contexts/AnalyticsContext';
import { QueryClient } from '@tanstack/react-query';
import CreateAdmin from '@/pages/admin/CreateAdmin';
import ConsentBanner from '@/components/gdpr/ConsentBanner';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <QueryClient>
          <ThemeProvider>
            <Toaster />
            <TooltipProvider>
              <AnalyticsProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/auth/signin" element={<ProtectedRoute requireAuth={false}><Signin /></ProtectedRoute>} />
                    <Route path="/auth/signup" element={<ProtectedRoute requireAuth={false}><Signup /></ProtectedRoute>} />
                    <Route path="/auth/forgot-password" element={<ProtectedRoute requireAuth={false}><ForgotPassword /></ProtectedRoute>} />
                    <Route path="/auth/reset-password" element={<ProtectedRoute requireAuth={false}><ResetPassword /></ProtectedRoute>} />
                    
                    <Route path="/" element={<ProtectedRoute requireAuth={true}><Dashboard /></ProtectedRoute>} />
                    <Route path="/dashboard" element={<ProtectedRoute requireAuth={true}><Dashboard /></ProtectedRoute>} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={<ProtectedRoute requireAuth={true} requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />
                    <Route path="/admin/analytics" element={<ProtectedRoute requireAuth={true} requireAdmin={true}><AnalyticsDashboard /></ProtectedRoute>} />
                    <Route path="/admin/users" element={<ProtectedRoute requireAuth={true} requireAdmin={true}><UsersAdmin /></ProtectedRoute>} />
                    <Route path="/admin/users/:userId" element={<ProtectedRoute requireAuth={true} requireAdmin={true}><UserDetails /></ProtectedRoute>} />
                    <Route path="/create-admin" element={<ProtectedRoute requireAuth={true} requireAdmin={true}><CreateAdmin /></ProtectedRoute>} />
                  </Routes>
                  <ConsentBanner />
                </BrowserRouter>
              </AnalyticsProvider>
            </TooltipProvider>
          </ThemeProvider>
        </QueryClient>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;

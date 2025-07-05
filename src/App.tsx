
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
                  <Route element={<ProtectedRoute requireAuth={false} />}>
                    <Route path="/auth/signin" element={<Signin />} />
                    <Route path="/auth/signup" element={<Signup />} />
                  </Route>
                  
                  <Route element={<ProtectedRoute requireAuth={true} />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Route>
                  
                  <Route element={<ProtectedRoute requireAuth={true} requireAdmin={true} />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
                    <Route path="/admin/users" element={<UsersAdmin />} />
                    <Route path="/create-admin" element={<CreateAdmin />} />
                  </Route>
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

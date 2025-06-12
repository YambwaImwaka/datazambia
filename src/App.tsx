
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import ProvinceProfile from "./pages/ProvinceProfile";
import ProvincesList from "./pages/ProvincesList";
import Explore from "./pages/Explore";
import Education from "./pages/explore/Education";
import Finance from "./pages/Finance";
import AITools from "./pages/AITools";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/profile/UserProfile";
import UserFavorites from "./pages/profile/UserFavorites";
import UsersAdmin from "./pages/admin/Users";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import CreateAdmin from "./pages/admin/CreateAdmin";
import { useState } from "react";

const App = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 300000, // 5 minutes (increased from 1 minute to reduce refreshes)
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/province/:provinceId" element={<ProvinceProfile />} />
                <Route path="/provinces" element={<ProvincesList />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/explore/:categoryId" element={<Explore />} />
                <Route path="/explore/education" element={<Education />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/ai-tools" element={<AITools />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Auth routes - accessible only when NOT logged in */}
                <Route element={<ProtectedRoute requireAuth={false} />}>
                  <Route path="/auth/signin" element={<SignIn />} />
                  <Route path="/auth/signup" element={<SignUp />} />
                </Route>
                
                {/* Protected routes - accessible only when logged in */}
                <Route element={<ProtectedRoute requireAuth={true} />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/favorites" element={<UserFavorites />} />
                  {/* Create Admin route - accessible to all users before first admin is created */}
                  <Route path="/create-admin" element={<CreateAdmin />} />
                </Route>
                
                {/* Admin routes - accessible only to admins */}
                <Route element={<ProtectedRoute requireAuth={true} requireAdmin={true} />}>
                  {/* Redirect /admin to /admin/dashboard for convenience */}
                  <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<UsersAdmin />} />
                  <Route path="/admin/users/:userId" element={<UsersAdmin />} />
                </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Toaster />
            <Sonner />
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

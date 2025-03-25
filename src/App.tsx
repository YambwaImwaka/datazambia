
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import ProvinceProfile from "./pages/ProvinceProfile";
import ProvincesList from "./pages/ProvincesList";
import Explore from "./pages/Explore";
import About from "./pages/About";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import UsersAdmin from "./pages/admin/Users";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 300000, // 5 minutes (increased from 1 minute to reduce refreshes)
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/province/:provinceId" element={<ProvinceProfile />} />
              <Route path="/provinces" element={<ProvincesList />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/explore/:categoryId" element={<Explore />} />
              <Route path="/about" element={<About />} />
              
              {/* Auth routes - accessible only when NOT logged in */}
              <Route element={<ProtectedRoute requireAuth={false} />}>
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
              </Route>
              
              {/* Protected routes - accessible only when logged in */}
              <Route element={<ProtectedRoute requireAuth={true} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Redirect /admin to /admin/users for convenience */}
                <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
              </Route>
              
              {/* Admin routes - accessible only to admins */}
              <Route element={<ProtectedRoute requireAuth={true} requireAdmin={true} />}>
                <Route path="/admin/users" element={<UsersAdmin />} />
                <Route path="/admin/users/:userId" element={<UsersAdmin />} />
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

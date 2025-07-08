
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface UseAuthRedirectProps {
  user: any;
  isLoading: boolean;
  currentPath: string;
}

export const useAuthRedirect = ({ user, isLoading, currentPath }: UseAuthRedirectProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || !user) return;

    const checkAdminStatusAndRedirect = async () => {
      try {
        console.log('🔍 Checking admin status for redirect:', user.email);
        
        const { data: isAdminData, error } = await supabase.rpc('is_admin', { 
          check_user_id: user.id 
        });

        if (error) {
          console.error('❌ Error checking admin status:', error);
          // Default to user dashboard on error
          if (currentPath === '/auth/signin' || currentPath === '/auth/signup') {
            navigate('/dashboard', { replace: true });
          }
          return;
        }

        const isAdmin = !!isAdminData;
        console.log('👑 Admin status:', isAdmin, 'for user:', user.email);

        // Only redirect if coming from auth pages
        if (currentPath === '/auth/signin' || currentPath === '/auth/signup') {
          if (isAdmin) {
            console.log('🔄 Redirecting admin to admin dashboard');
            navigate('/admin/dashboard', { replace: true });
          } else {
            console.log('🔄 Redirecting user to user dashboard');
            navigate('/dashboard', { replace: true });
          }
        }
      } catch (error) {
        console.error('❌ Redirect check error:', error);
        // Fallback to user dashboard
        if (currentPath === '/auth/signin' || currentPath === '/auth/signup') {
          navigate('/dashboard', { replace: true });
        }
      }
    };

    // Small delay to ensure everything is properly initialized
    const timeoutId = setTimeout(checkAdminStatusAndRedirect, 500);
    return () => clearTimeout(timeoutId);
  }, [user, isLoading, currentPath, navigate]);
};

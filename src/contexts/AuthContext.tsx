
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { makeAdmin } from '@/utils/makeAdmin';

// Extend the User type to include isAdmin property
interface User extends SupabaseUser {
  isAdmin?: boolean;
}

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, metadata?: { full_name?: string, username?: string }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  makeUserAdmin: (email: string) => Promise<{success: boolean; message: string}>;
  refreshUserRoles: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Function to check and refresh user roles
  const refreshUserRoles = async () => {
    const currentSession = await supabase.auth.getSession();
    if (currentSession.data.session?.user) {
      console.log('🔍 Checking admin role for user:', currentSession.data.session.user.email);
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', currentSession.data.session.user.id)
        .eq('role', 'admin')
        .single();

      const adminStatus = !!data && !error;
      console.log('👑 Admin check result:', adminStatus, 'for user:', currentSession.data.session.user.email);
      
      setIsAdmin(adminStatus);
      
      if (adminStatus) {
        setUser(currentUser => currentUser ? {...currentUser, isAdmin: true} : null);
        console.log('🎯 User is admin, should redirect to admin dashboard');
      } else {
        console.log('👤 User is not admin, regular user access');
      }
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state change:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user as User ?? null);
        
        if (session?.user) {
          // Check admin role immediately when user is authenticated
          await refreshUserRoles();
          
          // Handle navigation based on event and admin status
          if (event === 'SIGNED_IN') {
            console.log('📍 User signed in, admin status:', isAdmin);
            // Use a small delay to ensure state is updated
            setTimeout(() => {
              if (isAdmin) {
                console.log('🎯 Redirecting admin to admin dashboard');
                navigate('/admin/dashboard', { replace: true });
              } else {
                console.log('🎯 Redirecting regular user to dashboard');
                navigate('/dashboard', { replace: true });
              }
            }, 100);
          }
        } else {
          setIsAdmin(false);
        }
        
        setIsLoading(false);
      }
    );

    // Initial session check
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('🔍 Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user as User ?? null);
      
      if (session?.user) {
        await refreshUserRoles();
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signUp = async (email: string, password: string, metadata?: { full_name?: string, username?: string }) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) {
        throw error;
      }

      toast.success('Registration successful! Please check your email to verify your account.');
      navigate('/auth/signin');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign up');
      console.error('Error during sign up:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success('Successfully signed in!');
      
      // Don't navigate here - let the auth state change handler handle navigation
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign in');
      console.error('Error during sign in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      toast.success('Successfully signed out');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign out');
      console.error('Error during sign out:', error);
    }
  };

  const makeUserAdmin = async (email: string) => {
    if (!isAdmin) {
      return { success: false, message: "Only administrators can promote users" };
    }
    
    try {
      const result = await makeAdmin(email);
      if (result.success) {
        toast.success(`User ${email} has been granted admin privileges`);
        // Refresh roles if the current user was promoted
        if (user?.email === email) {
          await refreshUserRoles();
        }
      } else {
        toast.error(result.message);
      }
      return result;
    } catch (error: any) {
      console.error('Error making admin:', error);
      toast.error(error.message || 'Failed to grant admin privileges');
      return { 
        success: false, 
        message: error.message || 'Failed to grant admin privileges'
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isLoading,
        isAdmin,
        signUp,
        signIn,
        signOut,
        makeUserAdmin,
        refreshUserRoles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

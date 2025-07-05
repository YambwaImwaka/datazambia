
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  refreshUserRoles: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const refreshUserRoles = async () => {
    if (!session?.user) {
      setIsAdmin(false);
      return;
    }

    try {
      console.log('🔍 Checking admin role for user:', session.user.email);
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();

      const adminStatus = !!data && !error;
      console.log('👑 Admin check result:', adminStatus, 'for user:', session.user.email);
      
      setIsAdmin(adminStatus);
      
      if (adminStatus) {
        setUser(currentUser => currentUser ? {...currentUser, isAdmin: true} : null);
      }
    } catch (error) {
      console.error('Error refreshing user roles:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted) {
          console.log('🔍 Initial session check:', session?.user?.email);
          setSession(session);
          setUser(session?.user as User ?? null);
          
          if (session?.user) {
            await refreshUserRoles();
          }
          
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('🔄 Auth state change:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user as User ?? null);
        
        if (session?.user) {
          // Refresh roles after a short delay to ensure the session is fully established
          setTimeout(async () => {
            if (mounted) {
              await refreshUserRoles();
            }
          }, 100);
        } else {
          setIsAdmin(false);
        }
      }
    );

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, metadata?: { full_name?: string, username?: string }) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/`
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

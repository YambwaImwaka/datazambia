
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
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        // Cast the user to our extended User type
        setUser(session?.user as User ?? null);
        setIsLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // Cast the user to our extended User type
      setUser(session?.user as User ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    const checkAdminRole = async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      // Update both the isAdmin state and user object
      setIsAdmin(!!data && !error);
      if (user && (!!data && !error)) {
        setUser(currentUser => currentUser ? {...currentUser, isAdmin: true} : null);
      }
    };

    checkAdminRole();
  }, [user]);

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
      navigate('/');
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


import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AdminSignupFlowProps {
  email: string;
  password: string;
  metadata?: { full_name?: string; username?: string };
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const AdminSignupFlow: React.FC<AdminSignupFlowProps> = ({
  email,
  password,
  metadata,
  onSuccess,
  onError
}) => {
  const handleAdminSignup = async () => {
    try {
      console.log('🔧 Starting admin signup process for:', email);
      
      // Step 1: Create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/`
        },
      });

      if (authError) {
        console.error('❌ Auth signup error:', authError);
        
        // Handle specific errors with user-friendly messages
        let errorMessage = authError.message;
        if (authError.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists';
        } else if (authError.message.includes('Password should be at least')) {
          errorMessage = 'Password must be at least 6 characters long';
        } else if (authError.message.includes('Signup requires a valid password')) {
          errorMessage = 'Please enter a valid password';
        } else if (authError.message.includes('Invalid email')) {
          errorMessage = 'Please enter a valid email address';
        }
        
        toast.error(errorMessage);
        onError(errorMessage);
        return;
      }

      if (!authData.user) {
        const errorMsg = 'User creation failed - no user data returned';
        toast.error(errorMsg);
        onError(errorMsg);
        return;
      }

      console.log('✅ User created successfully:', authData.user.id);

      // Step 2: Assign admin role using promote_user_to_admin function
      console.log('👑 Assigning admin role...');
      const { data: promoteResult, error: roleError } = await supabase.rpc('promote_user_to_admin', { target_email: email });
      
      if (roleError) {
        console.error('❌ Admin role assignment error:', roleError);
        toast.error('Account created but admin role assignment failed. Please contact support.');
        onError('Admin role assignment failed: ' + roleError.message);
        return;
      }

      console.log('✅ Admin role assigned successfully:', promoteResult);

      // Step 3: Force sign in the user to get fresh session with admin role
      console.log('🔄 Signing in user to refresh session...');
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        console.error('❌ Sign in after admin role assignment failed:', signInError);
        toast.error('Admin role assigned but sign in failed. Please sign in manually.');
        onError('Sign in failed: ' + signInError.message);
        return;
      }

      console.log('✅ User signed in successfully with admin role');

      toast.success('Admin account created successfully! Please check your email to verify your account.');
      onSuccess();
      
    } catch (error: any) {
      console.error('❌ Admin signup error:', error);
      const errorMessage = error.message || 'Admin signup failed';
      toast.error(errorMessage);
      onError(errorMessage);
    }
  };

  // This component doesn't render anything, it's just a logic component
  React.useEffect(() => {
    handleAdminSignup();
  }, []);

  return null;
};

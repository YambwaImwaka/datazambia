
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
        
        // Handle specific password validation error
        if (authError.message.includes('Password should contain at least one character')) {
          toast.error('Password must contain at least one lowercase letter, uppercase letter, number, and special character');
          onError('Password must contain at least one lowercase letter, uppercase letter, number, and special character');
          return;
        }
        
        // Handle other auth errors with user-friendly messages
        let errorMessage = authError.message;
        if (authError.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists';
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

      // Step 2: Assign admin role immediately
      console.log('👑 Assigning admin role...');
      const { error: roleError } = await supabase.rpc('make_admin', { email });
      
      if (roleError) {
        console.error('❌ Admin role assignment error:', roleError);
        toast.error('Account created but admin role assignment failed. Please contact support.');
        onError('Admin role assignment failed');
        return;
      }

      console.log('✅ Admin role assigned successfully');
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

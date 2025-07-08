
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
        throw authError;
      }

      if (!authData.user) {
        throw new Error('User creation failed - no user data returned');
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
      onError(error.message || 'Admin signup failed');
    }
  };

  // This component doesn't render anything, it's just a logic component
  React.useEffect(() => {
    handleAdminSignup();
  }, []);

  return null;
};

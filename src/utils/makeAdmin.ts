
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * This utility function can be used to create an admin user programmatically
 * 
 * Usage: 
 * 1. Call this function from your browser console or from your application
 * 2. Pass the email of the user you want to make an admin
 * 
 * Example:
 * import { makeAdmin } from '@/utils/makeAdmin';
 * makeAdmin('user@example.com').then(console.log);
 */
export const makeAdmin = async (email: string) => {
  try {
    // First check if user exists
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();
    
    if (userError) {
      // Fall back to checking auth.users (requires admin function)
      const { data, error } = await supabase.rpc('make_admin', { email });
      
      if (error) throw error;
      
      return { success: true, message: `User ${email} has been granted admin privileges` };
    }
    
    if (!userData) {
      return { 
        success: false, 
        message: `User with email ${email} not found. They must register first.`, 
      };
    }
    
    // If we found the user in profiles, add the admin role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userData.id,
        role: 'admin'
      });
    
    if (roleError) {
      if (roleError.code === '23505') { // Unique violation
        return { 
          success: false, 
          message: `User ${email} is already an admin`, 
        };
      }
      throw roleError;
    }
    
    return { success: true, message: `User ${email} has been granted admin privileges` };
  } catch (error: any) {
    console.error('Error making admin:', error);
    return { 
      success: false, 
      message: error.message || 'Failed to grant admin privileges', 
      error 
    };
  }
};

/**
 * This utility function can be used to remove admin privileges from a user
 * 
 * @param userId - The user ID of the admin to demote
 * @returns Promise with success/error information
 */
export const removeAdmin = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role', 'admin');
    
    if (error) throw error;
    
    return { success: true, message: `Admin privileges have been removed from user` };
  } catch (error: any) {
    console.error('Error removing admin:', error);
    return { 
      success: false, 
      message: error.message || 'Failed to remove admin privileges', 
      error 
    };
  }
};

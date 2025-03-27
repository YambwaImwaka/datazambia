
import { supabase } from '@/integrations/supabase/client';

/**
 * This utility function can be used to create an admin user programmatically
 * 
 * Usage: 
 * 1. Call this function from your browser console
 * 2. Pass the email of the user you want to make an admin
 * 
 * Example:
 * import { makeAdmin } from '@/utils/makeAdmin';
 * makeAdmin('user@example.com').then(console.log);
 */
export const makeAdmin = async (email: string) => {
  try {
    const { data, error } = await supabase.rpc('make_admin', { email });
    
    if (error) throw error;
    
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


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
    console.log(`🔄 Starting admin conversion for: ${email}`);
    
    // First, try to use the database function which handles everything
    const { data, error } = await supabase.rpc('make_admin', { email });
    
    if (error) {
      console.error('❌ Database function error:', error);
      throw error;
    }
    
    console.log('✅ Admin conversion successful via database function');
    return { success: true, message: `User ${email} has been granted admin privileges` };
    
  } catch (error: any) {
    console.error('❌ Error making admin:', error);
    
    // If the database function fails, try manual approach
    try {
      console.log('🔄 Trying manual approach...');
      
      // Get current user to check if they're the one being promoted
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (currentUser && currentUser.email === email) {
        // If it's the current user, add the role directly
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: currentUser.id,
            role: 'admin'
          });
        
        if (roleError) {
          if (roleError.code === '23505') { // Unique violation
            console.log('ℹ️ User is already an admin');
            return { 
              success: true, 
              message: `User ${email} is already an admin`, 
            };
          }
          throw roleError;
        }
        
        console.log('✅ Manual admin conversion successful');
        return { success: true, message: `User ${email} has been granted admin privileges` };
      }
      
      return { 
        success: false, 
        message: `Cannot convert ${email} - user not found or not current user`, 
      };
      
    } catch (manualError: any) {
      console.error('❌ Manual approach failed:', manualError);
      return { 
        success: false, 
        message: error.message || 'Failed to grant admin privileges', 
        error 
      };
    }
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


import { supabase } from '@/integrations/supabase/client';

/**
 * This utility function can be used to create an admin user programmatically
 */
export const makeAdmin = async (email: string) => {
  try {
    console.log(`🔄 Starting admin conversion for: ${email}`);
    
    // First, get the user ID by email from auth.users via the admin_users view
    const { data: userData, error: userError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', email)
      .single();
    
    if (userError || !userData) {
      console.error('❌ User not found:', userError);
      return { 
        success: false, 
        message: `User with email ${email} not found or not verified`
      };
    }
    
    console.log('✅ Found user:', userData.id);
    
    // Add the admin role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userData.id,
        role: 'admin'
      });
    
    if (roleError) {
      if (roleError.code === '23505') { // Unique violation - user is already admin
        console.log('ℹ️ User is already an admin');
        return { 
          success: true, 
          message: `User ${email} is already an admin`
        };
      }
      throw roleError;
    }
    
    console.log('✅ Admin role granted successfully');
    return { 
      success: true, 
      message: `User ${email} has been granted admin privileges` 
    };
    
  } catch (error: any) {
    console.error('❌ Error making admin:', error);
    return { 
      success: false, 
      message: error.message || 'Failed to grant admin privileges'
    };
  }
};

/**
 * This utility function can be used to remove admin privileges from a user
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
      message: error.message || 'Failed to remove admin privileges'
    };
  }
};


import { supabase } from '@/integrations/supabase/client';

/**
 * This utility function can be used to create an admin user programmatically
 */
export const makeAdmin = async (email: string) => {
  try {
    console.log(`🔄 Starting admin conversion for: ${email}`);
    
    // Get the current user's session to access their ID
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.user) {
      console.error('❌ No authenticated user found:', sessionError);
      return { 
        success: false, 
        message: 'You must be logged in to convert to admin'
      };
    }
    
    // Check if the email matches the current user's email
    if (session.user.email !== email) {
      console.error('❌ Email mismatch');
      return { 
        success: false, 
        message: 'You can only convert your own account to admin'
      };
    }
    
    console.log('✅ Found user:', session.user.id);
    
    // Add the admin role using the current user's ID
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: session.user.id,
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
      console.error('❌ Error adding admin role:', roleError);
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

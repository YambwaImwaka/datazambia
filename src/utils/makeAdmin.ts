
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
    // Call the Supabase RPC function
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

// Execute this immediately to make test@gmail.com an admin
if (typeof window !== 'undefined') {
  // This will only run in the browser, not during server-side rendering
  const runOnce = () => {
    const adminEmail = 'test@gmail.com';
    console.log(`Attempting to make ${adminEmail} an admin...`);
    
    makeAdmin(adminEmail)
      .then(result => {
        if (result.success) {
          console.log('✅ Success:', result.message);
          // Show a toast notification
          if (window.toast) {
            window.toast.success(result.message);
          }
        } else {
          console.error('❌ Error:', result.message);
          // Show error toast
          if (window.toast) {
            window.toast.error(result.message);
          }
        }
      });
  };
  
  // Run once after a short delay to ensure the page is loaded
  setTimeout(runOnce, 2000);
}

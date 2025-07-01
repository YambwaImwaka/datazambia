
import { makeAdmin } from './makeAdmin';

// Function to convert a specific user to admin
export const convertUserToAdmin = async (email: string) => {
  try {
    console.log(`Converting user ${email} to admin...`);
    const result = await makeAdmin(email);
    
    if (result.success) {
      console.log(`✅ Success: ${result.message}`);
      return result;
    } else {
      console.error(`❌ Error: ${result.message}`);
      return result;
    }
  } catch (error: any) {
    console.error('❌ Unexpected error:', error);
    return {
      success: false,
      message: error.message || 'An unexpected error occurred'
    };
  }
};

// Execute the conversion immediately
convertUserToAdmin('hello@datazambia.com').then(result => {
  if (result.success) {
    console.log('🎉 User successfully converted to admin!');
  } else {
    console.log('💥 Failed to convert user to admin');
  }
});

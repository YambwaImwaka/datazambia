
import { makeAdmin } from './makeAdmin';

// Function to convert a specific user to admin
export const convertUserToAdmin = async (email: string) => {
  try {
    console.log(`🚀 Converting user ${email} to admin...`);
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

// Execute the conversion immediately when this file is imported/run
console.log('🔧 Starting admin conversion process...');
convertUserToAdmin('hello@datazambia.com').then(result => {
  if (result.success) {
    console.log('🎉 User successfully converted to admin!');
    console.log('🔄 Please refresh the page to see the changes.');
  } else {
    console.log('💥 Failed to convert user to admin:', result.message);
  }
}).catch(error => {
  console.error('💥 Conversion process failed:', error);
});

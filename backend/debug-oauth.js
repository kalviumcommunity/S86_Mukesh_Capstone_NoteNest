// Troubleshooting script for Google OAuth
require('dotenv').config();

console.log('=== Google OAuth Configuration Check ===\n');

// Check environment variables
console.log('Environment Variables:');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✓ Set' : '❌ Missing');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✓ Set' : '❌ Missing');
console.log('CLIENT_URL:', process.env.CLIENT_URL);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✓ Set' : '❌ Missing');

console.log('\n=== Expected Google Console Configuration ===');
console.log('Authorized JavaScript Origins:');
console.log('- http://localhost:5173');
console.log('- https://capstone-notenest.netlify.app');

console.log('\nAuthorized Redirect URIs:');
console.log('- http://localhost:5000/api/auth/google/callback');
console.log('- https://s86-mukesh-capstone-notenest-un0g.onrender.com/api/auth/google/callback');

console.log('\n=== Current OAuth URLs ===');
console.log('OAuth Start URL:', 'http://localhost:5000/api/auth/google');
console.log('OAuth Callback URL:', 'http://localhost:5000/api/auth/google/callback');
console.log('Frontend Callback URL:', process.env.CLIENT_URL + 'auth/callback');

console.log('\n=== Next Steps ===');
if (process.env.GOOGLE_CLIENT_ID === 'your_google_client_id') {
  console.log('❌ 1. Replace GOOGLE_CLIENT_ID with actual value from Google Console');
}
if (process.env.GOOGLE_CLIENT_SECRET === 'your_google_client_secret') {
  console.log('❌ 2. Replace GOOGLE_CLIENT_SECRET with actual value from Google Console');
}
console.log('3. Ensure Google Console redirect URIs match exactly');
console.log('4. Restart the server after updating .env file');
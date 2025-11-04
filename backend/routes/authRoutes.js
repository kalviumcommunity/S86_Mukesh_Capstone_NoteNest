const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { signup, login, updateProfile, getProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Get current user profile (protected)
router.get('/profile', auth, getProfile);

// Update profile (protected)
router.put('/profile', auth, updateProfile);

// Regular auth routes
router.post('/signup', signup);
router.post('/login', login);

// Test route to check OAuth configuration
router.get('/oauth-test', (req, res) => {
  const config = {
    googleClientIdSet: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== 'your_google_client_id'),
    googleClientSecretSet: !!(process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CLIENT_SECRET !== 'your_google_client_secret'),
    clientUrl: process.env.CLIENT_URL,
    jwtSecretSet: !!process.env.JWT_SECRET
  };
  
  res.json({
    message: 'OAuth Configuration Check',
    config,
    ready: config.googleClientIdSet && config.googleClientSecretSet && config.jwtSecretSet
  });
});

// Google OAuth routes
router.get('/google',
  (req, res, next) => {
    console.log('Starting Google OAuth flow...');
    next();
  },
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  (req, res, next) => {
    console.log('Received Google OAuth callback');
    next();
  },
  passport.authenticate('google', { 
    failureRedirect: `${process.env.CLIENT_URL}login?error=auth_failed`,
    session: true
  }),
  async (req, res) => {
    try {
      console.log('Google OAuth success, user:', req.user?.email);
      // Generate JWT token for the authenticated user
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });

      // Ensure CLIENT_URL is defined and ends with a slash
      const clientUrl = process.env.CLIENT_URL || '';
      const normalizedClientUrl = clientUrl.endsWith('/') ? clientUrl : clientUrl + '/';

      // Redirect to frontend with token (encoded)
      const redirectUrl = `${normalizedClientUrl}auth/callback?token=${encodeURIComponent(token)}`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      res.redirect(`${process.env.CLIENT_URL}login?error=server_error`);
    }
  }
);

module.exports = router;

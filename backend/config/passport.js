const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Provide a configurable callback URL. Prefer explicit GOOGLE_CALLBACK_URL set in .env
const DEFAULT_CALLBACK_PATH = '/api/auth/google/callback';
const callbackURL = process.env.GOOGLE_CALLBACK_URL || `${process.env.SERVER_URL || ''}${DEFAULT_CALLBACK_PATH}` || DEFAULT_CALLBACK_PATH;

// Check if Google OAuth credentials are properly set
if (!process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID === 'your_google_client_id') {
  console.error('❌ GOOGLE_CLIENT_ID not set in .env file');
}

if (!process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET === 'your_google_client_secret') {
  console.error('❌ GOOGLE_CLIENT_SECRET not set in .env file');
}

console.log('🔧 Google OAuth Configuration:');
console.log('Client ID:', process.env.GOOGLE_CLIENT_ID ? `${process.env.GOOGLE_CLIENT_ID.substring(0, 10)}...` : 'NOT SET');
console.log('Callback URL:', callbackURL);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with this Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Check if user exists with same email (local auth)
        const email = profile.emails && profile.emails[0] && profile.emails[0].value;
        if (email) {
          user = await User.findOne({ email });
        }

        if (user) {
          // Link Google account to existing user
          user.googleId = profile.id;
          user.authProvider = 'google';
          user.avatar = user.avatar || (profile.photos && profile.photos[0] && profile.photos[0].value) || user.avatar;
          await user.save();
          return done(null, user);
        }

        // Create new user
        user = new User({
          googleId: profile.id,
          name: profile.displayName || (profile.name && `${profile.name.givenName || ''} ${profile.name.familyName || ''}`.trim()),
          email: email,
          avatar: (profile.photos && profile.photos[0] && profile.photos[0].value) || '',
          authProvider: 'google'
        });

        await user.save();
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

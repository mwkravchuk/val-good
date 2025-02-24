const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          // Create a user if not found
          user = await User.create({
            googleId: profile.id,
            email: profile.emails?.[0]?.value || "No email",
            displayName: profile.displayName,
            displayIcon: profile.photos?.[0]?.value || null,
          });

          // Insert their stored-matches into the database for them
          const matches = await fetchGeneralMatches(user.puuid);
          if (matches.length > 0) {
            user.matches = matches;
          }

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

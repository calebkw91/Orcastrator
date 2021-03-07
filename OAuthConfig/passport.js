const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const dotenv = require("dotenv");
dotenv.config();

passport.serializeUser((user, done) => {
    return done(null, user)
})

passport.deserializeUser((user, done) => {
    return done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GoogleID,
    clientSecret: process.env.GoogleSecret,
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        console.log(profile);
        cb(null, profile);
    }
));

passport.use(new GithubStrategy({
    clientID: process.env.GithubID,
    clientSecret: process.env.GithubSecret,
    callbackUrl: "/auth/github/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        console.log(profile);
        cb(null, profile);
    }
))

module.exports = passport
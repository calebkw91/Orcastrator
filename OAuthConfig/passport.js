const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const dotenv = require("dotenv");
const User = require("../models/user");
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

        // User.findOrCreate({ id: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });

        User.findOne({userId: profile.id})
                .then(dbModel => {
                    if(!dbModel){

                        User.create({
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            portrait: profile.photos[0].value,
                            userId: profile.id
                        })
                            .then(dbModel => console.log(dbModel))
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));

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

        User.findOne({userId: profile.id})
                .then(dbModel => {
                    if(!dbModel){

                        User.create({
                            firstName: profile.displayName,
                            lastName: profile.displayName,
                            portrait: profile.photos[0].value,
                            userId: profile.id
                        })
                            .then(dbModel => console.log(dbModel))
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));

        console.log(profile);
        cb(null, profile);
    }
));

module.exports = passport
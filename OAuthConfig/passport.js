const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const LocalStrategy = require("passport-local").Strategy;
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
    callbackURL: "https://orcastrator.herokuapp.com/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOne({ userId: profile.id })
            .then(dbModel => {
                if (!dbModel) {

                    console.log("create user");
                    User.create({
                        name: profile._json.name,
                        portrait: profile.photos[0].value,
                        userId: profile.id
                    })
                        .then(dbModel => console.log(dbModel))
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
        cb(null, profile);
    }
));

passport.use(new GithubStrategy({
    clientID: process.env.GithubID,
    clientSecret: process.env.GithubSecret,
    callbackUrl: "https://orcastrator.herokuapp.com/auth/github/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOne({ userId: profile.id })
            .then(dbModel => {
                if (!dbModel) {
                    User.create({
                        name: profile._json.name,
                        portrait: profile._json.avatar_url,
                        userId: profile.id
                    })
                        .then(dbModel => console.log(dbModel))
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
        cb(null, profile);
    }
));

passport.use(
    new LocalStrategy(
        {
            usernameField: "username",
        },
        async (username, password, done) => {
            User.findOne({
                name: username
            }).then(async (account) => {
                let passCheck;
                if(account){
                 passCheck = await User.comparePassword(password, account.name);
                }
                // if the query was good but the username passed in was not in our account model stop and return this
                if (!account) {
                    return done(null, false);
                }
                // if the query was good but the password passed in did not match the username stop and return this
                else if (!passCheck) {
                    return done(null, false);
                }
                else {
                    return done(null, account);
                }
            });
        }
    )
);

module.exports = passport
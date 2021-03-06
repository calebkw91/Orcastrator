const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const StrategyKeys = require("./index");


// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: StrategyKeys.Facebook.clientID,
    clientSecret: StrategyKeys.Facebook.clientSecret,
    callbackUrl: "/auth/facebook/callback"
},
    // this is the function that will immedietly run after authentication request goes through
    (accessToken, refreshToken, profile, cb) => {
        console.log(JSON.stringify(profile));
        return cb(null, profile);
    }
))

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: StrategyKeys.Google.clientID,
    clientSecret: StrategyKeys.Google.clientSecret,
    callbackUrl: "/auth/google/callback"
},
    // this is the function that will immedietly run after authentication request goes through
    (accessToken, refreshToken, profile, cb) => {
        console.log(JSON.stringify(profile));
        return cb(null, profile);
    }
))

// Github Strategy
passport.use(new GithubStrategy({
    clientID: StrategyKeys.Github.clientID,
    clientSecret: StrategyKeys.Github.clientSecret,
    callbackUrl: "/auth/github/callback"
},
    // this is the function that will immedietly run after authentication request goes through
    (accessToken, refreshToken, profile, cb) => {
        console.log(JSON.stringify(profile));
        return cb(null, profile);
    }
))

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});


// some routes to use with passport

// "/auth/facebook" is the route that should be hit from the front end to start the facebook passport authentication
app.get("/auth/facebook",
    passport.authenticate("facebook")
);

// if facebook login fails return to "/login" otherwise if login succeeds go to "/"
app.get("/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
        res.redirect("/");
    }
);


// "/auth/google" is the route that should be hit from the front end to start the google passport authentication
app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
);

// if google login fails return to "/login" otherwise if login succeeds go to "/"
app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
        res.redirect("/");
    }
);


// "/auth/github" is the route that should be hit from the front end to start the github passport authentication
app.get("/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

// if github login fails return to "/login" otherwise if login succeeds go to "/"
app.get("/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }), (req, res) => {
        res.redirect("/");
    }
);
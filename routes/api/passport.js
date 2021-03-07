const passportRouter = require("express").Router()
const passport = require("../../OAuthConfig/passport");

passportRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
);

passportRouter.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect("http://localhost:3000/");
        // window.location.href="/"
});

passportRouter.get("/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

// if github login fails return to "/login" otherwise if login succeeds go to "/"
passportRouter.get("/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }), (req, res) => {
        res.redirect("http://localhost:3000/");
    }
);

module.exports = passportRouter
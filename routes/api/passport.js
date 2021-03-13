const passportRouter = require("express").Router()
const passport = require("../../OAuthConfig/passport");
const isAuthenticated = require("../../OAuthConfig/isAuthenticated")

passportRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
);

passportRouter.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect("http://localhost:3000/");
        // dashboard instead of /User
});

passportRouter.get("/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

// if github login fails return to "/login" otherwise if login succeeds go to "/"
passportRouter.get("/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }), (req, res) => {
        res.redirect("http://localhost:3000/");
    }
);

passportRouter.get("/User",isAuthenticated, (req, res) => {
    console.log("weeeeeeeeeeeeeeeeeee madddddddddddddddeeeeeeeeeeeeeee ittttttttttttttttttttttt");
    res.json(req.user);
});

passportRouter.get("/logout", (req, res) => {
    console.log("we are in logout");
    req.logout();
    res.redirect("http://localhost:3000/");
  });

module.exports = passportRouter;
const passportRouter = require("express").Router()
const passport = require("../../OAuthConfig/passport");
const isAuthenticated = require("../../OAuthConfig/isAuthenticated")

passportRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
);

passportRouter.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
     
        // console.log(res);
        res.redirect("http://localhost:3000/User");
        // dashboard instead of /User
});

passportRouter.get("/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

// if github login fails return to "/login" otherwise if login succeeds go to "/"
passportRouter.get("/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }), (req, res) => {
        res.redirect("http://localhost:3000/User");
    }
);

passportRouter.get("/User",isAuthenticated, (req, res) => {
    console.log("weeeeeeeeeeeeeeeeeee madddddddddddddddeeeeeeeeeeeeeee ittttttttttttttttttttttt");
    res.json(req.user);
});

module.exports = passportRouter;
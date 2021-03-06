const passportRouter = require("express").Router();
const passport = require("../../OAuthConfig/passport");
const isAuthenticated = require("../../OAuthConfig/isAuthenticated");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

passportRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
);

passportRouter.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect("https://orcastrator.herokuapp.com");
        // dashboard instead of /User
    });

passportRouter.get("/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

// if github login fails return to "/login" otherwise if login succeeds go to "/"
passportRouter.get("/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }), (req, res) => {
        res.redirect("https://orcastrator.herokuapp.com");
    }
);

// local strategy login
passportRouter.post("/auth/local",
    passport.authenticate("local"), (req, res) => {
        res.json(req.user);
    });

passportRouter.get("/User", isAuthenticated, (req, res) => {
    console.log(req.user)
    res.json(req.user);
});

passportRouter.get("/logout", (req, res) => {
    console.log("we are in logout");
    req.logout();
    res.redirect("https://orcastrator.herokuapp.com");
});

passportRouter.post("/signup", (req, res) => {
    User.findOne({ name: req.body.name })
        .then((response) => {
            if (response !== null) {
                res.status(409).json()
            }
            else {
                let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);
                User.create({
                    name: req.body.name,
                    password: password,
                    portrait: req.body.portrait,
                    userId: req.body.id,
                })
                    .then((response) => {
                       res.json(response)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        })
        .catch((err) => {
           console.log(err);
        })
});

module.exports = passportRouter;
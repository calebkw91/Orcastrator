const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("./OAuthConfig/passport");


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
app.use(
    session({ secret: "ssshhhh its a secret", resave: true, saveUninitialized: true })
  );


app.listen(PORT, () =>{
    console.log("app running on:", PORT);
});









const express = require("express");
const cors = require("cors");
const session = require("express-session");
// const passport = require("./OAuthConfig/passport");
const path = require("path");
const mongoose = require("mongoose");


const app = express();
const PORT = process.env.PORT || 8080;
const apiRoutes = require("./routes/apiRoutes");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/orcastrator",
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

// Use apiRoutes
app.use("/api", apiRoutes);

app.use(cors());

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(
//     session({ secret: "ssshhhh its a secret", resave: true, saveUninitialized: true })
// );

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log("app running on:", PORT);
});
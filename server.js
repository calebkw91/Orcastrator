const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport")

const app = express();
const PORT = process.env.PORT || 8080;
const apiRoutes = require("./routes");
const PASSPORTroutes = require("./routes/api/passport");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
    session({
        secret: "supersecret",
        resave: true,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());

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
app.use(PASSPORTroutes);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log("app running on:", PORT);
});
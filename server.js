const http = require('http');
const express = require("express");
const cors = require("cors");
const session = require("express-session");
//const passport = require("./OAuthConfig/passport");
const path = require("path");
const mongoose = require("mongoose");
const socketio = require('socket.io');
// create a variable equal to an express instance.
const app = express();
//create a node.js http server using express
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
//create socket server to listen on our http server
const io = socketio(server);

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

const apiRoutes = require("./routes");
// Use apiRoutes
app.use("/api", apiRoutes);

// app.use(cors());

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
// what socketio should do once connected
io.on('connection',(socket) =>{
    console.log("a user has connected to socket");
})

// start the http server
server.listen(PORT, () => {
    console.log("app running on:", PORT);
});
const http = require("http");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const socketAuthorization = require("./SocketIO/socketAuthorization");
const assignUserToSocket = require("./SocketIO/assignUserToSocket");
const corsOptions = {
  origin: [
    "https://orcastrator.herokuapp.com/",
    "http://localhost:3000",
    "http://localhost/8000/auth/google/callback",
    "http://localhost/8000/auth/github/callback",
  ],
  methods: ["GET", "PUT", "POST"],
  optionsSuccessStatus: 200,
};

// create a variable equal to an express instance.
const app = express();
//create a node.js http server using express
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
//create socket server to listen on our http server
const io = socketio(server, { cors: corsOptions });
//run socket connections through middleware to authenticate
io.use(async (socket, next) => {
  let credential = socket.handshake.auth.userID;
  //check to see userid is not empty
  if (!credential) {
    //if empty return eror to font end
    return next(new Error("invalid username"));
  }
  // if user name exists use async function to await the databases responce
  const socketAuth = await socketAuthorization(socket);
  if (socketAuth === false) {
    //if username is invalid halt connection and return error to front end
    socket.disconnect(true);
  }
  assignUserToSocket(socket);
  next();
});

// what socketio should do once connected
io.on("connection", (socket) => {
  // join a room specific to group
  socket.on("join group", (pod) => {
    socket.join(pod);
    io.to(pod).emit("roomMessage", "you are in room_" + pod);
  });
  // set listener for "chatMessage"
  socket.on("chatMessage", (message, pod, name) => {
    io.to(pod).emit("groupBlast", message, name);
  }); 
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(
  session({
    secret: "supersecret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use;
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/orcastrator", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const apiRoutes = require("./routes");
const PASSPORTroutes = require("./routes/api/passport");

// Use apiRoutes
app.use("/api", apiRoutes);
app.use(PASSPORTroutes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// start the http server
server.listen(PORT, () => {
  console.log("app running on:", PORT);
});

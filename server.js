const http = require("http");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const socketAuthorization = require("./SocketIO/socketAuthorization");
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
const PORT = process.env.PORT || 8080;1
//create socket server to listen on our http server
const io = socketio(server, { cors: corsOptions });
//crun socket connections through middleware to authenticate
io.use(async (socket, next) => {
  console.log(" io.use entry");
  // console.log(socket);
  let credential = socket.handshake.auth.userID;
  console.log(credential);
  if (!credential) {
    return next(new Error("invalid username"));
  }
   const socketAuth = await socketAuthorization(socket)
    if(socketAuth === false) {
      console.log("calling socket disconnect");
      socket.disconnect(true);
    }
    console.log("calling next");
    next();
  
});
// what socketio should do once connected
io.on("connection", (socket) => {
  console.log("this is the socket during connection ");
  console.log(socket.handshake.auth);
  // console.log(typeof(x));
  // socket.join(socket.pod);
  console.log(
    "a user has connected to socket :_" +
      socket.id +
      " username:_" +
      socket.handshake.auth.userID +
      "room:_" +
      socket.handshake.auth.podID
  );
  // io.to(socket.pod).emit(socket.message);
});
// Define middleware here

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
app.use
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

// const namespace = io.of()

// const users = [];
// for (let [id, socket] of io.of("/").sockets) {
//   users.push({
//     userID: id,
//     username: socket.username,
//   });
// }
// socket.emit("users", users);

// io.on("connection", (socket) => {
//     // notify existing users
//     socket.broadcast.emit("user connected", {
//       userID: socket.id,
//       username: socket.username,
//     });
//   });

// start the http server
server.listen(PORT, () => {
  console.log("app running on:", PORT);
});

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
// Define middleware here
//run socket connections through middleware to authenticate
io.use(async (socket, next) => {
  console.log("someone Is trying to connect");
  console.log(socket.handshake.auth);
  let credential = socket.handshake.auth.userID;
  if (credential ==="") {
    return next(new Error("invalid username"));
  }
  const socketAuth = await socketAuthorization(socket);
  if (socketAuth === false) {
    console.log("calling socket disconnect");
    socket.disconnect(true);
  }
  // console.log("calling next");
  assignUserToSocket(socket);
  next();
});

// what socketio should do once connected
io.on('connection', (socket) => {
  socket.on('join group',(pod)=>{
    console.log("inside join pod");
    socket.join(pod);
    io.to(pod).emit("chatMessage","you are in room" + pod);
  })
  socket.on('chatMessage',(message,pod)=>{
    console.log("recived a message now logging");
    console.log(message);
    // callback({status:"ok"});
     io.to(pod).emit("chatMessage",message); 
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

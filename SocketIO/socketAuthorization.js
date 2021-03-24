
const User = require("../models/user");

function socketAuthorization(socket) {
  //set userId passed in from socket auth to variable
  idNum = socket.handshake.auth.userID;
  //look for that variable in database
    return User.findOne({ userId: idNum })
      .then((dbModel,err) => {
        if (err) {
          //if not found return error to front end
          console.log("UnAuthorized #SA1");
          return false;
        }
        //if found return true
        return true;
      })
      .catch((err) => console.log(err));
  }

module.exports = socketAuthorization;

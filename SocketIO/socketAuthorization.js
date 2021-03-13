
const User = require("../models/user");

function socketAuthorization(socket) {
  idNum = socket.handshake.auth.userID;
  console.log("SWEAR WORDS", idNum);
  
    return User.findOne({ userId: idNum })
      .then((dbModel,err) => {
          console.log("RETURN VALS!!!");
          console.log("ERR", err);
          console.log("OTHER THING", dbModel);
        console.log(dbModel + " ____this is the model from mongoose in SA");
        if (err) {
          console.log("UnAuthorized #SA1");
          return false;
        }
        console.log("found a match on socket Authorization");
        return true;
      })
      .catch((err) => console.log(err));
  }

module.exports = socketAuthorization;

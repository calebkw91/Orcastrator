const User = require("../models/user");
const Group = require("../models/group");

function socketAuthorization(socket) {
  idNum = socket.handshake.auth.userID;
  podID = socket.handshake.auth.podID;

    return User.findOne({ userId: idNum })// remove return
      .then((dbModel,err) => {
        if (err) {
          console.log("UnAuthorized #SA1");
          return false;
        }
        return true;// remove return
        // Group.findone({/*what to find:what to match*/})
        // .then((db)=>{/*do stuff with it .. if this returns true then ok the connectio/join*/})
      })
      .catch((err) => console.log(err));
  }

module.exports = socketAuthorization;

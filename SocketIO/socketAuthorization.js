const User = require("../models/user");
const Group = require("../models/group");

function socketAuthorization(socket) {
  idNum = socket.handshake.auth.userID;
  // console.log("SWEAR WORDS", idNum);
  podID = socket.handshake.auth.podID;

    return User.findOne({ userId: idNum })// remove return
      .then((dbModel,err) => {
        //   console.log("RETURN VALS!!!");
        //   console.log("ERR", err);
        //   console.log("OTHER THING", dbModel);
        // console.log(dbModel + " ____this is the model from mongoose in SA");
        if (err) {
          console.log("UnAuthorized #SA1");
          return false;
        }
        // console.log("found a match on socket Authorization");
        return true;// remove return
        // Group.findone({/*what to find:what to match*/})
        // .then((db)=>{/*do stuff with it .. if this returns true then ok the connectio/join*/})
      })
      .catch((err) => console.log(err));
  }

module.exports = socketAuthorization;

const socketIO = require('socket.io');
const User = require("../models/user");

function socketAuthorization (socket){
    idNum = socket.Oid;
    
    User.findOne({userId: idNum})
    .then(dbModel => {
        // console.log(dbModel);
        if(!dbModel){
            console.log("UnAuthorized #SA1");
            return false 
        }
        console.log("found a match on socket Authorization");
        return true;

    })
    .catch(err => console.log(err));

}

module.exports = socketAuthorization;
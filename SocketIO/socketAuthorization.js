const socketIO = require('socket.io');
const User = require("../models/user");

function socketAuthorization (socket){
    idNum = socket.Oid;
    
    User.findOne({userId: idNum})
    .then(dbModel => {
        // console.log(dbModel);
        if(!dbModel){
            return console.log("UnAuthorized #SA1");
        }
        console.log("found a match on socket Authorization");
        return dbModel;

    })
    .catch(err => console.log(err));

}

module.exports = socketAuthorization;
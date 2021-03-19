
function assignUserToSocket(socket){
    const username = socket.handshake.auth.username;
    const userID = socket.handshake.auth.userID;
    const pod = socket.handshake.auth.podID
    console.log(socket.handshake.auth);
    // if(!username||!userID){
    //   return next(new Error("Invalid Username"));
    // }
    socket.username = username;
    socket.userID = userID;
    socket.pod = pod;
    // console.log(socket);
    console.log("assigning User");
    return socket
}

module.exports = assignUserToSocket;
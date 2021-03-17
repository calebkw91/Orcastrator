
function assignUserToSocket(socket){
    const username = socket.handshake.auth.username;
    const userID = socket.handshake.auth.userID;
    console.log(socket.handshake.auth);
    // if(!username||!userID){
    //   return next(new Error("Invalid Username"));
    // }
    socket.username = username;
    socket.userID = userID;
    console.log(socket);
    return socket
}

module.exports = assignUserToSocket;
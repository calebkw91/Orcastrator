const io = require("socket.io-client");

function socketConnection(id, podname) {
  let socket = io({ 
    autoConnect: false,
    auth:{
      userID:id,
      podID:podname,
      userName:"placeholder"
    }  
  });
 socket.oid = id;
 socket.pod = podname;
  if (socket.oid === "") {
    console.log("socket dose not have username-no connection attempt made");
    return;
  } else {
    socket.connect();
  }
}
export default socketConnection;

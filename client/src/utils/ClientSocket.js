const io = require("socket.io-client");

function socketConnection(id, podname) {
  let socket = io({ 
    autoConnect: false,
    auth:{
      userID:id,
      podID:podname
    }  
  });
  socket.oid = id;
  socket.pod = podname;
  console.log(socket);
  if (socket.oid === "") {
    console.log("socket dose not have username-no connection attempt made");
    return;
  } else {
    socket.connect();
    console.log("after socket.connect");
    socket.on("connect", () => {
      console.log(
        "conencted to socket with username:_" +
          socket.oid +
          " to socket id:_" +
          socket.id +
          " room:_" +
          socket.pod
      );
    });
    socket.on("connect_error",(err)=>{
        console.log(err);
        socket.disconnect();
    })

    // socket.on("users", (users) => {
    //     users.forEach((user) => {
    //       user.self = user.userID === socket.id;
    //     //   initReactiveProperties(user);
    //     });
    //     // put the current user first, and then sort by username
    //     this.users = users.sort((a, b) => {
    //       if (a.self) return -1;
    //       if (b.self) return 1;
    //       if (a.username < b.username) return -1;
    //       return a.username > b.username ? 1 : 0;
    //     });
    //   });

    // socket.onAny((event,...args)=>{
    //         console.log(event,args);
    //     });
  }
}
export default socketConnection;

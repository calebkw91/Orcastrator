
const io = require('socket.io-client');
// const URL = window.location.href;

function socketConnection (username,podname){
    
    let socket = io({autoConnect:false});
    socket.username = username;
    socket.pod = podname
    console.log(socket);
    socket.connect();
    console.log("after socket.connect");
    socket.on("connect",()=>{
        console.log("conencted to socket with username:_"+socket.username+" to socket id:_"+socket.id + ' room:_'+socket.pod);
    });

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
};
export default socketConnection;